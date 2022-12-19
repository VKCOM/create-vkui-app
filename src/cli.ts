import { Command } from "commander";
import chalk from "chalk";
import prompts from "prompts";
import logger from "./helpers/logger.js";
import { getPackageRoot } from "helpers/getPackageRoot.js";
import { getCliVersion } from "./helpers/getCliVersion.js";

export interface ICliOptions {
  typescript: boolean;
  javascript: boolean;
  quiet: boolean;
}

export interface ICli {
  projectDirectory: string;
  flags: ICliOptions;
}

const getProjectDirectoryErrorMessage = (programName: string) => {
  return (
    "Please specify the project directory:\n" +
    `  ${chalk.cyan(programName)} ${chalk.green("<project-directory>")}\n` +
    "For example:\n" +
    `  ${chalk.cyan(programName)} ${chalk.green("vkui-app")}\n\n` +
    `Run ${chalk.cyan(`${programName} --help`)} to see all options.\n`
  );
};

const trimStringValue = (value: string | undefined) =>
  typeof value === "string" ? value.trim() : value;

const promptProjectDirectory = async (): Promise<string> => {
  const { directory } = await prompts(
    {
      type: "text",
      name: "directory",
      message: "Type your project directory:",
      format: trimStringValue,
    },
    {
      onCancel: () => {
        process.exit(1);
      },
    }
  );

  return directory;
};

const promptProjectType = async (): Promise<boolean> => {
  const { typescript } = await prompts(
    {
      type: "toggle",
      name: "typescript",
      message: `Would you like to use ${chalk.cyan(
        "Typescript"
      )} with this project?`,
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      onCancel: () => {
        process.exit(1);
      },
    }
  );

  return typescript;
};

export const runCli = async (): Promise<ICli> => {
  const packageRoot = getPackageRoot();
  const version = getCliVersion(packageRoot);

  const program = new Command("create-vkui-app")
    .version(version)
    .argument(
      "[project-directory]",
      "working directory for your app",
      trimStringValue
    )
    .usage(`${chalk.green("[project-directory]")}`)
    .option("--ts, --typescript", `initialize as a TypeScript project`)
    .option("--js, --javascript", `initialize as a JavaScript project`)
    .option("-q, --quiet", `all logs are suppressed`)
    .configureOutput({
      writeErr: (str) => logger.info(`${chalk.red(str)}`),
    })
    .parse(process.argv);

  const options = program.opts() as ICliOptions;
  let projectDirectory = program.args[0];

  if (options.quiet) {
    logger.setQuietMode();
  }

  if (!projectDirectory) {
    if (options.quiet) {
      process.exit(1);
    }
    projectDirectory = await promptProjectDirectory();

    if (!projectDirectory) {
      logger.error(getProjectDirectoryErrorMessage(program.name()));
      process.exit(1);
    }
  }

  if (!options.typescript && !options.javascript) {
    if (options.quiet) {
      options.typescript = true;
    } else {
      options.typescript = await promptProjectType();
    }
  }

  return {
    flags: options,
    projectDirectory,
  };
};
