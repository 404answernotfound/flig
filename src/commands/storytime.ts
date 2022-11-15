import { exec, spawn } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import onExit from 'src/utils/onExit';
import inquirer from 'inquirer';
import { storytimeAnswers, storytimeStart } from 'src/constants';
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
      log.info(storytimeAnswers.init);
      break;
    case 'add':
      log.info(storytimeAnswers.add);
      break;
    case 'own':
      log.info(storytimeAnswers.own);
      break;
    case 'main':
      log.info(storytimeAnswers.main);
    case 'moveto':
      log.info(storytimeAnswers.moveto);
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
