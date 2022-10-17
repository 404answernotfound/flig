import { flig } from './commands';
import { log } from './utils/log'

async function main() {
  await flig.parseAsync();
}
log.success('Application is starting');
main();
