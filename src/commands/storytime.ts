import { exec, spawn } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import onExit from 'src/utils/onExit';
import inquirer from 'inquirer';
import { storytimeStart } from 'src/constants';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const storytime = new Command('storytime');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  explanation: `\nLet's play an adventure while we learn flig and git together :)`
};

function learnCommand(command: string): void {
  switch (command) {
    case 'init':
      log.info(
        '\nflig init\n\nThe "init" command from flig makes use of git init command to create a repository.\nFlig uses the flags:\n\n"-q" to avoid stdout questions on the user\n"-b" to create a new branch with the name main.\n\nThis is because depending on your git installation you might be creating new repositories with a "main" branch called "master", which we should avoid :)'
      );
      break;
    case 'add':
      log.info('coming soon');
      break;
    case 'own':
      log.info('coming soon');
      break;
    default:
      break;
  }
}

const _: TCommands = {
  title: 'storytime',
  description: 'storytime repository',
  action: async (options: { explain: boolean; onlyExplain: boolean }) => {
    if (options.onlyExplain) {
      log.info(phrases.explanation);
      exit(0);
    }

    inquirer
      .prompt(storytimeStart)
      .then((answer: { adventureName: string; adventureCommand: string }) => {
        learnCommand(answer.adventureCommand);
        exit(0);
      });
  }
};

storytime
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('-oe, --only-explain', 'to read explanation only'))
  .action(async (options) => {
    await _.action(options);
  });
