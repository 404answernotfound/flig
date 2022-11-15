import { log } from '../utils/log';

const commandChoices = [
  'init', 'own', 'add'
];

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
        name: 'Init'
      },
      {
        value: 'own',
        name: 'Own'
      },
      {
        value: 'add',
        name: 'Add'
      }
    ],
    validate: (value: string) => {
      if (value in commandChoices) {
        return true;
      }
      log.warning('You managed to choose something that doesnt exist. From a list. How.')
    }
  }
];
