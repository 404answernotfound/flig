import { exec } from 'child_process';
import { Command } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const gotomain = new Command('gotomain');

const _: TCommands = {
  title: 'gotomain',
  description: 'Move to branch',
  action: () => {
    exec(
      `cat .git/config | grep -oE -m 1 "main|master" | xargs -I {} bash -c 'git checkout {}'`,
      (err, stdout) => {
        if (err) {
          log.error(
            'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)'
          );
        }
        log.success(
          `Congratz! You are now on main branch. This is your new pinpoint (HEAD)`
        );
        exit(0);
      }
    );
  }
};

gotomain.action(async () => {
  await _.action();
});
