/**
 *
 * Loader for '$' like jquery
 *
 **/

const all = require("./all").all;
const  dollar = require("./dollar");

var loadDollar = function() {
  Function.prototype.bind = function() {
    var that = this,
      args = Array.prototype.slice.apply(arguments),
      scope = args.shift();

    return function() {
      return that.apply(scope, args.concat(Array.prototype.slice.apply(arguments)));
    };
  };
  dollar.lang.load(all);
};

exports.loadDollar = loadDollar;