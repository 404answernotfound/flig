const questions = [
    {
        type: 'list',
        name: 'cmd',
        message: 'What are you going to work on? Let\'s name your branch!',
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