import { log } from '../utils/log';

const commandChoices = ['init', 'own', 'add'];

export const startQuestion = [
  {
    type: 'input',
    name: 'branchName',
    message:
      'Willing to work eh? Alright. How shall we name this new piece of art?'
  },
  {
    type: 'list',
    name: 'branchType',
    message: "What are you going to work on? Let's name your branch :)",
    choices: [
      {
        value: 'feature',
        name: 'Feature'
      },
      {
        value: 'hotfix',
        name: 'Hotfix'
      },
      {
        value: 'bugfix',
        name: 'Bugfix'
      }
    ]
  }
];

export const localOwner = [
  {
    type: 'input',
    name: 'name',
    message: "So, who's the user that is going to coordinate this local repo?"
  },
  {
    type: 'input',
    name: 'email',
    message: "Let's also add an email (Github is kinda peaky about this!)"
  }
];

export const saveQuestion = [
  {
    type: 'input',
    name: 'commit',
    message:
      "A good commit requires a good message. Let's add one. What did you do? Try to describe it in less than 10 words!"
  }
];

export const syncQuestion = [
  {
    type: 'input',
    name: 'branchName',
    message:
      'We are about to sync with origin. What branch would you like to sync? Defaults to `all` if left empty'
  }
];

export const showQuestion = [
  {
    type: 'input',
    name: 'branch',
    message: 'What branch are you looking for? Type the name'
  }
];

export const storytimeStart = [
  {
    type: 'input',
    name: 'adventureName',
    message:
      'So you want to learn flig and git eh? Alright, type `flig` into the command line and lets start :)',
    validate: (value: string) => {
      if (value !== 'flig') {
        log.warning(
          '\n\nRemember to write flig if you want to start this interactive lesson :D'
        );
        return;
      }
      return true;
    }
  },
  {
    type: 'list',
    name: 'adventureCommand',
    message:
      "Welcome to the interactive flig learning platform, also known as iflp, which doesnt make sense so let's just skip this,s hall we?\n\n Which command would you like to know or understand better? :)",
    choices: [
      {
        value: 'init',
        name: 'init'
      },
      {
        value: 'own',
        name: 'own'
      },
      {
        value: 'add',
        name: 'add'
      },
      {
        value: 'main',
        name: 'main'
      },
      {
        value: 'moveto',
        name: 'moveto'
      }
    ],
    validate: (value: string) => {
      if (value in commandChoices) {
        return true;
      }
      log.warning(
        'You managed to choose something that doesnt exist. From a list. How.'
      );
    }
  }
];

export const storytimeAnswers = {
  add: `\nflig add\n\nThe "add" command from flig makes use of "git add" command to add modified, newly created or deleted files (and folders) to what is known as the staging area.\nFlig uses the "." character to add everything to the staging area so that we can keep track of all the changes without losing everything. Potentially we could also track single files or folders but flig has its own mind!\n\nThe staging area is where all the tracking happens. Up to this point we haven't committed (or pinpointed, as flig puts it) our changes yet, so we haven't created a new point on our project's timeline but this is where you can start to actually create one :)`,
  init: '\nflig init\n\nThe "init" command from flig makes use of git init command to create a repository.\nFlig uses the flags:\n\n"-q" to avoid stdout questions on the user\n"-b" to create a new branch with the name main.\n\nThis is because depending on your git installation you might be creating new repositories with a "main" branch called "master", which we should avoid :)',
  own: `\nflig own\n\nThe "own" command fron flig makes use of "git config" from git. When you "own" a repository with git you are changing the local configuration file in the .git folder of your project, unless stated otherwise (with the --global flag)\n\nUnder the hood git will apply:\n\ngit config --local user.name '<username>'\ngit config --local user.email '<email>'\n\nThis is the command that we are using behind the curtain to create a new local owner of the repository. This is the name and email that you are going to see on the origin's repository whenever you push something to it (or sync, in flig terms).\n\nIf you used the flag --global or -g, you set up the global owner of repositories which will own all repos unless stated otherwise on the local level.`,
  main: `\nflig main\n\nThe "main" command is really simple but what's behind it may surprise you!\n\ngit config -l | grep -oE -m 1 "main|master" | xargs -I {} bash -c 'git checkout {}'\nGit usually starts with either a main or master branch. Flig by defaults makes use of the main branch but for compatibility we also added the possibility to move back to the main branch, whatever the name.\nInstead of typing "flig moveto main" now you can simply "flig main" and flig will do its own magic :)\n\n1) git config -l\n2) grep -oE -m 1 "main|master"\n3) xargs -I {} bash -c 'git checkout {}'\n\nWe (1) take the config file and (2) search for the name of the main branch and when we find it we (3) pass it to the checkout function.`,
  moveto: `\nflig moveto <branch>\n\nThe "moveto" command switches between existing branches in your repository.\nIn git, this translates to:\n\n1) git checkout <branch name>'\n\nWithout any flags (like -b) git checkout switches between branches (pinpoints, in flig terms).\nIt's like having a cool space and time machine.`
};
