var assert = require('assert');
var expect = require('expect.js');
var jsdom = require('jsdom-global')();
global.$ = global.jQuery = require('jquery');

//var index = require('../src/js/index.js');
var game = require('../src/js/game.js');
var g = '';
global.Array2D = require('Array2D');
//var pixi = require('pixi.js');
//pixi.dontSayHello = false;


describe('game.js', function() {

  // before(function () {
  //   g = new game();
  // });

  describe('calculateBombs', function() {

    beforeEach(function() {
        g = new game();
        var v = 0;
    });

    it('default spaces 9x9 bombs', function() {
      expect( g.calculateBombs() ).eql( 10 );
    });

    it('custom spaces 20x20 bombs', function() {
      g.gridSize = 20;
      expect( g.calculateBombs() ).eql( 48 );
    });

    it('custom Ratio of bombs', function() {
      g.bombRatio = 33;
      expect( g.calculateBombs() ).eql( 27 );
    });

    it('1/3 limit Ratio of bombs', function() {
      g.bombRatio = 50;
      expect( g.calculateBombs() ).eql( 27 );
    });

  });


  describe('generateField', function() {

    before(function() {
        g = new game();
        var v = 0;
        field = g.generateField();
    });

    it('default number of bombs 10', function() {
      var i = 0;
      var o = 0;
      Array2D.eachCell(field, function(cell) {
        if(cell == 1){
          i++;
        }else{
          o++;
        }
      });
      expect( i ).eql( 10 );
      expect( o ).eql( 71 );
    });

    it('default field size is 9 x 9', function() {
      expect( field.length ).eql( 9 );
      expect( field[0].length ).eql( 9 );
    });

  });


  /*
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
  */

});
