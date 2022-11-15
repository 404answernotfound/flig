import { exec } from 'child_process';
import { Command } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const main = new Command('main');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  success: `Congratz! You are now on main branch. This is your new pinpoint (HEAD)`,
  explanation: `1) git config -l | grep -oE -m 1 "main|master" | xargs -I {} bash -c 'git checkout {}'`
};

const _: TCommands = {
  title: 'main',
  description: 'Move to branch',
  action: () => {
    exec(
      `git config -l | grep -oE -m 1 "main|master" | xargs -I {} bash -c 'git checkout {}'`,
      (err, _) => {
        if (err) {
          log.error(phrases.error);
        }
        log.success(phrases.success);
        exit(0);
      }
    );
  }
};

main.action(async () => {
  await _.action();
});
