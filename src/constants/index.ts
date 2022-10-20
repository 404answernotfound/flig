export const startQuestion = [
    {
        type: 'input',
        name: 'branchName',
        message: 'Willing to work eh? Alright. How shall we name this new piece of art?',
    },
    {
        type: 'list',
        name: 'branchType',
        message: 'What are you going to work on? Let\'s name your branch :)',
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
        ],
    },
];

export const localOwner = [
    {
        type: 'input',
        name: 'name',
        message: 'So, who\'s the user that is going to coordinate this local repo?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Let\'s also add an email (Github is kinda peaky about this!)',
    },
];