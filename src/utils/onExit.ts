import { ChildProcess } from 'child_process';

export default function onExit(childProcess: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.once('exit', (code: number, signal: string) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject();
      }
    });
    childProcess.once('error', (err: Error) => {
      reject();
    });
  });
}
