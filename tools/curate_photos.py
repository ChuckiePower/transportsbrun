#!/usr/bin/env python3
"""
Phase 0 — copie les photos retenues du miroir (source-site/) vers content/photos/
et écrit content/images-manifest.json.

La sélection (fichier source, nom cible, alt, doublons écartés) est décrite dans
tools/photo-curation.json. Les PNG photographiques sont convertis en JPEG (q92),
les JPEG/WebP sont copiés tels quels (pas de double compression).

Usage : python3 tools/curate_photos.py
Dépendance : Pillow.

Après la Phase 0, la source de vérité des textes alternatifs est
src/content/gallery.ts (ce script n'est plus nécessaire au quotidien).
"""
import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CURATION = ROOT / "tools" / "photo-curation.json"
PHOTOS = ROOT / "content" / "photos"
BRAND = ROOT / "content" / "brand"
MANIFEST = ROOT / "content" / "images-manifest.json"


def copy_photo(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix.lower() == ".png" and dst.suffix.lower() in (".jpg", ".jpeg"):
        im = Image.open(src)
        if im.mode in ("RGBA", "LA", "P"):
            bg = Image.new("RGB", im.size, (255, 255, 255))
            bg.paste(im.convert("RGBA"), mask=im.convert("RGBA").split()[-1])
            im = bg
        im.convert("RGB").save(dst, "JPEG", quality=92, optimize=True, progressive=True)
    else:
        shutil.copyfile(src, dst)


def main() -> None:
    entries = json.loads(CURATION.read_text(encoding="utf-8"))
    photos = []
    for e in entries:
        src = ROOT / e["source"]
        dst = PHOTOS / e["target"]
        copy_photo(src, dst)
        w, h = Image.open(dst).size
        photos.append(
            {
                "fichier": f"content/photos/{e['target']}",
                "categorie": e["target"].split("/")[0],
                "largeur": w,
                "hauteur": h,
                "alt": e["alt"],
                "sourceMiroir": e["source"],
                "variantesEcartees": e["variantesEcartees"],
                "pagesActuelles": e["pagesActuelles"],
                "originalHebergement": e.get("originalHebergement"),
            }
        )

    BRAND.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(
        ROOT / "source-site/images/logo/transport-brun-camion-routier-plateau-marchandise-alsace.png",
        BRAND / "logo-transports-brun.png",
    )
    shutil.copyfile(
        ROOT / "source-site/optimize/transports-brun-transports-routiers-de-gros-oeuvre-et-fret-interurbains-3-ba2edff7.png",
        BRAND / "logo-france-plateaux.png",
    )

    manifest = {
        "_note": (
            "Photos réelles de Transports Brun extraites du miroir du site actuel (variantes "
            "redimensionnées « /optimize/ »). Pour chaque photo, la plus grande variante "
            "disponible a été conservée ; les autres recadrages sont listés dans variantesEcartees. "
            "originalHebergement = chemin du fichier d'origine sur l'hébergement Joomla (quand il "
            "figure dans le HTML des galeries) : à récupérer pour remplacer la photo en haute définition."
        ),
        "photos": photos,
        "marque": [
            {
                "fichier": "content/brand/logo-transports-brun.png",
                "largeur": 250,
                "hauteur": 130,
                "note": "Logo matriciel basse résolution : fournir un vectoriel (SVG/PDF).",
            },
            {
                "fichier": "content/brand/logo-france-plateaux.png",
                "largeur": 250,
                "hauteur": 92,
                "note": "Logo du Groupement France Plateau tel qu'affiché sur le site actuel.",
            },
        ],
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(photos)} photos copiées dans {PHOTOS.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
