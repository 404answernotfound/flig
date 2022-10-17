const colorful = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
  'reset',
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'hidden',
  'strikethrough',
  'rainbow',
  'zebra',
  'america',
  'trap',
  'zalgo'
];

const colorfulfun = (): string => {
  return colorful[Math.floor(Math.random() * (colorful.length - 1))];
};

export default colorfulfun;
