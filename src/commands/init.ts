import { exec } from 'child_process';
import { Command } from 'commander';
import { TCommands } from '../types';
export const init = new Command('init');

const _: TCommands = {
  title: 'config',
  description: 'Initialize repository',
  action: () => {
    console.log('init command is running');
    exec(`git init`, (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }
};

init.action(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await _.action();
});

