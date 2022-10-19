#!/usr/bin/env node
import { flig } from './commands';
import { log } from './utils/log'

async function main() {
  await flig.parseAsync();
}
main();
