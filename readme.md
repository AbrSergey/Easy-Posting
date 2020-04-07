# Project description ℹ️

The projects main task is to create a tool that simplifies the process of creating static posts without the need of a server. By passing in a html template and a text document with a syntax that the tool understands, will the output be an automatically generated index.html. The file will be put into a parent folder with the name of the post, which will again be inserted into a generic "posts"-folder. This structure design is created to fit GitHub pages. 


## What have i done so far: ✅

- Created a working core that parses a template.html file and a text file and creates the html page for the post.
- Made it possible to update posts.
- Added 6 options for creating post. 3 of them are mandatory, the rest are optional.
- Added error-handling with user-friendly feedback.
- Created a couple of syntaxes for writing a post.
- Created automatic JSON storage which is ordered by date. If a post is updated, will only the content and not the date be updated.
- Added Highlight.js as a library on the client side for prettifying code-blocks.
- Created some basic init-styling in CSS for the post-components.
- Created a Javascript example for the client for fetching the posts.

## TODO(?) (Ideas): ❓

- Create proper documentaion and explanation for usage.
- Create an 'updateTemplate()' function that updates all the posts with a new template provided.
- Create an 'updateJSON()' function, in case the user accidently removes the file.
- Give user more options; Dark mode for post? Decide how to order JSON?
- Add optional navigation overlay on posts?
- Adding optional "show related post at bottom" feature? And figure out how to create this
- Enhance the code and improve the structure so that it can easily scale.
- Maybe add support for different HTML templates like Pug, Handlebars etc.? (probably a hairy goal, but could be fun)
- Create env-commands for executing program.
- Learn how to properly create a NPM package.
- Create a cool website for the project.
- Set up test enviroments and other practical stuff that i know nothing about.
- Come up with tons of more ideas.
- Have fun & learn


# Hello there! 👋

Welcome to my open source project! Let me tell to you what this is about. 🙌

Note: This project is continuously being worked whenever i have time atm.

Recently i've been looking for different projects to work on, and a couple of days ago i found out about Jekyll.
I became fascinated and inspired by the concept, and thought: "Hmm, something like this would be fun to replicate in NodeJS".

The main foucus areas for my projects are always simple and intuitive designs, so when
i sat down and started working on this, i challenged myself to come up with a solution that
hopefully even the newest programmers can understand how to use. I'm not saying that i have completed this,
but i think that the approach i've chosen is at least in the right direction. I've also tried to come up some syntaxes for writing posts, as this project is aimed for being simplified (but comprehensive enough for most usage).
There not a lot of syntax yet, but i've tried to create the source-code so that adding more syntax is easy.

However, i am still just a junior developer attending college. I really want to begin engaging more into open source
code and communities, and gain knowledge about all the different tools people use when programming together over the web (i am really fresh here, no experience at all).

Therefore i want to seek people that find some excitement in this project, and want to join me on developing it even more.
I would love to collaborate with people that i can learn from, and maybe create a little group where the main goal is to develop our skills while having fun and experimenting with new things. If enough people are interested, then maybe i can create a Slack/Discord group 🤓👨‍💻


#### If you have any questions, or want to join in on this little open-source project, then send me an 📧 at mathiaswpicker@gmail.com

Have a nice day!

-- Mathias
