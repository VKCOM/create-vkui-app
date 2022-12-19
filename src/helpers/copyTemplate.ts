import fs from "fs-extra";
import path from "path";
import { getPackageRoot } from "./getPackageRoot.js";
import logger from "./logger.js";
import type { ICliOptions } from "../cli.js";

export function copyTemplate(projectPath: string, flags: ICliOptions) {
  const packageRoot = getPackageRoot();
  logger.info("📝 Copying VKUI App source and configuration files...");

  fs.copySync(
    path.join(
      packageRoot,
      `templates/${flags.typescript ? "typescript" : "default"}`
    ),
    projectPath
  );

  fs.renameSync(
    path.join(projectPath, "gitignore"),
    path.join(projectPath, ".gitignore")
  );

  fs.copySync(
    path.join(packageRoot, "README.md"),
    path.join(projectPath, "README.md")
  );

  logger.info("✅ VKUI source and configuration files are copied.");
}
