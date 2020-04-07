/**
 * This program creates the post page from the html template and post document. It automatically creates a 'posts' folder in the root of the
 * project (or if already exists, uses that one) and creates a folder there with the name of the post. Within this folder will a
 * index.html file be created.
 *
 * The idea of the program is that we take in an HTML-file which serves as a template.
 * The program keeps everything that has been written in the template, and places the files needed on the client side
 * at the end of the <head> tag. Only exception is the init styling for the post. This css file will be placed above
 * the <link> tag containing a css file. This is done so that if user wants, they can style the post-components as they wish in
 * their css file in the template, and because of css's order of precedence will their stylings be used instead of the init-stylings.
 *
 * The program also automatically creates a .json file, containing all the posts in the posts-folder. This .json file
 * can be used to for example create preview components of the posts on the users homepage. This .json file will also be stored in the posts folder,
 * along with the styling.css and client.js file.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

/*  FUNCTIONS FOR SETTING COLOR ON FEEDBACK IN TERMINAL */
const {
  error,
  warning,
  info,
  success,
  terminal
} = require('./feedback/terminal');

const createPost = require('./createPost');
const doesExist = require('./checkers/doesExist');
const addToJson = require('./dist/addToJson');

('use strict');

/**
 * createPage creates the html page for the post page
 * @param {__dirname} directory - The dirname of where the template is
 * @param {string} template - Name of html file used for templating the post
 */

