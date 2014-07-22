angular-browserify-gulp-boilerplate
===================================

# Quick start

```
$ npm install
$ gulp
```

# Modules

This app has a basic modular system. You can write your own modules and put a
routes.js file in it that will be used when loading application. See app.js
for view how it works.

## Adding a Module

### Create a folder tree inside `app/modules`: 

```bash
mkdir -p app/modules/test/controllers app/modules/test/views
```

### create a `index.js file` containing:

```js
var Test = {
  controllers: {
    TestHomeCtrl: require('./controllers/TestHomeCtrl')
  },
  routes: require('./routes')
};

module.exports = Test;
```

### routes.js

Tells to your app about routes handled by your module

```js
'use strict';

function Routes($routeProvider) {
  $routeProvider.
    when('/test/', {
      templateUrl: 'modules/test/views/home.html',
      controller: 'TestHomeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}

module.exports = Routes;
```

### Controller! One for each page you wanna route

**controllers/TestHomeCtrl.js**

```js
'use strict';

function TestHomeCtrl () {
  //
  console.log('TestHomeCtrl');
}

module.exports = TestHomeCtrl;
```

### views

**views/home.jade**

```jade
| test-home.html
```

### Add this module to the chain loader!

To do this, edit `app.js`. In future release, Gulp should do this for you!

```js
// initializing modules
var modules = {
  rooms: require('./modules/rooms'),
  // Here, add your module
  test: require('./modules/test')
};
```

# TODO

1. Modularization with advanced and automatic routing.
2. I18n
3. Menu that takes each module that allows "menu publication" and create entries combining with route-table
4. Require-all module for browserify
5. A better documentation
6. Other...