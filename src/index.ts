#!/usr/bin/env node
import flig from './commands';

async function main() {
  await flig.parseAsync();
}
main();
