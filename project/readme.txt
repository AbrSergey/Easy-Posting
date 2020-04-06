NOTE: This readme is very rough. I've just written down things when i come up with them so i don't forget.

Post creation:

This is a program that allows people to easily have posts on their website without the dependence of a server. This program automatically creates a static page that follows your own custom template. The post will have a pre-defined styling, but you can easily overwrite this in the template file by providing your own css file. The posts init styling will automatically be put above your css style, so that the parts you want to style yourself will be set as the main styling because of CSS's order of precedence.

IMPORTANT! Have the css file that is on the template in the same place as the root-folder where your other static pages are.

To create the template, simply create a html file with your desired items/styling, and input a <POST> tag (with no closing bracket) where you want the post to be inserted on the page. Documentation will provide a guide.

The program provies an automatically created .json file that will contain a preview of all posts created (ordered by date - latest at top), which can easily be used to create for example a panel or a blog-frontpage. Check the documentation for some tips on how to implement this with the JavaScript FETCH-API.

This program is designed to work seamlessly with GitHub pages, and makes the process of creating new posts pleasantly simple. Every page will be inserted into a /posts folder, which will contain folders with the names of the post. Each of these folders will contain an index.html file. Here's an example on how the url for a post would look like: https://yourblog.github.io/posts/my-first-blog/

Because HTML-tags are quite easy to understand i didn't see any reason to change the syntax for these. So if you want to implement any html-tags in your text, you can just write them in as you would in normal html. You can even give them classes and id's if you wish.

Some things that this programs does for you:
Secure a-tags (with a noreferrer)




Syntax for creating posts:

### Core-syntax:

N.B: The ' used in the examples are not supposed to be used when actually creating a post document. They are just used for not triggering markdown.

--name: Here you enter the name of your post. This value will be used in the title of the post-page and in the preview-storage.

--introduction: Here you can give a small introduction to the post. Will only be used in the preview-storage.


### Doc-syntax:

Note: None of the syntaxes are space sensitive. So it doesn't really matter if you write # Title - 3, #Title-3, # Title- 3, # Code, #Code etc.


# Title - (int:level)

Creates a h tag the level provided. For example will a '# Title - 3' create a <h3> tag for the content underneath. If no level is provided will the default value be 2.

# Text

Creates a normal text-section. In here you can just write text as you normally would, and the program will automatically format it so the setup will be as you wrote.

# Code

Creates a big code-block section for everything within this section. Is somewhat similar to the <code> tag in the Customized html-tags below, but will be formated differently and set as a own section.

# Quote

Creates a big quote section and styles it. If you add three lines, ---, to the end will the name afterward be set as the author/quotee of the quote.

Example start
//////////////////////

“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”

--- Albert Einstein

//////////////////////
Example end



### Customized html-tags:

<code>: If you use the <code> tag in your document will it automatically create a styled code-block in your text. You can decide wether or not you want the code block to be an inline (following the text flow) or a block (be in a row for its own). To configure this, add a 'flow' attribute to the code. If you don't will the code automatically be displayed as a block.

Note that this tag does not have syntax highlightning, as it normally will just contain a very short snippet of code (maybe a couple of words). If you want to write more text then use the # Code section-tag.
Example: <code flow>myFunc()</code>

<quote>: If you use the <quote> tag in your document will a styled blockquote be added in the text. Here you can also add a flow-attribute if you want the blockquote to flow with the text. Init styling is block.
Example: <quote>I like trains</quote>


### Formating that doesn't require any syntax

If you want to have a space between to lines of text, simply add two lines between these and the program will automatically insert a <br> here.
Note: The extra breaks will only work between text in a section, so if you add any extra empty lines on the start or the end of a section, no breaks will be counted.

Example start
//////////////////////

# Text


//// This extra space will not be counted (because it's between the trigger and the first line of content)

This is my first line.


And because there are two empty lines between this line and the one above, the page will have extra spacing between these lines


And same here


//// But these extra lines at the end of a section will not be counted (because they're between the last line of content and the next trigger


# Text

Some more text here

//////////////////////
Example end




## Example:

How the syntax works: you set a "#" with your desired section afterwards (for example: # Title), and all the text afterwards will automatically be picked up as a part of that section.

Here's a small example of how this works:
