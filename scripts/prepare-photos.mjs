import sharp from "sharp";
import { existsSync } from "node:fs";

// Run after adding/replacing the source photographs. No optimization server is needed.
const photos = [
  ["bolo-chocolate", "public/images/photos/bolo-chocolate-source.jpg"],
  ["bolo-cenoura", "public/images/photos/bolo-cenoura-source.jpg"],
  ["brigadeiros", "public/images/photos/brigadeiros-source.jpg"],
  ["brigadeiro-tradicional", "public/images/uploads/360_f_1894515411_7ydjf3nktx9itevksty3of7iarr5hyvu.jpg"],
];
for (const [name, source] of photos) {
  if (!existsSync(source)) throw new Error(`Missing source: ${source}`);
  for (const width of [480, 800, 1400]) {
    const output = `public/images/photos/${name}-${width}.webp`;
    await sharp(source).rotate().resize(width, Math.round(width * .75), { fit: "cover", position: "attention" }).webp({ quality: 80 }).toFile(output);
  }
  await sharp(source).rotate().resize(1400, 1050, { fit: "cover", position: "attention" }).webp({ quality: 80 }).toFile(`public/images/photos/${name}.webp`);
  console.log(`Prepared ${name}`);
}
