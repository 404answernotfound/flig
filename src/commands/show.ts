import { exec } from 'child_process';
import { Command } from 'commander';
import { TCommands } from '../types';
export const show = new Command('show');

const config: TCommands = {
  title: 'config',
  description: 'Shows local configuration',
  action: () => {
    exec(`git config -l`, (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }
};

const logs: TCommands = {
  title: 'logs',
  description: 'Shows logs',
  action: () => {
    exec(`git log --oneline`, (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(stdout);
    });
  }
};

show.command(config.title).action(async () => {
  await config.action();
});

show.command(logs.title).action(async () => {
  await logs.action();
});
