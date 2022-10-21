import { exec } from 'child_process';
import { Command, Option } from 'commander';
import inquirer from 'inquirer';
import { exit } from 'process';
import { saveQuestion } from 'src/constants';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const save = new Command('save');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  explanation: `1) git\n`
};

/**
 * flig save [[--withmain [origin]] # commits staged changes and if --withmain is true, tries to merge latest main after committing
 *
 * flig save - add * and commits staged changes
 * flig save --with-main - add *, commits staged changes, tries to merge `main` into branch. If in main branch, logs an info message.
 */

const _: TCommands = {
  title: 'save',
  description: 'save repository',
  action: (options: { explain: boolean; withMain: boolean }) => {
    inquirer.prompt(saveQuestion).then((answer: { commit: string }) => {
      const message = answer.commit;
      const withMain = options.withMain ? '&& git merge --no-ff main' : '';
      exec(
        `git add * && git commit -m "${message}" ${withMain}`,
        (err, stdout) => {
          if (err) {
            console.log(err)
            log.error(phrases.error);
          }
          log.boring(stdout);
          if (options.explain) {
            log.info(phrases.explanation);
          }
          exit(0);
        }
      );
    });
  }
};

save
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('--with-main', 'merge latest main to branch'))
  .action(async (options) => {
    await _.action(options);
  });
