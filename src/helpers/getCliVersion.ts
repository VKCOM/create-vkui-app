import fs from "fs-extra";
import path from "path";

export function getCliVersion(packageRoot: string): string {
  const packageJsonPath = path.join(packageRoot, "package.json");
  const packageJsonContent = fs.readJSONSync(packageJsonPath);

  return packageJsonContent.version ?? "1.0.0";
}
