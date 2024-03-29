import { spawn } from 'child_process';
import { Command, Option } from 'commander';
import { exit } from 'process';
import onExit from 'src/utils/onExit';
import { TCommands } from '../types';
import { log } from '../utils/log';
export const backward = new Command('backward');

const phrases = {
  error: "This is kinda weird but, this command generated an error. Report this to your local git maintainer :P",
  warning1: `There was either nothing to add or nothing to commit!`,
  explanation: `\n1) git log --all --oneline | grep -A 1 $(git rev-parse --short HEAD) | awk '{print $1}' | tail -1 | xargs -I {} git checkout {}\n\nYeah, I cant see your face but I imagine this aint so easy\n\nThe easy explanation just says that we are finding the next commit (pinpoint) in the tree and moving to it.\nIf you want a more complete one:\n\n\ngit log --all --oneline # Here we get all the commits we need\ngrep -A 1 $(git rev-parse --short HEAD) # Here we grep for the short commit hash\nawk '{print $1}'  # Here we get just the HEAD@{n}:\ntail -1 # We will get at least 2 results, pick the last line, the first would be 0\ngrep -o '[[:digit:]]*' # Here we grep the HEAD digit\nxargs -I {} expr {} - 1 # Here we go "backward by 1"\nxargs -I {} git checkout {} # Here we checkout out the branch`
};

const _: TCommands = {
  title: 'backward',
  description: 'backward repository',
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
      `git log --all --oneline | grep -A 1 $(git rev-parse --short HEAD) | awk '{print $1}' | tail -1 | xargs -I {} git checkout {}`,
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

backward
  .addOption(
    new Option('-e, --explain', 'to read git commands and explanation')
  )
  .addOption(new Option('-oe, --only-explain', 'to read explanation only'))
  .addOption(
    new Option('-n, --number', 'how many times to backward from this pinpoint')
  )
  .action(async (options) => {
    await _.action(options);
  });
