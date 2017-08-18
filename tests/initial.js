var assert = require('assert');
var expect = require('expect.js');
this.jsdom = require('jsdom-global')();
global.$ = global.jQuery = require('jquery');
var index = require('../src/js/index.js');

describe('a test area', function() {
//
//   var $ = 'aa';
//   jsdom()
//
  // before(function () {
  //   console.log($);
  //   $ = require('jquery')
  //   console.log($);
  // });

  describe(' a test ', function() {

    // before(function () {
    //   global.$ = global.jQuery = require('jquery');
    // });

    it('should return -1 when the value is not present', function() {
      document.body.innerHTML = '<div>hola</div>';
      expect($("div").html()).eql('hola');
    });

    it('vvv', function() {
      var b = index.vibrationSupport();
      console.log(b);
    });


  });

});
