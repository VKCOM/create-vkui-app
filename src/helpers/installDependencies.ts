import chalk from "chalk";
import { execSync } from "child_process";
import logger from "./logger.js";

export function installDependencies(projectDirectory: string) {
  logger.info("📦 Installing project dependencies. It might take a while...");

  try {
    execSync(
      `cd ${projectDirectory} && yarn install --silent --frozen-lockfile`
    );
  } catch (yarnErr) {
    logger.error(yarnErr);
    process.exit(1);
  }

  logger.info(`${chalk.cyan("✅ Dependencies are installed.")}`);
}
