import { spawn } from 'child_process';
import { Command, Option } from 'commander';
import inquirer from 'inquirer';
import { exit } from 'process';
import { syncQuestion } from 'src/constants';
import onExit from 'src/utils/onExit';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const sync = new Command('sync');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  warning1: `There was either nothing to add or nothing to commit!`,
  warning2: `Well, nothing to merge from the main branch!`,
  explanation: `1) git add *\n`
};

const _: TCommands = {
  title: 'sync',
  description: 'sync repository',
  action: async (options: { explain: boolean; onlyExplain: boolean }) => {
    inquirer
      .prompt(syncQuestion)
      .then(async (answer: { branchName: string }) => {
        if (options.onlyExplain) {
          log.info(phrases.explanation);
          exit(0);
        }

        const childProcess = spawn(
          `git pull ${answer.branchName} && git push origin ${answer.branchName}`,
          {
            stdio: [process.stdin, process.stdout, process.stderr],
            shell: true
          }
        );

        try {
          await onExit(childProcess);
        } catch (e) {
          log.warning(phrases.warning1);
        }

        if (options.explain) {
          log.info(phrases.explanation);
        }
        exit(0);
      });
  }
};

sync
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('-oe, --only-explain', 'to read explanation only'))
  .action(async (options) => {
    await _.action(options);
  });
