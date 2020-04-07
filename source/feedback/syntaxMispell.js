/**
 * syntaxMispell gives feedback when we think there's a typo in the syntax in the document.
 *
 * @param {String} line - The content of the line we have found syntax misspelling on
 * @param {Number} counter - The number of the line we found the error on.
 */

const { info, underline } = require('./terminal');

('use strict');

function syntaxMispell(line, counter) {
  console.log(
    info('YOU WROTE'),
    `'${line}'`,
    info(`ON ${underline(`LINE ${counter}`)}. MAYBE YOU MEANT TO WRITE`),
    `'# ${line}' ${info('instead?')}`
  );
  console.log('');
}

module.exports = syntaxMispell;
