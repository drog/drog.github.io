---
layout: post          #important: don't change this
title: "Reduce the size of Bootstrap with Gulp"
date: 2015-01-01 23:42:34
author: drog
categories:
- blog                #important: leave this here
- gulp

tags:
- gulp
- bower
- bootstrap
- font awesome

---

Initially bootstrap vanilla (without modifications) with font-awesome uses in total 924k!!.  
After some modifications in the css and javascript got 700kb. An 224 kb less corresponding to 24.25% less of size.

<!--more-->

### How?

Remove components unused in my blog of bootstrap.  

#### From css

* dropdowns
* forms
* tables
* alerts
* modal
* carousel
* and other components

#### From javascript

* affix  4,7K
* modal 9,2K
* carousel 7,0K
* and other components

And the more important, remove glyphicons for use font-awesome.

### Before

Size of css

``` bash
ls -lh
total 136K
-rw-r--r-- 1 diego users 111K nov 12 14:03 bootstrap.min.css
-rw-r--r-- 1 diego users  22K ago 26 14:03 font-awesome.min.css
```

Size of fonts glyphicons (built in default with bootstrap )  

``` bash
ls -lh  
total 152K
-rw-r--r-- 1 diego users 20K nov 12 14:03 glyphicons-halflings-regular.eot
-rw-r--r-- 1 diego users 62K nov 12 14:03 glyphicons-halflings-regular.svg
-rw-r--r-- 1 diego users 41K nov 12 14:03 glyphicons-halflings-regular.ttf
-rw-r--r-- 1 diego users 23K nov 12 14:03 glyphicons-halflings-regular.woff
```

Size of fonts font-awesome  

``` bash
ls -lh                                                                 
total 600K
-rw-r--r-- 1 diego users  84K ago 26 12:36 FontAwesome.otf
-rw-r--r-- 1 diego users  55K ago 26 12:36 fontawesome-webfont.eot
-rw-r--r-- 1 diego users 281K ago 26 12:36 fontawesome-webfont.svg
-rw-r--r-- 1 diego users 110K ago 26 12:36 fontawesome-webfont.ttf
-rw-r--r-- 1 diego users  64K ago 26 12:36 fontawesome-webfont.woff
```

Size of bootstrap javascript 

``` bash
ls -l
total 36
-rw-r--r-- 1 diego users 35601 nov 12 14:03 bootstrap.min.js

``` 

### Gulp Code

#### First add the dependencies

``` javascript
var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
```

Rememember install this with  `npm install --save-dev gulp gulp-less gulp-uglify gulp-minify-css gulp-rename gulp-concat`

#### The magic part

First compile the bootstrap.less with the custom config. Then compile the less, minify, renamed and copied to assets/css.


``` javascript
gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function bootstrapCompileLess() {
  return gulp.src('bower_components/bootstrap/less/bootstrap.less')
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/css/'));
});
```

You can get the custom boostrap.less  [here](https://github.com/drog/drog.github.io/blob/master/customs/less/bootstrap.less)

Then the javascript part, here just get the components used for your web page and then concat this.

``` javascript
gulp.task('bootstrap:compileJs', function bootstrapCompileLess() {
  return gulp.src(['bower_components/bootstrap/js/button.js',
                'bower_components/bootstrap/js/transition.js',
                'bower_components/bootstrap/js/collapse.js',
                'bower_components/bootstrap/js/tooltip.js'])
      .pipe(concat('bootstrap.js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/js/'))
});
```
And finally here is the default task, when you put `gulp` in the terminal this will execute the two task.

``` javascript
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['bootstrap:compileLess', 'bootstrap:compileJs']);
```

You can get the gulpfile.js [here](https://github.com/drog/drog.github.io/blob/master/gulpfile.js) 

### After customizations

``` bash
ls -lh 
total 86K
-rw-r--r-- 1 diego users  86K ene  1 15:05 bootstrap.min.css
```

``` bash
ls -lh
total 14K
-rw-r--r-- 1 diego users 14K ene  1 15:05 bootstrap.min.js
```

``` bash
ls -lh
total 600K
-rw-r--r-- 1 diego users  84K ene  1 15:05 FontAwesome.otf
-rw-r--r-- 1 diego users  55K ene  1 15:05 fontawesome-webfont.eot
-rw-r--r-- 1 diego users 281K ene  1 15:05 fontawesome-webfont.svg
-rw-r--r-- 1 diego users 110K ene  1 15:05 fontawesome-webfont.ttf
-rw-r--r-- 1 diego users  64K ene  1 15:05 fontawesome-webfont.woff
```

### Well, all this effort for 224kb less?

Maybe the difference of 224kb is irrelevant... or maybe not.

* 47% of consumers expect a web page to load in 2 seconds or less.
* 40% of people abandon a website that takes more than 3 seconds to load.
* A 1 second delay in page response can result in a 7% reduction in conversions.

In conclusion all efforts are good to improve the size of page and reduce the time of load of your page, maybe this 224kb denote the difference in the 40% of people abandon a website that takes more than 3 seconds to load or not.

### Sources

* [Speed Is A Killer](https://blog.kissmetrics.com/speed-is-a-killer/)
* [customizing-bootstrap-with-gulp-js-and-bower](https://medium.com/@wizardzloy/customizing-bootstrap-with-gulp-js-and-bower-fafac8e3e1af)