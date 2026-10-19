import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { PhotoId } from "@/content/gallery";
import { site } from "@/content/site";

/**
 * Image Open Graph (1200×630) générée à la compilation : photo réelle de la
 * photothèque, voile sombre, titre de la page et logo.
 */
export const ogSize = { width: 1200, height: 630 };

const root = process.cwd();

async function photoFile(id: PhotoId): Promise<string> {
  const [folder, name] = id.split("/") as [string, string];
  const dir = path.join(root, "content/photos", folder);
  const file = (await readdir(dir)).find((f) => f.replace(/\.[^.]+$/, "") === name);
  if (!file) throw new Error(`Photo introuvable : ${id}`);
  return path.join(dir, file);
}

export async function renderOg({ title, photo }: { title: string; photo: PhotoId }) {
  const [bg, logo, display, text] = await Promise.all([
    photoFile(photo).then((f) =>
      sharp(f)
        .resize(ogSize.width, ogSize.height, { fit: "cover" })
        .jpeg({ quality: 78 })
        .toBuffer(),
    ),
    readFile(path.join(root, "content/brand/logo-transports-brun.png")),
    readFile(path.join(root, "src/fonts/og/barlow-condensed-latin-700-normal.woff")),
    readFile(path.join(root, "src/fonts/og/source-sans-3-latin-600-normal.woff")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#131417",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/jpeg;base64,${bg.toString("base64")}`}
        width={ogSize.width}
        height={ogSize.height}
        alt=""
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(19,20,23,0.94) 0%, rgba(19,20,23,0.8) 48%, rgba(19,20,23,0.25) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              background: "#ffffff",
              borderRadius: 6,
              padding: "14px 18px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/png;base64,${logo.toString("base64")}`}
              width={160}
              height={83}
              alt=""
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
            <div style={{ width: 70, height: 8, background: "#6c6cf0" }} />
            <div style={{ width: 70, height: 8, background: "#8c9099" }} />
            <div style={{ width: 70, height: 8, background: "#e2e2e2" }} />
          </div>
          {/* Un bloc par mot : évite les coupures sur les traits d'union (Haut-Rhin) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 18,
              fontFamily: "Barlow Condensed",
              fontSize: 74,
              lineHeight: 0.98,
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            {title.split(/\s+/).map((word, i) => (
              <span key={i} style={{ whiteSpace: "nowrap" }}>
                {word}
              </span>
            ))}
          </div>
          <div
            style={{ fontFamily: "Source Sans 3", fontSize: 30, color: "#ffc21a", marginTop: 26 }}
          >
            {`${site.name} · ${site.address.city} (${site.address.department})`}
          </div>
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Barlow Condensed", data: display, weight: 700, style: "normal" },
        { name: "Source Sans 3", data: text, weight: 600, style: "normal" },
      ],
    },
  );
}
