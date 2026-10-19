#!/usr/bin/env python3
"""
Aspire transports-brun.com : toutes les pages HTML + toutes les images / CSS / JS / polices,
puis crée transports-brun-site.zip et un manifeste des images (images-manifest.json).

Usage :  python mirror_site.py
Sortie : ./source-site/ (miroir), ./transports-brun-site.zip
Dépendances : requests, beautifulsoup4 (déjà présents sur Google Colab).
"""
import json
import re
import time
import zipfile
from pathlib import Path
from urllib.parse import unquote, urldefrag, urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://transports-brun.com"
HOSTS = {"transports-brun.com", "www.transports-brun.com"}
START_PAGES = [
    "/",
    "/notre-histoire",
    "/transport-routier-haut-rhin-alsace",
    "/transport-plateaux-camion-grue-haut-rhin-alsace",
    "/transports-de-marchandises-et-btp-haut-rhin-alsace",
    "/notre-equipement",
    "/contact",
    "/mentions-legales",
    "/politiques-de-confidentialites",
]
OUT = Path("source-site")
ZIP_NAME = "transports-brun-site.zip"
DELAY = 0.15  # secondes entre deux requêtes (politesse envers le serveur)

ASSET_EXT = r"jpe?g|png|webp|gif|svg|avif|ico|css|js|woff2?|ttf|otf|eot|mp4|webm|pdf"
# Toute URL de ressource (absolue ou relative) présente dans le HTML ou le CSS
ASSET_RE = re.compile(
    r"""(?:["'(=\s,])((?:https?:)?//[^"'()\s<>]+?\.(?:%s)(?:\?[^"'()\s<>]*)?|/[^"'()\s<>]+?\.(?:%s)(?:\?[^"'()\s<>]*)?)"""
    % (ASSET_EXT, ASSET_EXT),
    re.IGNORECASE,
)
CSS_URL_RE = re.compile(r"""url\(\s*['"]?([^'")]+?)['"]?\s*\)""", re.IGNORECASE)
IMG_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif", ".ico"}

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (compatible; site-backup/1.0)"})


def is_internal(url: str) -> bool:
    return urlparse(url).netloc in HOSTS


def local_path(url: str, is_page: bool) -> Path:
    p = urlparse(url)
    path = unquote(p.path)
    if is_page:
        path = path.rstrip("/") + "/index.html" if path.strip("/") else "/index.html"
    elif path.endswith("/"):
        path += "index"
    base = OUT if p.netloc in HOSTS else OUT / "_external" / p.netloc
    return base / path.lstrip("/")


def fetch(url: str):
    for attempt in range(3):
        try:
            r = session.get(url, timeout=30)
            if r.status_code == 200:
                return r
            print(f"  ! {r.status_code} {url}")
            return None
        except requests.RequestException as e:
            print(f"  ! erreur ({attempt + 1}/3) {url} : {e}")
            time.sleep(1.5)
    return None


def save(url: str, content: bytes, is_page: bool) -> Path:
    dest = local_path(url, is_page)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(content)
    return dest


def normalise(raw: str, page_url: str) -> str:
    u = urldefrag(urljoin(page_url, raw.strip()))[0]
    return u


def main():
    OUT.mkdir(exist_ok=True)
    pages_queue = [urljoin(BASE, p) for p in START_PAGES]
    seen_pages, assets, css_files = set(), set(), []
    manifest = {}  # page -> liste d'images {url, alt, file}

    # ---------- 1) pages HTML ----------
    while pages_queue:
        url = pages_queue.pop(0)
        if url in seen_pages:
            continue
        seen_pages.add(url)
        print(f"PAGE {url}")
        r = fetch(url)
        time.sleep(DELAY)
        if r is None or "text/html" not in r.headers.get("content-type", ""):
            continue
        save(url, r.content, is_page=True)
        html = r.text
        soup = BeautifulSoup(html, "html.parser")

        # liens internes à suivre (pages seulement)
        for a in soup.find_all("a", href=True):
            link = normalise(a["href"], url)
            if is_internal(link) and not re.search(r"\.(%s)(\?|$)" % ASSET_EXT, link, re.I):
                if not link.startswith(("mailto:", "tel:")):
                    pages_queue.append(link)

        # toutes les ressources (img, srcset, data-*, styles inline, liens de galerie...)
        found = set()
        for m in ASSET_RE.finditer(html):
            found.add(normalise(m.group(1) if not m.group(1).startswith("//") else "https:" + m.group(1), url))
        for tag in soup.find_all(style=True):
            for m in CSS_URL_RE.finditer(tag["style"]):
                found.add(normalise(m.group(1), url))
        for tag in soup.find_all(["img", "source"]):
            for attr in ("src", "data-src", "data-original"):
                if tag.get(attr):
                    found.add(normalise(tag[attr], url))
            for attr in ("srcset", "data-srcset"):
                if tag.get(attr):
                    for part in tag[attr].split(","):
                        if part.strip():
                            found.add(normalise(part.strip().split()[0], url))
        assets |= {a for a in found if a.startswith("http")}

        # manifeste des <img> de la page (avec alt d'origine)
        imgs = []
        for img in soup.find_all("img"):
            src = img.get("data-src") or img.get("src")
            if src:
                full = normalise(src, url)
                imgs.append({"url": full, "alt": img.get("alt", ""), "file": str(local_path(full, False))})
        manifest[url] = imgs

    # ---------- 2) ressources (avec exploration des CSS pour url(...)) ----------
    done = set()
    queue = sorted(assets)
    while queue:
        a = queue.pop(0)
        if a in done:
            continue
        done.add(a)
        dest = local_path(a, False)
        if dest.exists():
            continue
        print(f"ASSET {a}")
        r = fetch(a)
        time.sleep(DELAY)
        if r is None:
            continue
        save(a, r.content, is_page=False)
        if urlparse(a).path.lower().endswith(".css"):
            for m in CSS_URL_RE.finditer(r.text):
                ref = m.group(1)
                if not ref.startswith("data:"):
                    queue.append(normalise(ref, a))

    # ---------- 3) manifeste + zip ----------
    Path("images-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    n_files = 0
    with zipfile.ZipFile(ZIP_NAME, "w", zipfile.ZIP_DEFLATED) as z:
        for f in OUT.rglob("*"):
            if f.is_file():
                z.write(f, f.relative_to(OUT.parent))
                n_files += 1
        z.write("images-manifest.json")
    n_imgs = sum(1 for f in OUT.rglob("*") if f.suffix.lower() in IMG_SUFFIXES)
    print(f"\nTerminé : {len(seen_pages)} pages, {n_files} fichiers dont {n_imgs} images -> {ZIP_NAME}")

    try:  # Google Colab : lance le téléchargement du zip sur ton appareil
        from google.colab import files  # type: ignore

        files.download(ZIP_NAME)
    except Exception:
        pass


if __name__ == "__main__":
    main()
