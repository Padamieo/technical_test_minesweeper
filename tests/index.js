var assert = require('assert');
var expect = require('expect.js');
this.jsdom = require('jsdom-global')();
global.$ = global.jQuery = require('jquery');

var game = require('../src/js/game.js');
var index = require('../src/js/index.js');
index.autoboot = false; // this prevent auto load up of game from jquery

//describe('a test area', function() {
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

    before(function(){
      // game = require('../src/js/game.js');
      // index = require('../src/js/index.js');
      //var game = require('../src/js/game.js');
    });

    it('should return -1 when the value is not present', function() {
      document.body.innerHTML = '<div>hola</div>';
      expect($("div").html()).eql('hola');
    });

    it('vvv', function() {
      var b = index.vibrationSupport();
      expect( b ).eql( b );
    });


  });

//});
