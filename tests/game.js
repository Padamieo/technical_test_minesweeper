var assert = require('assert');
var expect = require('expect.js');
this.jsdom = require('jsdom-global')();
global.$ = global.jQuery = require('jquery');

//var index = require('../src/js/index.js');
var game = require('../src/js/game.js');
global.Array2D = require('Array2D');
var pixi = require('pixi.js');
pixi.dontSayHello = false;

describe('game', function() {

  before(function () {
    g = new game();
  });

  describe('test function field', function() {

    // it('should return -1 when the value is not present', function() {
    //   document.body.innerHTML = '<div>hola</div>';
    //   expect($("div").html()).eql('hola');
    // });

    it('creation size', function() {
      g.gridSize = 4;
      //console.log(g.gridSize);
      var field = g.generateField();
      expect( field ).eql( field );
    });


  });

});
