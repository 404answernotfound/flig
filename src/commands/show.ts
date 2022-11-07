import { exec, spawn } from 'child_process';
import { Command, Option } from 'commander';
import inquirer from 'inquirer';
import { exit } from 'process';
import { showQuestion } from 'src/constants';
import onExit from 'src/utils/onExit';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const show = new Command('show');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  wrongBranch:
    'There was something wrong with your last command. Try again with a valid branch name!',
  explanation1: `\n1) git config -l\n\nShow local configuration of current repository.`,
  explanation2: `\n2) git log --oneline\n\nShow logs (pinpoints) in oneline fashion for current git repository`,
  explanation3: `\n3) git branch -a\n\nShow all branches (local or remote) that the repository has`,
  explanation4: `\n4) git branch -a | grep [branch regex]\n\nSearch all branches (local or remote) that the repository has`,
};

const config: TCommands = {
  title: 'config',
  description: 'Shows local configuration',
  action: (options) => {
    exec(`git config -l`, (err, stdout) => {
      if (err) {
        log.error(
          'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)'
        );
      }
      log.success(stdout);
      if (options.explain) {
        log.info(phrases.explanation1);
      }
    });
  }
};

const pinpoints: TCommands = {
  title: 'pinpoints',
  description: 'Shows pinpoints',
  action: async (options) => {
    const childProcess = spawn(`git log --oneline`, {
      stdio: [process.stdin, process.stdout, process.stderr],
      shell: true
    });

    await onExit(childProcess);
    if (options.explain) {
      log.info(phrases.explanation2);
    }
    exit(0);
  }
};

const branches: TCommands = {
  title: 'branches',
  description: 'Shows branches',
  action: async (options) => {
    const childProcess = spawn(`git branch -a`, {
      stdio: [process.stdin, process.stdout, process.stderr],
      shell: true
    });

    await onExit(childProcess);
    if (options.explain) {
      log.info(phrases.explanation3);
    }
    exit(0);
  }
};

const _: TCommands = {
  title: 'branches',
  description: 'search branches',
  action: async (options) => {
    inquirer.prompt(showQuestion).then(async (answer: { branch: string }) => {
      const branchName = answer.branch;
      try {
        const childProcess = spawn(`git branch -a | grep ${branchName}`, {
          stdio: [process.stdin, process.stdout, process.stderr],
          shell: true
        });

        await onExit(childProcess);
      } catch (error) {
        log.warning(phrases.wrongBranch);
      }
      if (options.explain) {
        log.info(phrases.explanation4);
      }
      exit(0);
    });
  }
};

show
  .command(config.title)
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (options) => {
    await config.action(options);
  });

show
  .command(pinpoints.title)
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (options) => {
    await pinpoints.action(options);
  });

show
  .command(branches.title)
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (options) => {
    await pinpoints.action(options);
  });

show
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (options) => {
    await _.action(options);
  });
