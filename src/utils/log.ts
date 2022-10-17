import colors from 'colors';
import colorfulfun from './colorful';

export const log = {
  success: (msg: string) => console.log(colors.green(msg)),
  info: (msg: string) => console.log(colors.blue(msg)),
  warning: (msg: string) => console.log(colors.yellow(msg)),
  error: (msg: string) => console.log(colors.red(msg)),
  rainbow: (msg: string) => console.log(colors.rainbow(msg)),
  random: (msg: string) => console.log(colors.random(msg)),
};
