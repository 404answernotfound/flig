export type TCommands = {
  title: string;
  description: string;
  args?: TArguments;
  action: () => any;
  [key: string]: any;
};

export type TArguments = {
  name: string;
  description?: string;
  defaultValue?: unknown;
};
