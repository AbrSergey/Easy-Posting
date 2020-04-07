# Document explaining the syntax used for writing posts 📝

This is currently being worked on. Some ideas/todos(?) that are currently on paper:

- Let user choose if `<a> tags should have a 'blank' (or maybe newtab) attribute` instead of automatically set target="\_blank" to all link tags created.
- Make it so that the content of headers shouldn't have to be on the line beneath the trigger? If so, maybe copy the way markdown creates titles (if allowed?)


### Browse document

1. [Main idea](#tmi)

2. [Core syntax](#cs)

3. [Document syntax](#Document-syntax-)

4. [Customized HTML tags](#cht)

5. [Syntax that doesn't require symbols](#stdrs)

6. [Full example of a post](#feoap)


&nbsp;

# The main idea 💡

The idea of this syntax is to combine the best parts of HTML, Markdown and normal document writage. To create components/section, you simply
use the trigger '#' and add the name of the component afterwards. Everything written beneath a trigger will be added to the sectio until a new trigger is used.
Read through the document to see usage examples.


### Currently available triggers: 

- Title
- Text
- Code
- Quote


### Syntax that doesn't require symbols: 

- Extra space between lines in text (breakpoint).

### HTML tags that are customized with the too:

- `<a>`
- `<code>`
- `<quote>`

&nbsp;

&nbsp;

# Core-syntax (required at the start of the post) ⚙️

--name: Here you enter the name of your post. This value will be used in the title of the post-page and in the preview-storage.

--introduction: Here you can give a small introduction to the post. Will only be used in the preview-storage.

&nbsp;

&nbsp;

# Document-syntax 

Note: None of the syntaxes are space sensitive. So it doesn't really matter if you write # Title - 3, #Title-3, # Title- 3, # Code, #Code etc.


## Title - (int:level)

Creates a h tag the level provided. For example will a '# Title - 3' create a `<h3>` tag for the content underneath. If no level is provided will the default value be 2.

#### Example:

```
# Title - 1
Here's a big title
```


## Text

Creates a normal text-section where everything will be created as written in the document.

#### Example:

```
# Text

Here is my first line in this section.
And here's a link to a cool page <a link="https://github.com">.


Because there were two lines between this line and the one above, will an automatic breakpoint be set between these two paragraphs.
And finally here's a list:
    <ol>
        <li>Egg</li>
        <li>Milk</li>
        <li>Rice</li>
    </ol>
```


## Code

Creates a big code-block section. Is somewhat similar to the customized `<code>` tag , but will have syntax-highlightning and be set as a own section.

#### Example:

```
# Code

function sayMessage(message) {
    return message
}

sayMessage('Hello 🤓!)

```


## Quote

Creates a big quote section and styles it. If you add three lines (---) to the end will the name afterward be set as the author/quotee of the quote.

#### Example

```
# Quote

“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”

--- Albert Einstein
```

&nbsp;

&nbsp;

# Customized html-tags 🏷️

- `<code>`: If you use the `<code>` tag in your document will it automatically create a styled code-block in your text. You can decide wether or not you want the code block to be an inline (following the text flow) or a block (be in a row for its own). To configure this, add a 'flow' attribute to the code. If you don't will the code automatically be displayed as a block.

Note that this tag does not have syntax highlightning, as it normally will just contain a very short snippet of code (maybe a couple of words). If you want to write more text then use the # Code section-tag.

#### Example:

`<code flow>addTwoNumbers(3, 14)</code>`

- `<quote>`: If you use the `<quote>` tag in your document will a styled blockquote be added in the text. Here you can also add a flow-attribute if you want the blockquote to flow with the text. Init styling is block.

- `<a>`: If you use the `<a>` (link) tag in your document will they automatically get the href="\_blank" attribute and a noreferrer for safety reasons.

&nbsp;

&nbsp;

# Syntax that doesn't require symbols 📃

If you want to have a space between to lines of text, simply add two lines between these and the program will automatically insert a `<br>` here.
Note: The extra breaks will only work between text in a section, so if you add any extra empty lines on the start or the end of a section, no breaks will be counted.

#### Example

```
# Text

(This extra space will not be counted because it's between the trigger and the first line of content)

This is my first line.


And because there are two empty lines between this line and the one above, the page will have extra spacing between these lines


And same here

(But these extra lines at the end of a section will not be counted because they're between the last line of content and the next trigger)

# Text

Some more text here

```

&nbsp;

&nbsp;

# Full example of a post 📑

````

--name This is the first blog post i have created
--introduction You know how this post was created automatically? It's quite cool

# Title - 1

This is the title of post

# Text

Here i could write some text about something I care about.
<a href="/test/posts/i-like-waffles/">Click here!!</a>
Above me is a link that you can click on, and this link works also <a href="/test/posts/i-like-waffles/">Click for a list</a>.


You can also write seperate paragraphs within a section. To do this, simply add 2 empty lines where you want the gap to be created (done right above this line)

#Title-3

Here is some code

# Code

function sayHello() {
    return 'Hello';
}


# Title

New title again, should be h2


# Quote

“Two things are infinite: the universe and human stupidity; 
and I'm not sure about the universe.”

--- Albert Einstein


# Title - 6

This is another title of my blog-post

# Text

Here i could write some text about something I care about.
<a href="/test/posts/i-like-waffles/">Click here!!</a>
Above me is a link that you can click on, and this link works also <a href="#list">Click for a list</a>.

You can also write seperate paragraphs within a section. The program will automatically create a gap for you in the html and css (at the same place you have done in your blog document).


# Quote

“Two things are infinite: the universe and human stupidity; 
and I'm not sure about the universe.”

--- Albert Einstein

```

