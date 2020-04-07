const fs = require('fs');
const path = require('path');

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
    throw new Error(err);
  }
}

module.exports = doesExist;
