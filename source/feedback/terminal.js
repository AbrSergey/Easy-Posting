/*  FUNCTIONS FOR SETTING COLOR ON FEEDBACK IN TERMINAL */
const chalk = require('chalk');

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const info = chalk.keyword('yellow');
const success = chalk.bold.green;
const underline = chalk.underline;

/**
 * @param {String} message - The message that should be displayed in the terminal
 * @param {Boolean} followUp - Set to true if a message should be in the same 'section' as the previous
 */

const type = message => console.log(message);

const terminal = (message, followUp = false, first = false) => {
  if (!followUp && !first) {
    type('---------');
  }
  if (message) {
    if (!followUp) {
      type('');
    }
    type(message);
    type('');
  }
};

module.exports = {
  error,
  warning,
  info,
  success,
  underline,
  terminal
};
