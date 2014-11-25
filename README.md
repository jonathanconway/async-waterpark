# async-waterpark

Simple async module for JavaScript, that supports sequences and repeats.

Runs a set functions in series, each passing their results to the next in the
array, or optionally, re-running itself.

However, if any of the functions pass an error to the callback, the
next function is not executed and the main callback is immediately called with
the error.

For browsers and node.js.

## Installation
* Just include async-waterpark before your scripts.
* `npm install async-waterpark` if you’re using node.js.
* `component install jonathanconway/async-waterpark` if you’re using
[component(1)](https://github.com/component/component).
* `bower install async-waterpark` if you’re using
[Twitter Bower](http://bower.io).


## Usage

* `waterpark(tasks...);`
* **tasks** - A series of functions to run, each passed in as a parameter. Each
function receives as its first parameter `iteration`, an object containing
methods by which to control the flow. On completion, it must call one of those
methods. All subsequent parameters are simply the values that were passed to
`iteration.done()` or `iteration.repeat()` by the previous iteration, if there was
one.
** **`iteration.done([params...])`** - proceed to the next task in the series,
passing any parameters specified to that function.
** **`iteration.repeat([params...])`** - re-run the current task, passing any
parameters specified to the function.

##### Node.js:

```javascript
var waterpark = require('async-waterpark');
waterpark(tasks);
```

##### Browser:

```javascript
// component(1)
var waterpark = require('async-waterpark');
waterpark(tasks);

// Default:
window.asyncWaterpark(tasks);
```

##### Three tasks, run in sequence

```
var waterpark = require('async-waterpark');
waterpark(
  function (iteration) {
    console.log('running one');
    iteration.done(123);
  },
  function (iteration, data) {
    console.log('running two');
    console.log('data: ', data)
    iteration.done();
  },
  function (iteration, message) {
    console.log('running three');
  });
```

##### Three tasks, run in sequence, with the 2nd task retried once
```
var waterpark = require('async-waterpark');
waterpark(
  function (iteration) {
    console.log('running one');
    iteration.done();
  },
  function (iteration, retried) {
    console.log('running two');
    if (retried) {
      console.log('two done')
      iteration.done();
    } else {
      console.log('two will repeat')
      iteration.repeat(true);
    }
  },
  function (iteration, message) {
    console.log('running three');
  });
```

## Acknowledgements
Big thanks to [Elan Shanker](https://github.com/es128) for inspiration.

## License
[MIT](https://raw.github.com/jonathanconway/async-waterpark/master/LICENSE)
