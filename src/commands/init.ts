import { exec } from 'child_process';
import { Command } from 'commander';
import { TCommands } from '../types';
export const init = new Command('init');

const _: TCommands = {
  title: 'config',
  description: 'Initialize repository',
  action: () => {
    console.log('init command is running');
    exec(`git init -q -b main`, (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Congratulations! You created a `flig` repository. Which is really a git repository, since `flig` is a wrapper around it :)');
    });
  }
};

init.action(async () => {
  await _.action();
});

