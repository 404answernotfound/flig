import { Command } from 'commander';
import { add } from './add';
import { main } from './main';
import { init } from './init';
import { moveto } from './moveto';
import { own } from './own';
import { show } from './show';
import { start } from './start';
import { status } from './status';
import { save } from './save';
import { sync } from './sync';
import { forward } from './forward';
import { backward } from './backward';
const flig = new Command();

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
flig.addCommand(main);
flig.addCommand(add);
flig.addCommand(own);
flig.addCommand(status);
flig.addCommand(save);
flig.addCommand(sync);
flig.addCommand(forward);
flig.addCommand(backward);

export default flig;