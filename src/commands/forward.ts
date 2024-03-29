import { spawn } from 'child_process';
import { Command, Option } from 'commander';
import inquirer from 'inquirer';
import { exit } from 'process';
import { syncQuestion } from 'src/constants';
import onExit from 'src/utils/onExit';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const forward = new Command('forward');

const phrases = {
  error: "This is kinda weird but, I'm not sure what error this is!",
  warning1: `There was either nothing to add or nothing to commit!`,
  explanation: `1) git log --all --oneline | grep -B 1 $(git rev-parse --short HEAD) | awk '{print $1}' | head -1 | xargs -I {} git checkout {}\n\nYeah, I cant see your face but I imagine this aint so easy\n\nThe easy explanation just says that we are finding the next commit (pinpoint) in the tree and moving to it. If you want a more complete one,\n\n\ngit log --all --oneline # Here we get all the commits we need\ngrep -A 1 $(git rev-parse --short HEAD) # Here we grep for the short commit hash\nawk '{print $1}' # Here we get just the HEAD@{n}:\ntail -1 # We will get at least 2 results, pick the last line, the first would be 0\ngrep -o '[[:digit:]]*' # Here we grep the HEAD digit\nxargs -I {} expr {} - 1 # Here we go "forward by 1"\nxargs -I {} git checkout {} # Here we checkout out the branch`
};

const _: TCommands = {
  title: 'forward',
  description: 'forward repository',
  action: async (options: {
    explain: boolean;
    onlyExplain: boolean;
    number: number;
  }) => {
    if (options.onlyExplain) {
      log.info(phrases.explanation);
      exit(0);
    }

    const childProcess = spawn(
      `function _(){
        a=$(git log --all --oneline | awk '{print $1}' | head -1)
        b=$(git log --all --oneline | grep -B 1 $(git rev-parse --short HEAD) | awk '{print $1}' | tail -1)
        if [ "$a" == "$b" ];
        then
          echo "You are on Main"
          git config -l | grep -oE -m 1 "main|master" | xargs -I {} bash -c 'git checkout {}'
          exit
        else
          echo "Moving to branch $b"
          git log --all --oneline | grep -B 1 $(git rev-parse --short HEAD) | awk '{print $1}' | head -1 | xargs -I {} git checkout {}
          exit
        fi
      };_`,
      {
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: true
      }
    );

    try {
      await onExit(childProcess);
    } catch (e) {
      log.warning(phrases.warning1);
    }

    if (options.explain) {
      log.info(phrases.explanation);
    }
    exit(0);
  }
};

forward
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('-oe, --only-explain', 'to read explanation only'))
  .addOption(
    new Option('-n, --number', 'how many times to forward from this pinpoint')
  )
  .action(async (options) => {
    await _.action(options);
  });
