const fs = require('fs');
const path = require('path');

/*  FUNCTIONS FOR SETTING COLOR ON FEEDBACK IN TERMINAL */
const { error, warning, terminal } = require('../feedback/terminal');

/**
 *
 * @param {Directory} directory - The place where the option is supposed to be
 * @param {File/Folder} option - The file/folder we are checking if exists
 * @param {String} extension - Optional, used for items with an extension (basically files)
 */

('use strict');

async function doesExist(directory, file, type) {
  try {
    if (fs.existsSync(path.join(directory, file))) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    terminal(
      `${error(`ERROR: The ${type}`)} ${file} ${error(
        'could not be found in'
      )} ${directory}`
    );
    terminal(warning('Process was stopped...'));
  }
}

module.exports = doesExist;
