// var assert = require('assert');
// var expect = require('expect.js');
// this.jsdom = require('jsdom-global')();
// //$ = require('jquery');
// //global.$ = global.jQuery
//global.game = require('../src/js/game.js');

var index = require('../src/js/index.js');
index.autoboot = false; // this prevent auto load up of game from jquery

describe('index.js', function() {

  beforeEach( '', function(){
    document.body.innerHTML = '';
    //console.log(sinon);
  });

  describe('vibration', function() {

    //for some reason electron has navigator.vibrate as a function
    it('electron default, true', function() {
      var b = index.vibrationSupport();
      expect( b ).eql( true );
    });

    it('default browser unsuported', function() {
      navigator.vibrate = false;
      var b = index.vibrationSupport();
      expect( b ).eql( false );
    });

  });

  describe('init', function() {

    beforeEach(function(){
      // sinon.stub( game ).callsFake(function( ){
      //   console.log( "hello" );
      // });
      global.game = function(){
        this.init = function(){
          console.log("test");
        }
      };
    });

    it('default app auto boot', function(){
      index.autoboot = true;
      index.init();
      //console.log( global.game );
      expect( index.mobile  ).eql( true );
      //expect( global.app ).eql( undefined );
    });

  });

  describe('menuReset', function() {

    it('hides canvas', function(){
      document.body.innerHTML = '<div id="menu">menu</div><div id="canvas">canvas</div>';
      expect($("#menu").length).eql(1);
      expect($("#canvas").length).eql(1);
      index.menuReset();
      expect($('#canvas').css('display')).eql('none');
    });

  });

});
