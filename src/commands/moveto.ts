import { exec } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const moveto = new Command('moveto');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  explanation: `1) git checkout <branch name>'\nWithout any flags (like -b) git checkout switches between branches (pinpoints, in flig terms).\nIt's like having a cool space and time machine.`
};

const _: TCommands = {
  title: 'moveto',
  description: 'Move to branch',
  action: (branchName: string, options: { explain: boolean }) => {
    exec(`git checkout ${branchName}`, (err, stdout) => {
      if (err) {
        log.error(phrases.error);
      }
      log.success(
        `Congratz! You are now on ${branchName} branch. This is your new pinpoint (HEAD)`
      );

      if (options.explain) {
        log.info(phrases.explanation);
      }
    });
  }
};

moveto
  .argument('<string>', 'name of the branch')
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .action(async (branchName, options) => {
    await _.action(branchName, options);
  });
