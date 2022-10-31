import { exec } from 'child_process';
import { Command, Option } from 'commander';
import { TCommands } from '../types';
import { log } from '../utils/log';
import inquirer from 'inquirer';
import { localOwner } from 'src/constants';
import { exit } from 'process';
export const own = new Command('own');

const phrases = {
  error:
    'Seems like this is not a git repository at this time. Are you sure you are in the right place? :)',
  success:
    'Nice job! You just changed the user of the repository (locally or globally depending on the flag used)',
  explanation: `1) git config --local user.name '<username>'\n2) git config --local user.email '<email>'\n\nThis is the command that we are using behind the curtain to create a new local owner of the repository. This is the name and email that you are going to see on the origin's repository whenever you push something to it (or sync, in flig terms).\nIf you used the flag --global or -g, you set up the global owner of repositories which will own all repos unless stated otherwise on the local level.`
};

const _: TCommands = {
  title: 'own',
  description:
    'change local config of user (or global with the -g, --global flag)',
  action: (options) => {
    inquirer
      .prompt(localOwner)
      .then((answer: { name: string; email: string }) => {
        let domain = '--local';
        if (options.global) {
          domain = '--global';
        }
        exec(
          `git config ${domain} user.name '${answer.name}' && git config ${domain} user.email '${answer.email}'`,
          (err, _) => {
            if (err) {
              log.error(phrases.error);
            }
            log.success(phrases.success);
            if (options.explain) {
              log.info(phrases.explanation);
            }
            exit(0);
          }
        );
      });
  }
};

own
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(
    new Option('-g, --global', 'to set up global ownership of the repository')
  )
  .action(async (options) => {
    await _.action(options);
  });
