import { Command } from 'commander';
import flig from '../commands';

describe('Flig commands', () => {
  test('should be an instance of Command', () => {
    expect(flig).toBeInstanceOf(Command);
  });

  test('should have all the commands', () => {
    const cmds = flig.commands.values();
    const allCmds = [
      'add',
      'main',
      'init',
      'moveto',
      'own',
      'show',
      'start',
      'status',
      'save',
      'sync',
      'forward',
      'backward'
    ];
    const foundCmds: string[] = [];

    for (let cmd of cmds) {
      foundCmds.push(cmd.name());
    }

    expect(foundCmds.length).toBe(allCmds.length);
  });
});
