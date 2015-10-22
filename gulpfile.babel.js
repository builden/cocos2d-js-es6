import gulp from 'gulp';
import {spawn} from 'child_process';
import iconv from 'iconv-lite';
import os from 'os';

function innerSpawn(cmd, args) {
  return new Promise((resolve, reject) => {
    const ls = spawn(cmd, args);

    ls.stdout.on('data', (data) => console.log(iconv.decode(data, 'gbk')));
    ls.stderr.on('data', (data) => console.error(iconv.decode(data, 'gbk')));

    ls.on('exit', (code) => resolve(code));
  });
}

async function compile() {
  const cmd = 'cocos' + ((os.platform() === 'win32') ? '.bat' : '');
  const args = ['compile', '-m', 'release', '-p', 'web'];
  await innerSpawn(cmd, args);
}

gulp.task('webpack', async () => {
  const cmd = 'webpack' + ((os.platform() === 'win32') ? '.cmd' : '');
  await innerSpawn(cmd, ['-p']);
});

gulp.task('build:web', ['webpack'], async() => {
  await compile();
});
