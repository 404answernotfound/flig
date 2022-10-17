import { exec } from 'child_process';
import { Command } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const start = new Command('start');

const _: TCommands = {
  title: 'start',
  description: 'Initialize branch',
  action: (branchName: string) => {
    exec(`git checkout -b ${branchName}`, (err, stdout) => {
      if (err) {
        console.error(err);
        return;
      }
      log.success(`Branch ${branchName} was successfully created and your project pinpoint (HEAD) has moved to it`);
      exit(0);
    });
  }
};

start.argument('<string>', 'name of the branch').action(async (branchName) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await _.action(branchName);
});
