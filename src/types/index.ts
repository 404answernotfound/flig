export type TCommands = {
  title: string;
  description: string;
  args?: TArguments;
  action: (arg1?: any, arg2?: any) => any;
  [key: string]: any;
};

export type TArguments = {
  name: string;
  description?: string;
  defaultValue?: unknown;
};
