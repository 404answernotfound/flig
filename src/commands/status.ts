import { exec } from 'child_process';
import { Command, Option } from 'commander';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const status = new Command('status');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  explanation: `1) git status\n The "status" command in git is useful to check if there are any files that were not added to the staging area or committed, among many other things (like deleted files and folders!).`
};

const _: TCommands = {
  title: 'status',
  description: 'Status repository',
  action: (options) => {
    exec(`git status`, (err, stdout) => {
      if (err) {
        log.error(phrases.error)
      }
      log.boring(stdout);
      if (options.explain) {
        log.info(phrases.explanation);
      }
    });
  }
};

status.addOption(new Option('-e, --explain')).action(async (options) => {
  await _.action(options);
});

