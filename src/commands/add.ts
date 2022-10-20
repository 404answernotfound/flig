import { exec } from 'child_process';
import { Command } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const add = new Command('add');

const _: TCommands = {
  title: 'add',
  description: 'Add files to branch',
  action: (items: string[]) => {
    exec(`git add * .*`, (err, stdout) => {
      if (err) {
        log.error(
          'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)'
        );
      }
      log.success(`Congratz! You added: \n\n`);
      for (let item of items) {
        log.boring(item);
      }
      exit(0);
    });
  }
};

add.argument('<string>', 'name of the branch').action(async (branchName) => {
  await _.action(branchName);
});
