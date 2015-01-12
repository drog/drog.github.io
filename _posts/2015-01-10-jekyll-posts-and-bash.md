---
layout: post
title: Jekyll Posts and bash
date: enero 10 15:02:17
author: drog

tags:

---

Finding a way to automate the process of creation post, i found some interesting resources in the internet like scripts in bash.

Now the process is more simple and easier.
Just type in the terminal

![Script in action]({{ site.baseurl }}public/img/jekyll-bash-test.png)

<!--more-->

And Voilá!

``` bash
---
layout: post
title: test1
date: enero 11 23:49:58
author: drog

tags:
  - tag
  - tag2
  - tag3

---
```

## The script

``` bash
JEKYLL_LOCAL_ROOT="$HOME/blog/"
JEKYLL_FORMATTING="markdown"
AUTHOR="drog"

# 'builtin cd' into the local jekyll root

builtin cd "$JEKYLL_LOCAL_ROOT/_posts/"

# Get the date for the new post's filename

FNAME_DATE=$(date "+%Y-%m-%d")

# Get the title for the new post

read -p "Enter title of the new post: " POST_TITLE

read -p "Enter tags of the new post (separated by spaces): " POST_TAGS

# Convert the spaces in the title to hyphens for use in the filename

FNAME_POST_TITLE=`echo $POST_TITLE | tr ' ' "-"`

# Convert title to lowercase
# --
# http://stackoverflow.com/questions/2264428/converting-string-to-lower-case-in-bash-shell-scripting
# http://www.kclug.org/pipermail/kclug/2003-April/015084.html

FNAME_POST_TITLE="`echo ${FNAME_POST_TITLE} | tr '[A-Z]' '[a-z]'`"

# Now, put it all together for the full filename

FNAME="$FNAME_DATE-$FNAME_POST_TITLE.md"

# And, finally, create the actual post file. But we're not done yet...

touch "$FNAME"

# Write a little stuff to the file for the YAML Front Matter

echo "---" >> $FNAME

echo "layout: post" >> $FNAME

# Echo the original post title to the YAML Front Matter header

echo "title: $POST_TITLE" >> $FNAME

# Now we have to get the date, again. But this time for in the header (YAML Front Matter) of
# the file

YAML_DATE=$(date "+%B %d %X")

# Echo the YAML Formatted date to the post file

echo "date: $YAML_DATE" >> $FNAME

echo "author: $AUTHOR" >> $FNAME

echo >> $FNAME

echo "tags:" >> $FNAME	
for tag in $POST_TAGS; 
	do echo "  - $tag" >> $FNAME; 
done

# Close the YAML Front Matter Header
echo >> $FNAME
echo "---" >> $FNAME
echo >> $FNAME

# Open the file in your favorite editor

$EDITOR $FNAME &

```

## Testing

Then add a alias to your .bashrc or .zshrc   
`alias post='~/.scripts/post.sh'`

And enjoy!
`$ post`

## Sources

* [Easier Post Creation for Jekyll with Bash](http://nateeagle.com/2011/09/21/easier-post-creation-for-jekyll-with-bash/
)
* [jekyll.plugin.bash](https://github.com/aziz/dotfiles/blob/master/bash/plugins/jekyll.plugin.bash)


