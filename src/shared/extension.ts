export interface Extension {
  name: string;
  initialize(): Promise<this>;
  execute(message: JSON): Promise<any>;
}
