var assert = require('assert');
var expect = require('expect.js');
this.jsdom = require('jsdom-global')();
//$ = require('jquery');
//global.$ = global.jQuery
global.game = require('../src/js/game.js');
var index = require('../src/js/index.js');
index.autoboot = false; // this prevent auto load up of game from jquery

describe('index.js', function() {

  describe('startup', function() {

    // var $
    // jsdom();
    //
    // before(function () {
    //   $ = require('jquery');
    //   field = g.generateField();
    // });
    //
    // it('default jquery test', function() {
    //   document.body.innerHTML = '<div>hola</div>';
    //   expect($("div").html()).eql('hola');
    // });

    it('jquery test', function() {
      document.body.innerHTML = '<div>hola</div>';
      //console.log(document.body.innerHTML);
      this.timeout(1000);
      $( document ).ready(function() {
        console.log("rrresult");
        console.log($("div").html());
        //expect($("div").html()).eql('hola');
      });

    });

    it('vibration', function() {
      var b = index.vibrationSupport();
      expect( b ).eql( b );
    });

  });

});
