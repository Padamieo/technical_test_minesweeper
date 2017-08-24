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

var sinon = require('sinon');


function countField(field, value){
  var c = 0;
  var o = 0;
  Array2D.eachCell(field, function(cell) {
    if(cell == value){
      c++;
    }else{
      o++;
    }
  });
  return { others:o, contain:c };
};

describe('game.js', function() {

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
        v = 0;
        field = g.generateField();
    });

    it('default number of bombs 10', function() {
      v = countField( field, 1 );
      expect( v.contain ).eql( 10 );
      expect( v.others ).eql( 71 );
    });

    it('default field size is 9 x 9', function() {
      expect( field.length ).eql( 9 );
      expect( field[0].length ).eql( 9 );
    });

    // if in alt mode check amount of 2 to submit

  });

  describe('insertRandom', function() {

    beforeEach(function( done ) {
        g = new game();
        v = 0;
        var bare = Array2D.build( 5, 5 );
        base = Array2D.fill(bare, 0);
        done();
    });

    xit('inserts 1 randomly into field', function() {
      field = g.insertRandom( base, 1 );
      v = countField( field, 1 );
      console.log(v);
      console.log(field);
      expect( base ).not.to.equal( field );
      //expect( v.contain ).eql( 1 );
      // expect( v.others ).eql( 24 );
    });

    //alt mode will need to check for 2's (rocks)

  });

  describe('randomBetween', function() {
    it("test 3 times", function(){
      top = 9;
      bot = 0;
      for(var i = 0; i < 3; i++ ){
        v = g.randomBetween( bot, top );
        expect( v ).to.be.within(bot, top);
      }
    });
  });

  describe('cascadeSet', function() {

    beforeEach(function(){
      g = new game();
      g.container = { children: [] };
      for(var i = 0; i < 10; i++ ){
        g.container.children.push({id:i});
      }

      v = 0;
      array = [];
      sinon.stub( g, 'reveal').callsFake(function( sprite ){
        array.push(sprite.id);
        v++;
      });

    });

    it("reveal if sprite exists", function(){
      localArray = [0,5,9];
      g.cascadeSet( localArray );
      expect( v ).eql( localArray.length );
      expect( localArray ).eql( array );
    });

    it("do not process out of array", function(){
      localArray = [0,5,10];
      g.cascadeSet( localArray );
      expect( v ).eql( 2 );
    });

    it("fail well", function(){
      localArray = [];
      g.cascadeSet( localArray );
      expect( v ).eql( 0 );
    });

  });

  /*
  describe('init', function() {

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
