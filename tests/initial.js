var assert = require('assert');
//var $ = require('jQuery');
//console.log($);
var index = require('../src/js/index.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      var value = index.vibrationSupport();
      console.log("value");
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
