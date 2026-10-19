import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { PhotoId } from "@/content/gallery";
import { site } from "@/content/site";

/**
 * Image Open Graph (1200×630) générée à la compilation, direction « Route douce » :
 * photo réelle arrondie sur fond nuit, voile doux, titre en Plus Jakarta Sans, logo en carte blanche.
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
    readFile(path.join(root, "src/fonts/og/plus-jakarta-sans-latin-800-normal.woff")),
    readFile(path.join(root, "src/fonts/og/plus-jakarta-sans-latin-600-normal.woff")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#14213d",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: ogSize.width - 40,
          height: ogSize.height - 40,
          display: "flex",
          borderRadius: 32,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${bg.toString("base64")}`}
          width={ogSize.width}
          height={ogSize.height}
          alt=""
          style={{ position: "absolute", top: -20, left: -20 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogSize.width - 40,
            height: ogSize.height - 40,
            display: "flex",
            background:
              "linear-gradient(35deg, rgba(20,33,61,0.92) 0%, rgba(20,33,61,0.7) 45%, rgba(20,33,61,0.1) 85%)",
          }}
        />
      </div>
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
              borderRadius: 20,
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
          {/* Un bloc par mot : évite les coupures sur les traits d'union (Haut-Rhin) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 18,
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: 64,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#ffffff",
            }}
          >
            {title.split(/\s+/).map((word, i) => (
              <span key={i} style={{ whiteSpace: "nowrap" }}>
                {word}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 28 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                fontSize: 26,
                color: "#14213d",
                background: "#ffc21a",
                borderRadius: 999,
                padding: "10px 24px",
              }}
            >
              {`${site.name} · ${site.address.city} (${site.address.department})`}
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Plus Jakarta Sans", data: display, weight: 800, style: "normal" },
        { name: "Plus Jakarta Sans", data: text, weight: 600, style: "normal" },
      ],
    },
  );
}
