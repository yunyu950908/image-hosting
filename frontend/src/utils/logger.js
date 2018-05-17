const oldLog = window.console.log;
const oldError = window.console.error;

window.console.log = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    oldLog.apply(console, args);
  }
};

window.console.error = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    oldError.apply(console, args);
  }
};
