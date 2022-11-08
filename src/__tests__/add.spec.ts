import { Command } from 'commander';
import flig from '../commands';
import { add } from '../commands/add';

const cmd = flig.commands.values();
let _: any;
for (let c of cmd) {
  if (c.name() === 'add') {
    _ = c;
  }
}

describe('Add command should be an instance of Command', () => {
  test('should be an instance of Command', () => {
    expect(add).toBeInstanceOf(Command);
  });

  test('should have name add', () => {
    expect(add.name()).toBe('add');
  });

  test('should have options', () => {
    expect(_.options).toBeDefined();
  });

  test('should have explain options', () => {
    let options: string[] = _.options.map((opt: any) => opt.short);
    let explain = options.find((value) => value === '-e');
    let onlyExpain = options.find((value) => value === '-oe');
    expect(explain).toBe('-e');
    expect(onlyExpain).toBe('-oe');
  });
});
