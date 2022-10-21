import { exec } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const add = new Command('add');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  success: `Congratz! You added all the files and non empty folders to the staging area :)`,
  explanation: `1) git config --local user.name '<username>'\n2) git config --local user.email '<email>'\n\nThis is the command that we are using behind the curtain to create a new local owner of the repository. This is the name and email that you are going to see on the origin's repository whenever you push something to it (or sync, in flig terms)`
};

const _: TCommands = {
  title: 'add',
  description: 'Add files to branch',
  action: (options: { explain: boolean; error: boolean }) => {
    exec(`git add *`, (err, _) => {
      if (err) {
        log.error(phrases.error);
        if (options.error) {
          log.error(err.toString());
        }
      }
      log.success(phrases.success);
      if (options.explain) {
        log.info(phrases.explanation);
      }
      exit(0);
    });
  }
};

add
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('--error', 'to read git error'))
  .action(async (options) => {
    await _.action(options);
  });
