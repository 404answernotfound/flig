import { spawn } from 'child_process';
import { Command, Option } from 'commander';
import inquirer from 'inquirer';
import { exit } from 'process';
import { saveQuestion } from 'src/constants';
import onExit from 'src/utils/onExit';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const save = new Command('save');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  warning1: `There was either nothing to add or nothing to commit!`,
  warning2: `Well, nothing to merge from the main branch!`,
  explanation: `1) git add *\n2) git commit -m "A descriptive message"\n3) git merge main\nThe first command takes care of adding everything into the staging area (where you keep track of your changes), the second command commits those changes (saves a point in time, what we refer to as pinpoint), the third command tries to sync the changes from the main branch into the feature/bugfix/hotfix branch you are working on :)`
};

const _: TCommands = {
  title: 'save',
  description: 'save repository',
  action: (options: {
    explain: boolean;
    onlyExplain: boolean;
    align: boolean;
  }) => {
    if (options.onlyExplain) {
      log.info(phrases.explanation);
      exit(0);
    }
    inquirer.prompt(saveQuestion).then(async (answer: { commit: string }) => {
      const message = answer.commit;
      const align = options.align ? 'git merge main' : '';

      const childProcess = spawn(`git add . && git commit -m "${message}"`, {
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true
      });

      try {
        await onExit(childProcess);
      } catch (e) {
        log.warning(phrases.warning1);
      }

      if (options.align) {
        const mergeProcess = spawn(align, {
          stdio: [process.stdin, process.stdout, process.stderr],
          shell: true
        });
        try {
          await onExit(mergeProcess);
        } catch (e) {
          log.warning(phrases.warning2);
        }
      }

      if (options.explain) {
        log.info(phrases.explanation);
      }
      exit(0);
    });
  }
};

save
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('-oe, --only-explain', 'to read explanation only'))
  .addOption(new Option('--align', 'merge latest main to branch'))
  .action(async (options) => {
    await _.action(options);
  });
