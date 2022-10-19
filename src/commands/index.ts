import { Command } from 'commander';
import { add } from './add';
import { gotomain } from './gotomain';
import { init } from './init';
import { moveto } from './moveto';
import { show } from './show';
import { start } from './start';
export const flig = new Command();

flig
  .name('flig')
  .description(
    'Flig (flow in git) is a CLI package to help you and your team work better with a simple git flow'
  )
  .version('0.1.0');

flig.addCommand(init);
flig.addCommand(show);
flig.addCommand(start);
flig.addCommand(moveto);
flig.addCommand(gotomain);
flig.addCommand(add);
