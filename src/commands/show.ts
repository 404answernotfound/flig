import { exec } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const show = new Command('show');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  explanation1: `1) git config -l\nShow local configuration of current repository.`,
  explanation2: `1) git logs --oneline\nShow logs in oneline fashion for current git repository`
};

const config: TCommands = {
  title: 'config',
  description: 'Shows local configuration',
  action: (options) => {
    exec(`git config -l`, (err, stdout) => {
      if (err) {
        log.error(
          'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)'
        );
      }
      log.success(stdout);
      if (options.explain) {
        log.info(phrases.explanation1);
      }
    });
  }
};

const logs: TCommands = {
  title: 'logs',
  description: 'Shows logs',
  action: (options) => {
    exec(`git log --oneline`, (err, stdout) => {
      if (err) {
        log.error(
          'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)'
        );
      }
      const _stdout = stdout.split('\n');
      for (let line = 0; line < _stdout.length; line++) {
        if (line === 0) {
          log.first(_stdout[line]);
        } else {
          log.boring(_stdout[line]);
        }
      }
      if (options.explain) {
        log.info(phrases.explanation2);
      }
      exit(0);
    });
  }
};

show
  .command(config.title)
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (options) => {
    await config.action(options);
  });

show
  .command(logs.title)
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (options) => {
    await logs.action(options);
  });
