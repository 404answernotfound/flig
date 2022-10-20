import { exec } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
import inquirer from 'inquirer';
import { startQuestion } from '../constants';
export const start = new Command('start');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  explanation: `1) git checkout -b [<branch type>--]<branch name>\nFollowing flig rules, we name our branches with type and name, united with a double dash.\nThe checkout command either creates (with -b flag) or changes to, another branch!`
};

const _: TCommands = {
  title: 'start',
  description: 'Initialize branch',
  action: (options: { explain: boolean }) => {
    inquirer
      .prompt(startQuestion)
      .then((answer: { branchName: string; branchType: string }) => {
        exec(
          `git checkout -b ${answer.branchType}--${answer.branchName}`,
          (err, _) => {
            if (err) {
              log.error(phrases.error);
            }
            log.success(
              `Branch ${answer.branchType}--${answer.branchName} was successfully created and your project pinpoint (HEAD) has moved to it`
            );
            if (options.explain) {
              log.info(phrases.explanation);
            }
          }
        );
      });
  }
};

start
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (options) => {
    await _.action(options);
  });
