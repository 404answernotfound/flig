import { exec } from 'child_process';
import { Command } from 'commander';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const show = new Command('show');

const config: TCommands = {
  title: 'config',
  description: 'Shows local configuration',
  action: () => {
    exec(`git config -l`, (err, stdout) => {
      if (err) {
        log.error('Seems like this is not a git repository at this time. Are you sure you are in the right place? :)')
      }
      log.success(stdout);
    });
  }
};

const logs: TCommands = {
  title: 'logs',
  description: 'Shows logs',
  action: () => {
    exec(`git log --oneline`, (err, stdout) => {
      if (err) {
        log.error('Seems like this is not a git repository at this time. Are you sure you are in the right place? :)')
      }
      const _stdout = stdout.split('\n')
      for(let line = 0; line < _stdout.length; line++){
        if(line === 0){
          log.first(_stdout[line])
        }
        else {
          log.boring(_stdout[line])
        }
      }
    });
  }
};

show.command(config.title).action(async () => {
  await config.action();
});

show.command(logs.title).action(async () => {
  await logs.action();
});
