import { exec } from 'child_process';
import { Command, Option } from 'commander';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const init = new Command('init');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  success:
    'Congratulations! You created a `flig` repository. Which is really a git repository, since `flig` is a wrapper around it :)',
  explanation: `1) git init -q -b main\nThe "init" command in git initialized a repository. Flig uses the flag "-q" to avoid stdout questions on the user and "-b" to create a new branch with the name main.`
};

const _: TCommands = {
  title: 'init',
  description: 'Initialize repository',
  action: (options) => {
    exec(`stat .git`, (err, _) => {
      if (err) {
        exec(`git init -q -b main`, (err, _) => {
          if (err) {
            log.error(phrases.error);
          }
          log.success(phrases.success);
          if (options.explain) {
            log.info(phrases.explanation);
          }
        });
        return;
      }
      log.error(
        'This is already a repository! Did you want to reset it? You should delete .git folder but be aware you are going to lose all data for that repository!'
      );
      return;
    });
  }
};

init
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (options) => {
    await _.action(options);
  });
