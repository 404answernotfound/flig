import { exec } from 'child_process';
import { Command, Option } from 'commander';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const init = new Command('init');

const _: TCommands = {
  title: 'init',
  description: 'Initialize repository',
  action: (options) => {
    exec(`git init -q -b main`, (err, _) => {
      if (err) {
        log.error(
          'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)'
        );
      }
      log.success(
        'Congratulations! You created a `flig` repository. Which is really a git repository, since `flig` is a wrapper around it :)'
      );
      if (options.explain) {
        log.info(
          `1) git init -q -b main\n The "init" command in git initialized a repository. Flig uses the flag "-q" to avoid stdout questions on the user and "-b" to create a new branch with the name main.`
        );
      }
    });
  }
};

init.addOption(new Option('-e, --explain')).action(async (options) => {
  await _.action(options);
});
