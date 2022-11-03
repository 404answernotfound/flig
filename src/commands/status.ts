import { exec, spawn } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import onExit from 'src/utils/onExit';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const status = new Command('status');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  explanation: `\n1) git status\n\nThe "status" command in git is useful to check if there are any files that were not added to the staging area or committed, among many other things (like deleted files and folders!).`
};

const _: TCommands = {
  title: 'status',
  description: 'Status repository',
  action: async (options: { explain: boolean; onlyExplain: boolean }) => {
    if (options.onlyExplain) {
      log.info(phrases.explanation);
      exit(0);
    }

    const childProcess = spawn(`git status`, {
      stdio: [process.stdin, process.stdout, process.stderr],
      shell: true
    });

    await onExit(childProcess);

    if (options.explain) {
      log.info(phrases.explanation);
    }
    exit(0);
  }
};

status
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('-oe, --only-explain', 'to read explanation only'))
  .action(async (options) => {
    await _.action(options);
  });
