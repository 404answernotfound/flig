
## Badges
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# Project Title

Flig (flow in git) is a CLI package to help you and your team work better with a simple git flow


## Features

- A simplified but useful git workflow
- Automate some boring git tasks
- A tool to avoid git flows confusion
- `origin` and `local` always in sync
- Less conflicts during merge

Flig is opinionated, meaning that it will try and make smart choices based on a flow choice that I enjoy the most. If you don't like this behaviour you can definitely change it
by forking the project and applying your own changes.

The Flig flow takes in account that we always want `local` and `origin` to be in sync. It also tries to have the user shift to writing more meaningful commit messages. Ideally all conflicts should
be dealt by the user syncing the `local` with `origin` and viceversa. This ensures the QA and other members of the team do not have to deal with merging conflicts for most of the time.

Flig is an opinionated git wrapper and has its own flow, but that doesn't mean you can't use `git` alongside `flig` as you normally would. In fact, go ahead and do it if you need to!

## Future plans

- [ ] Write better errors for flig outside of git repositories
- [ ] Add new option to have more descriptive errors on stdout (--show-error)
- [ ] Explanation of each command to learn `git` (`flig` behind the curtains)
- [ ] Interactive tutorial to learn `flig`
- [ ] Interactive tutorial to learn `git` as used by `flig`
- [ ] Configurable git flow (the magic behind the command `flig`)

## Commands already available

```bash
- [ ] flig # for now is help
- [x] flig help
- [x] flig init
- [x] flig own [--local [--global]] # no global yet
- [x] flig start
- [x] flig moveto [branch name]
- [x] flig 
- [x] flig add [single file, *] # only all files
- [ ] flig save [[--withMaster [origin] branch name]
- [ ] flig sync [[origin] branch name]
- [ ] flig pick [--withoutSaving [origin] commit hash]
- [ ] flig forward [number]
- [ ] flig backward [number]
- [ ] flig revert [--n number [--commit commit hash]]
- [ ] flig config
- [x] flig show config
- [x] flig show logs
- [x] flig status
```

## Usage/Examples

```bash
flig # this should be magic and understand whatever git command you need
flig help
flig init # starts a git repository and asks whether you would like to change default configs like user.name and user.email, false by default
flig init owner [--local [--global]] # this happens automatically if the first time you run flig you dont have global user configurations for user and email, otherwise you can use it to change the local owner of the repo or you can use it to change the global owner of the repo (this requires you to write something)
flig start [branch name] # start new branch
flig moveto [branch name] # checkout to branch
flig add [single file, *] # stages changes
flig save [[--withMaster [origin] branch name] # commits staged changes and if --withMaster is true, tries to merge latest master after committing
flig sync [[origin] branch name] # pulls latest, if conflict tries to resolve, pushes. By default checkout master, pull latest, merge master into branch, pull latest from branch, push.
flig pick [--withoutSaving [origin] commit hash] # cherry picks specific commit, if --withoutSaving is active does only add without committing (-n)
flig forward [number] # goes to next commit in the tree/branch, if exists. By default number is 1 unless specified
flig backward [number] # goes to previous commit in the tree/branch, if exists. By default number is 1 unless specified
flig revert [--n number [--commit commit hash]] # git reset to HEAD^number or specific commit
flig config # asks user.name and user.email to add to local .git/config file
flig show config # full local config
flig show logs # full logs --oneline (should also show which branches are @ pinpoint)
```


## Run Locally


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@404answernotfound](https://www.github.com/404answernotfound)


## Acknowledgements
