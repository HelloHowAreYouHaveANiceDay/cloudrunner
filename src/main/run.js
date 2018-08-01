import { spawn } from 'child_process';
import { ipcMain } from 'electron';

export default function () {
  ipcMain.on('job', (event, arg) => {
    event.sender.send('main-log', 'hello!');
    if (event === 'add') {
      let job;
      if (arg.job.args) {
        job = spawn(arg.job.command, arg.job.args, arg.job.options);
      } else {
        job = spawn(arg.job.command, arg.job.options);
      }
      job.stdout.on('data', (data) => {
        event.sender.send(arg.job.id, data);
      });

      job.stderr.on('data', (data) => {
        event.sender.send(arg.job.id, data);
      });

      job.on('close', (code) => {
        event.sender.send(arg.job.id, code);
      });
    }
  });
}

