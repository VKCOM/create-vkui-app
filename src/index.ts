#!/usr/bin/env node

import chalk from "chalk";
import { runCli } from "./cli.js";
import logger from "./helpers/logger.js";
import { createProjectDirectory } from "./helpers/createProjectDirectory.js";
import { copyTemplate } from "./helpers/copyTemplate.js";
import { installDependencies } from "./helpers/installDependencies.js";

const run = async () => {
  const { projectDirectory, flags } = await runCli();

  const projectPath = createProjectDirectory(projectDirectory);

  copyTemplate(projectPath, flags);

  installDependencies(projectDirectory);

  logger.info(
    `VKUI App is ${chalk.green("ready to start")} in ${chalk.cyan(
      projectDirectory
    )} directory. Check ${chalk.cyan("README.MD")} for brief instructrions.`
  );
};

run().catch((error) => {
  console.log(error);
});
