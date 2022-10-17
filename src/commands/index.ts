import { Command } from 'commander';
import { show } from './show';
export const flig = new Command();

flig
  .name('flig')
  .description(
    'Flig (flow in git) is a CLI package to help you and your team work better with a simple git flow'
  )
  .version('0.1.0');

flig.addCommand(show);
