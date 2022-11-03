import { spawn } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import onExit from 'src/utils/onExit';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const add = new Command('add');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  success: `Congratz! You added all the files and non empty folders to the staging area :)`,
  explanation: `\n1) git add .\n\nThis is the command that enables our new or updated files to tracked by git.\nA file is tracked and added to the staging area where all the git magic happens.\nFiles that are not in the staging area will not be considered in our commits (pinpoints)`
};

const _: TCommands = {
  title: 'add',
  description: 'Add files to branch',
  action: async (options: { explain: boolean; onlyExplain: boolean }) => {
    if (options.onlyExplain) {
      log.info(phrases.explanation);
      exit(0);
    }
    const childProcess = spawn(`git add .`, {
      stdio: [process.stdin, process.stdout, process.stderr],
      shell: true
    });

    try {
      await onExit(childProcess);
      log.success(phrases.success);
    } catch (err: any) {
      log.error(err);
    }

    if (options.explain) {
      log.info(phrases.explanation);
    }
    exit(0);
  }
};

add
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('-oe, --only-explain', 'to read explanation only'))
  .action(async (options) => {
    await _.action(options);
  });