async function createPage(directory, options) {
  /**
   * This function does a couple of different things.
   *
   * 1. First of all we assign the values from the option parameter, and begin checking if everything is okay.
   *    For every step, if something has gone wrong, we tell the user and stop the execution.
   *
   *    Most of the code here is pure error-handling and feedback, but i find it important to give
   *    proper feedback if the user has done something wrong.
   *
   */

  let { template, sourcefolder, postname, location = '' } = options;

  if (template === undefined) {
    terminal(warning('Please add the template for the page.'), false, true);
    return;
  }
  if (sourcefolder === undefined) {
    terminal(
      warning('Please add the source folder where your text-file is located.'),
      false,
      true
    );
    return;
  }
  if (postname === undefined) {
    terminal(
      warning('Please add the name of text-file to create a page for.'),
      false,
      true
    );
    return;
  }

  template = template;
  sourcefolder = sourcefolder;
  postname = postname;
  location = location;

  terminal(info('Starting page-creation 🎉'), false, true);

  let { extension, update = false } = options;

  let postFile;
  let postCreated = false;

  const templateExist = await doesExist(
    directory,
    template + '.html',
    'template'
  );

  const sourcefolderExist = await doesExist(
    directory,
    sourcefolder,
    'sourcefolder'
  );

  const locationFolderExist = await doesExist(
    directory,
    location,
    'location-folder'
  );

  if (!templateExist) {
    terminal(
      `${error('The template')} '${template}.html' ${error(
        'does not exist. Please insert a valid filename.'
      )}`
    );
    return;
  }

  if (!sourcefolderExist) {
    terminal(
      `${error('The folder')} '${sourcefolder}' ${error(
        'does not exist. Please insert a valid directory.'
      )}`
    );
    return;
  }

  if (!locationFolderExist) {
    terminal(
      `${error('The location')} '${location}' ${error(
        'does not exist. Please insert a valid directory.'
      )}`
    );
    return;
  }

  if (extension === undefined) {
    try {
      const postFilesArray = await fs.promises.readdir(
        path.join(directory, sourcefolder),
        function(err, files) {
          if (err) {
            terminal(err);
            return;
          }
        }
      );

      postFile = postFilesArray.find(
        postFile => postFile.split('.')[0] === postname
      );

      if (!postFile) {
        terminal(
          `${error('ERROR: The file')} ${postname} ${error(
            'could not be found in'
          )} ${directory} ⛔`
        );
        terminal(warning('Process was stopped.'));
        return;
      }
    } catch (error) {
      throw Error(error);
    }
  } else {
    extension = extension.includes('.') ? extension : `.${extension}`;
    postFile = postname + extension;

    if (
      !(await doesExist(
        path.join(directory, sourcefolder),
        postFile,
        'post document'
      ))
    ) {
      terminal(
        `${error('ERROR: The file')} ${postname} ${error(
          'could not be found in'
        )} ${directory} ⛔`
      );
      terminal(warning('Process was stopped.'));
      return;
    }
  }

  const pageExists = await doesExist(
    path.join(directory, location, 'posts'),
    postname,
    'page'
  );

  if (pageExists && !update) {
    terminal(
      `${error('ERROR: The page for')} ${postFile} ${error(
        'already exists.'
      )} ⛔`
    );
    terminal(
      warning(
        'If you wanted to update the post page, then the set the update option to true.'
      ),
      true
    );
    terminal(warning('Process was stopped.'));
    return;
  }

  /**
   *
   * 2. Good news! All the files existed, and if they didn't, the process has been stopped and the user knows what's up.
   *    So now we begin parsing the template and create a new one.
   *
   *    The approach here is that we first store the core info about the post, which will be added to the .json file and to a secret .config file in every post.
   *    We also extract the birth-time of the post document so that each post has a date of when it was written. This is used for easily sorting by date.
   *
   */

  const postCoreInfo = {
    url: 'posts/' + postname,
    name: '',
    introduction: '',
    creationDate: '',
    creationDateMS: 0
  };

  const readPreviewFromPost = fs.createReadStream(
    path.join(directory, sourcefolder, postFile),
    'utf8'
  );

  const rlPost = readline.createInterface({
    input: readPreviewFromPost,
    crlfDelay: Infinity
  });

  for await (const line of rlPost) {
    if (line.includes('--name')) {
      postCoreInfo.name = line.replace('--name', '').trim();
    }
    if (line.includes('--introduction')) {
      postCoreInfo.introduction = line.replace('--introduction', '').trim();
    }

    // If both core-values have been set then cancel for loop
    if (postCoreInfo.name.length > 0 && postCoreInfo.introduction.length > 0) {
      break;
    }
  }

  // Getting birthtime of file and creating a nice date string which will be displayed on the page.
  fs.stat(path.join(directory, sourcefolder, postFile), (err, stat) => {
    if (err) {
      terminal(chalk.red(err));
    } else {
      const creationDate = stat.birthtime.toString().split(' ');

      let day = creationDate[0];

      let month = creationDate[1];

      let date = creationDate[2];
      let suffix = 'th';

      const year = creationDate[3];

      const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ];
      const months = [
        'January',
        'February',
        'March',
        'April',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      day = days.find(d => d.startsWith(day));
      month = months.find(d => d.startsWith(month));

      date = date.startsWith(0) ? date[1] : date;

      if (date.endsWith(1)) {
        suffix = 'st';
      } else if (date.endsWith(2)) {
        suffix = 'nd';
      } else if (date.endsWith(3)) {
        suffix = 'rd';
      }

      postCoreInfo.creationDate = `${day} ${date + suffix} of ${month} ${year}`;
      postCoreInfo.creationDateMS = stat.birthtimeMs;
    }
  });

  /**
   *
   * 3. Here we choose (or create) the posts-folder and then afterwards create the folder which will contain the page.
   *
   *    When that's done, we copy over the styling.css file from our program and put it in the posts folder. I've chosen the approach of copying it over everytime,
   *    so that if something get's changed in the styling.css file by accident, it will be fixed when a new post gets created.
   *    Then the same gets done with the client.js file (but at the bottom of the <head> tag). This file contains the init function for Highlight.js.
   *
   */

  const publicPostsFolder = path.join(directory, location, 'posts');

  if (!fs.existsSync(publicPostsFolder)) {
    fs.mkdirSync(publicPostsFolder);
    terminal(info("The 'posts'-folder has been created."));
  }

  const JSONSuccess = await addToJson(publicPostsFolder, postCoreInfo, update);

  if (JSONSuccess === 'failure') {
    terminal(warning('Process was stopped.'));
    return;
  }

  const publicFolder = path.join(publicPostsFolder, postname);

  if (!fs.existsSync(publicFolder)) {
    fs.mkdirSync(publicFolder);
  }

  fs.copyFile(
    path.join(__dirname, 'client-files', 'styling.css'),
    path.join(publicPostsFolder, 's.css'),
    err => {
      if (err) throw err;
    }
  );

  fs.copyFile(
    path.join(__dirname, 'client-files', 'code.js'),
    path.join(publicPostsFolder, 'c.js'),
    err => {
      if (err) throw err;
    }
  );

  const readStream = fs.createReadStream(
    path.join(directory, template + '.html'),
    'utf8'
  );

  const writeStream = fs.createWriteStream(
    path.join(publicFolder, 'index.html'),
    'utf8'
  );

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  /**
   *
   * 4. Here we read every line of the template.html file, parse it and create the new post page.
   *
   *    The general idea here is that we find the tags we are interested in, and customize them and/or add extra lines
   *    that are needed for the page.
   *
   *    Because we read everything line for line, i chose to create the whole postHTML in the createPost() function in a single line.
   *    This approach, combined with trimming everything, makes the page pretty much minified.
   *
   */

  let cssSet = false;

  for await (const line of rl) {
    // Adding the name of the post to the title of the document
    if (line.includes('<title>')) {
      writeStream.write(
        line.replace('</title>', ` - ${postCoreInfo.name}</title>`)
      );
    }
    // Finding the first link tag with a css file
    else if (line.includes('link') && line.includes('.css') && !cssSet) {
      writeStream.write('<link rel="stylesheet" href="../s.css"/>');

      // Keeping the original css-file but setting the correct path
      writeStream.write(line.trim().replace('href="', 'href="../../'));

      cssSet = true;
    }
    // Finding the end of the head tag
    else if (line.includes('</head>')) {
      // I decided to use the highlight.js library for syntax-highlightning the code. It just works
      writeStream.write(
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/atom-one-dark.min.css">'
      );
      writeStream.write(
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js" defer></script>'
      );

      writeStream.write('<script src="../c.js" defer></script>');

      writeStream.write(line.trim());
    }
    // Finding the post-indicator
    else if (line.toLowerCase().includes('<post>')) {
      // Create the post-section
      writeStream.write('<section class="post-section">');

      // Adding creation date
      // Doing this here instead of in the createPost file, because that creates HTML based on document content.
      // The date is automatically added no matter what.
      writeStream.write(
        `<time class="created-at">${postCoreInfo.creationDate}</time>`
      );

      // Create post and insert into page.
      const postHTML = await createPost(directory, sourcefolder, postFile);

      writeStream.write(postHTML);

      postCreated = true;

      writeStream.write('</section>');
    } else {
      // Everything else should be inserted as normal
      writeStream.write(line.trim());
    }
  }

  if (!postCreated) {
    terminal(
      warning(
        'WARNING! YOU DID NOT PROVIDE ANY <POST> TAG IN YOUR HTML-TEMPLATE. POST PAGE WAS STILL CREATED BUT HAS NO CONTENT FROM YOUR POST.'
      )
    );
  } else {
    // Creating a hidden config-file which stores the core-info about this post.
    const coreInfo = fs.createWriteStream(
      path.join(publicFolder, '.post.config'),
      'utf8'
    );

    for (const info in postCoreInfo) {
      coreInfo.write(`${info} || ${postCoreInfo[info]}\n`);
    }
  }

  if (pageExists && update) {
    terminal(
      `${success('THE PAGE FOR')} '${postFile}' ${success(
        'HAS SUCCESFULLY BEEN UPDATED 🔁'
      )}`
    );
  } else {
    terminal(
      `${success('THE PAGE FOR')} '${postFile}' ${success(
        'HAS SUCCESFULLY BEEN CREATED ✅'
      )}`
    );
  }
}

module.exports = createPage;
