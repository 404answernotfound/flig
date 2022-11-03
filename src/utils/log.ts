import colors from 'colors';

export const log = {
  success: (msg: string) => console.log(colors.green(msg)),
  info: (msg: string) => console.log(colors.green(msg)),
  warning: (msg: string) => console.log(colors.yellow(msg)),
  error: (msg: string) => console.log(colors.red(msg)),
  rainbow: (msg: string) => console.log(colors.rainbow(msg)),
  first: (msg: string) => console.log(colors.bold(msg)),
  boring: (msg: string) => console.log(msg),
};
