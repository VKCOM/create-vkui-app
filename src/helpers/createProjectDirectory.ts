import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import logger from "./logger.js";

export function createProjectDirectory(projectDirectory: string): string {
  const projectPath = path.resolve(projectDirectory);

  logger.info(`📝 Creating a new directory in ${chalk.cyan(projectPath)}`);
  
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  } else if (fs.readdirSync(projectPath).length !== 0) {
    logger.error("Directory already exists and isn't empty.\n");
    process.exit(1);
  } 

  return projectPath;
}
