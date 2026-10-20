import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { UNIVERSAL_DEGREES_CATALOG } from "../src/data/degree_guidance/catalog";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportDir = path.resolve(__dirname, "../../data/exports");
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

const targetPath = path.join(exportDir, "universal_degrees.json");
fs.writeFileSync(targetPath, JSON.stringify(UNIVERSAL_DEGREES_CATALOG, null, 2), "utf-8");

console.log(`Successfully exported ${UNIVERSAL_DEGREES_CATALOG.length} degrees to ${targetPath}`);
