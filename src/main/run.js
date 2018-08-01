import { spawn } from 'child_process';
import { ipcMain } from 'electron';

ipcMain.on('job-que', (event, arg) => {
  if (event === 'add') {
    const job = spawn(arg.job.cmd, arg.job.args, arg.job.options);

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

