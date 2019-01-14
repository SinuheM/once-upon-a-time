# Once upon a time

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

A little story with games.

  - Los tres chanchitos
  - Michi

Live at [OnceUpon]

### Tech

Once upon a time uses a number of open source projects to work properly:

* [Pug] - Pug is a high-performance template engine for be compiled in html
* [Sass] - CSS with superpowers
* [Gulp] - the streaming build system

And Js, without frameworks :)

### Installation

It requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd once-upon-a-time
$ npm install -d
```

### Development

Want to make another project? Great!

Open your favorite Terminal and run these commands.

```sh
$ gulp watch
```

Wait some second and [localhost:3000](localhost:3000) must be open in your default browser.

#### Building for source
For production just copy the dist folder inside your project, if you don't see this run the next command:
```sh
$ gulp build
```

**Open Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Pug]: <https://pugjs.org/>
   [Sass]: <https://sass-lang.com/>
   [Gulp]: <http://gulpjs.com>
   [node.js]: <http://nodejs.org>
   [OnceUpon]: <http://190.117.83.13:8081/once-upon-a-time>
