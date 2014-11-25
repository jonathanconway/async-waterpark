// MIT license (by Jonathan Conway).
(function(globals) {
  'use strict';

  var waterpark = function () {
    var args = arguments;
    function iterate (index) {
      var iterateArgs = [], iteration = {};

      function done () {
        var iterateArgs = []
        for (var i = 0; i < arguments.length; i++) {
          iterateArgs.push(arguments[i]);
        }
        if (index < args.length - 1) {
          iterate.apply(iterate, [index + 1].concat(iterateArgs));
        }
      }

      function repeat () {
        args[index].apply(iterate, iterateArgs);
      };

      iteration = { done: done, repeat: repeat };
      iterateArgs.push(iteration);

      for (var i = 1; i < arguments.length; i++) {
        iterateArgs.push(arguments[i]);
      }

      args[index].apply(iterate, iterateArgs);
    }
    if (args.length > 0) {
      iterate(0);
    }
  };

  if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return waterpark;
    }); // RequireJS
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = waterpark; // CommonJS
  } else {
    globals.asyncWaterpark = waterpark; // <script>
  }
})(this);
