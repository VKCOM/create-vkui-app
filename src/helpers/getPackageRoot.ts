import { fileURLToPath } from "url";
import path from "path";

export function getPackageRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.join(__dirname, "..");
}
