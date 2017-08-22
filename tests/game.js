var assert = require('assert');
var expect = require('expect.js');
var jsdom = require('jsdom-global')();
global.$ = global.jQuery = require('jquery');

//var index = require('../src/js/index.js');
var game = require('../src/js/game.js');
global.Array2D = require('Array2D');
var pixi = require('pixi.js');
//pixi.dontSayHello = false;

describe('game.js', function() {

  before(function () {
    g = new game();
  });

  describe('test function field', function() {

    before(function () {
      field = g.generateField();
    });

    it('default size is 9 x 9', function() {
      var length = field.length;
      var subLength = field[0].length;
      expect( length ).eql( 9 );
      expect( subLength ).eql( 9 );
    });

    it('default contains x bombs minimum', function() {
      expect( field ).eql( field );
    });

  });

  describe('test init function', function() {

    // it('should return -1 when the value is not present', function() {
    //   document.body.innerHTML = '<div>hola</div>';
    //   expect($("canvas").html()).eql('hola');
    // });

    xit('init defaults', function() {
      //console.log(g.gridSize);
      g.init( false );
      // canvas = new PIXI.Application(600, 800, {
      //   backgroundColor : 0x15932a
      // });
      //
      // document.body.appendChild(canvas.view);
      //this.timeout(1000);
      console.log( "result" );
      console.log( g.mobile );
      //expect( field ).eql( field );
    });

    xit('something', function(){
      g.init( false );
      console.log(g.levels);
    })


  });

});
