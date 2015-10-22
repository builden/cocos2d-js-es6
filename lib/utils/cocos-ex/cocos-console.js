import moment from 'moment';

function getNow() {
  return moment().format('HH:mm:ss.SSS');
}

const cocosConsole = {
  log(...args) {
    console.log(`${getNow()} [LOG] ${args.join(' ')}`);
  },

  info(...args) {
    console.log(`${getNow()} [INFO] ${args.join(' ')}`);
  },

  warn(...args) {
    console.log(`${getNow()} [WARN] ${args.join(' ')}`);
  },

  error(...args) {
    console.log(`${getNow()} [ERROR] ${args.join(' ')}`);
  },
};

export default (cc.sys.isNative ? cocosConsole : console);

