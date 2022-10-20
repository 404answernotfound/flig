import { exec } from 'child_process';
import { Command } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const moveto = new Command('moveto');

const _: TCommands = {
  title: 'moveto',
  description: 'Move to branch',
  action: (branchName: string) => {
    exec(`git checkout ${branchName}`, (err, stdout) => {
      if (err) {
        log.error(
          'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)'
        );
      }
      log.success(
        `Congratz! You are now on ${branchName} branch. This is your new pinpoint (HEAD)`
      );
      exit(0);
    });
  }
};

moveto.argument('<string>', 'name of the branch').action(async (branchName) => {
  await _.action(branchName);
});
