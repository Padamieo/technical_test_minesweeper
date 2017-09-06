var assert = require('assert');
var expect = require('expect.js');
// var jsdom = require('jsdom-global')();
// global.$ = global.jQuery = require('jquery');

// //var index = require('../src/js/index.js');
// var game = require('../src/js/game.js');
// //var g = '';
// global.Array2D = require('Array2D');
// var PIXI = require('pixi.js');
// //pixi.dontSayHello = false;

var sinon = require('sinon');

var game = require('../src/js/game.js');
var g = '';

var resource = new (require('./resources'));

//var app = require('../src/js/index.js');

describe('game.js', function() {

  beforeEach(function() {
      document.body.innerHTML = '';
      g = new game();
      //d = {};
  });

  describe('init', function() {

    xit('Unable to find', function(done){
      this.timeout(5000);
      //this fail and allow a buble up message
      ready = g.init( false );
      ready.then(function(result) {
        console.log(result);
        done();
      }, function(err) {
        // console.log( typeof err);
        // console.log( err.message );
        // console.log(err.includes("error"));
        expect( err.message ).eql( "[XMLHttpRequest] Request failed. Status: 0, text: \"\"" );
        done();
      });
    })

    it('loads up correctly', function(done){
      var mobile = false;
      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';
      ready = g.init( false );
      //this.timeout(500); //maybe needed if load takes longer later
      ready.then(function(result) {

        expect( g.mobile ).eql( mobile );

        //confirm levels loaded look for custom empty field
        expect( g.levels['empty'].length ).eql( 9 );
        expect( g.levels['empty'][0].length ).eql( 9 );

        //need to confirm

        done();
      }, function(err) {
        console.log(err);
        done();
      });
    });

    afterEach(function(){
      resource.removeTextureCache();
    });

  });

  describe('setupStats', function() {

    it('developement only stats addition', function() {
      g.localhost = ''; //electron will serve file://
      expect( g.stats ).eql( undefined );
      g.setupStats();
      expect( typeof g.stats ).eql( 'object' );
    });

    it('default no stats setup', function() {
      expect( g.stats ).eql( undefined );
      g.setupStats();
      expect( typeof g.stats ).eql( 'undefined' );
    });

  });

  describe('vibrate', function() {

    beforeEach(function() {
      navigator.vibrate = function( value ){
        v.c++;
        v.value = value;
      };
      v = { c: 0, value: undefined };
    });

    it('none mobile device disregard request', function() {
      g.vibrate( 10 );
      expect( v.c ).eql( 0 );
    });

    it('mobile device no vibrate browser facility', function() {
      g.mobile = true;
      g.vibrate( 10 );
      expect( v.c ).eql( 0 );
    });

    it('mobile device and vibrate browser facility avaliable', function() {
      g.mobile = true;
      g.vibration = true;
      g.vibrate( 20 );
      expect( v.c ).eql( 1 );
      expect( v.value ).eql( 20 );
    });

  });

  describe('disableRightClick', function() {
    xit('test', function() {
      document.body.innerHTML = '<div id="menu" style="height:100px;width:100px;" >menu</div>'
      + '<canvas id="canvas" style="height:100px;width:100px;" >';
      g.disableRightClick();
      var b = $( "#canvas" ).contextmenu();
      console.log(b);

      var b = $( "#menu" ).contextmenu();
      console.log(b);
      // $('#canvas').trigger({
      //   type: 'mousedown',
      //   which: 2
      // });
    });
  });

  describe('generateField', function() {

    beforeEach(function() {
        field = g.generateField();
        v = '';
    });

    it('default number of bombs 10', function() {
      v = resource.countField( field, 1 );
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
        size = 5;
        g.gridSize = size;
        v = 0;
        var bare = Array2D.build( size, size );
        base = Array2D.fill(bare, 0);
        done();
    });

    it('inserts 1 randomly into field', function() {
      field = g.insertRandom( base, 1 );
      v = resource.countField( field, 1 );
      expect( base ).not.to.equal( field );
      expect( v.contain ).eql( 1 );
      expect( v.others ).eql( 24 );
    });

    //alt mode will need to check for 2's (rocks)

  });

  describe('randomBetween', function() {
    it("test 3 times", function(){
      max = 9;
      min = 0;
      v = '';
      for(var i = 0; i < 3; i++ ){
        v = g.randomBetween( min, max );
        expect( v ).to.be.within( min, max );
      }
    });
  });

  describe('calculateBombs', function() {

    beforeEach(function() {
        g.gridSize = 9;
    });

    it('default spaces 9x9 bombs', function() {
      // console.log(g);
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

  describe('insertSpecific', function() {

    before(function() {
      var bare = Array2D.build( 3, 3 );
      var base = Array2D.fill(bare, 0);
    });

    it('single insert', function() {
      array = g.insertSpecific( base, 0, 0, 1 );
      v = resource.countField( array, 1 );
      expect( v.contain ).eql( 1 );
      expect( v.others ).eql( 24 );
    });

    it('multiple insert', function() {
      array = g.insertSpecific( base, 0, 0, 1 );
      array = g.insertSpecific( array, 2, 2, 1 );
      v = resource.countField( array, 1 );
      expect( v.contain ).eql( 2 );
      expect( v.others ).eql( 23 );
    });

    it('other than bomb insert', function() {
      array = g.insertSpecific( base, 0, 0, 2 );
      v = resource.countField( array, 2 );
      expect( v.contain ).eql( 1 );
    });

  });

  describe('setupGame', function() {

    beforeEach(function( done ){
      g.canvas = new PIXI.Application(400, 400);

      // document.body.appendChild(localRef.canvas.view);
      // $(localRef.canvas.view).attr('id', 'canvas');

      var field = resource.buildField();
      callsGenerator = 0;
      sinon.stub( g, 'generateField').callsFake(function( ){
        callsGenerator++;
        return field;
      });

      // re-route for sprites when in testing location
      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';

      var spriteSheetPromise = g.loadSpriteSheet();
      spriteSheetPromise.then(function(result) {
        done();
      }, function(err) {
        console.log(err);
      });

      callsIndicator = 0;
      sinon.stub( g, 'setupIndicator').callsFake(function(){
        callsIndicator++;
      });

      // prevent function action
      sinon.stub( g, 'generateSprites').callsFake(function(){});

    });

    it('default setup, generate random level', function() {
      g.setupGame();
      expect( g.canvas.stage.children.length ).eql( 1 );
      expect( callsGenerator ).eql( 1 );
      expect( g.field.length ).eql( 3 );
    });

    it('setup level that does not exists fallback', function() {
      g.setupGame( 22 );
      expect( g.canvas.stage.children.length ).eql( 1 );
      expect( callsGenerator ).eql( 1 );
      expect( g.field.length ).eql( 3 );
    });

    it('setup specific level', function() {
      g.setupGame( 'empty' );
      expect( g.canvas.stage.children.length ).eql( 1 );
      expect( callsGenerator ).eql( 0 );
      expect( g.field.length ).eql( 9 );
    });

    it('setup indicator for touch input', function() {
      g.mobile = true;
      g.setupGame();
      expect( callsIndicator ).eql( 1 );
    });

    afterEach(function(){
      resource.removeTextureCache();
    });

  });

  describe('setupIndicator', function() {

    beforeEach(function(){
      g.canvas = new PIXI.Application(400, 400);
      // document.body.appendChild(g.canvas.view);
      // $(g.canvas.view).attr('id', 'canvas');
    });

    it('added and alpha 0', function() {
      expect( typeof g.indicator ).eql( 'undefined' );
      g.setupIndicator();
      //confirm elements exist
      //console.log(g.canvas.stage.children);
      //console.log(g.indicator);
      expect( typeof g.indicator ).eql( 'object' );
      expect( g.canvas.stage.children.length ).eql( 1 );
      expect( g.canvas.stage.children[0].alpha ).eql( 0 );

    });

  });

  describe('addSprite', function() {

    beforeEach(function( done ){
      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';

      var spriteSheetPromise = g.loadSpriteSheet();
      spriteSheetPromise.then(function(result) {
        done();
      }, function(err) {
        console.log(err);
      });

    });

    xit('add a single sprite', function() {
      g.addSprite( 0, 0 );
      // //confirm elements exist
      // console.log(g.canvas.stage.children);
      // expect( g.canvas.stage.children.length ).eql( 1 );
    });

  });

  describe('touchDifferentiator', function(){

    beforeEach(function(){

    });

    xit('touch reveal', function() {
      g.touchDifferentiator( sprite, input, e );
      expect().eql();
    });

    xit('touch reveal', function() {
      g.touchDifferentiator( sprite, input, e );
    });

    xit('touch fallback destroy timer', function() {
      g.touchDifferentiator( sprite, input, e );
    });

  });

  describe('cascade', function() {

    beforeEach(function(){
      var bare = Array2D.build( 3, 3 );
      var base = Array2D.fill(bare, 0);
      g.field = g.insertSpecific( base, 2, 2, 1 );
      g.container = { children: [] };
      g.cascadeTime = 5;

      sinon.stub( g, 'addSprite').callsFake(function( r, c ){
        temp = resource.mockSprite( g, r, c );
        g.container.children.push(temp);
      });

      g.generateSprites();

      v = 0;
      array = [];
      sinon.stub( g, 'cascadeSet').callsFake(function( batch ){
        array.push(batch);
        v++;
      });

    });

    it("check secondry after cascadeTime", function( done ){
      g.cascade( 0, 0 );
      expect( array.length ).eql( 1 );
      expect( g.container.children.length ).eql( 9 );
      setTimeout(function(){
        expect( array.length ).eql( 2 );
        expect( array[1][0] ).eql( 4 );
        done();
      }, g.cascadeTime*1.5 );
    });

  });

  describe('cascadeSet', function() {

    beforeEach(function(){
      g = new game(); // nned to remove this
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

  describe('calculateNeighbourSum', function() {

    beforeEach(function(){
      var base = resource.buildField();
      g.field = g.insertSpecific( base, 2, 2, 1 );
    });

    it("one Neighbour", function(){
      var a = g.calculateNeighbourSum( 1, 1 );
      expect( a ).eql( 1 );
      var b = g.calculateNeighbourSum( 0, 0 );
      expect( b ).eql( 0 );
    });

    it("two Neighbours", function(){
      g.field = g.insertSpecific( g.field, 0, 0, 1 );
      var b = g.calculateNeighbourSum( 1, 1 );
      expect( b ).eql( 2 );
    });

    //may want to do more

  });

  describe('reveal', function() {

    before(function(){

    });

    xit("reveal sprite", function(){
      sprite.bomb = true;
      g.reveal( sprite );
    });

  });


  describe('animatedFlag', function() {

    beforeEach(function( done ){

      spritesLoaded = g.loadSpriteSheet();
      spritesLoaded.then(function(result) {
        console.log(result);
        done();
      }, function(err) {
        //console.log(err);
        console.log(err);
        done();
      });

      // g.container = { children: [] };
      // for(var i = 0; i < 10; i++ ){
      //   g.container.children.push({id:i});
      // }
      //
      // v = 0;
      // array = [];
      // sinon.stub( PIXI.Texture, 'fromFrame').callsFake(function( spriteName ){
      //   // array.push(sprite.id);
      //   // v++;
      //   return 'something';
      // });

    });

    xit('return animation', function() {
      //var arrayAnimation = g.animatedFlag();
    });

  });

  describe('flag', function() {

    before(function(){
      //same problem as reveal
      sprite = '';
      sprite = resource.mockSprite( g, 0, 0 );
    });

    xit("reveal sprite", function(){
      sprite.bomb = true;
      g.reveal( sprite );
    });

  });

  describe('showResult', function() {

    before(function(){
      app = {};
      app.menuReset = function(){
        v++;
      };
      v = 0;
    });

    it("show user won return to menu", function( done ){
      expect( g.resultTimeOut ).eql( 1000 );
      g.resultTimeOut = 10;
      expect( g.resultTimeOut ).eql( 10 );
      g.showResult();
      setTimeout(function(){
        expect( v ).eql( 1 );
        done();
      }, g.resultTimeOut*1.5 );
    });

  });

  describe('winCondition', function() {

    beforeEach(function(){
      app = {};
      app.menuReset = function(){
        v++;
      };
      v = 0;
      g.revealed = 10;
      g.unrevealed = 10;
      g.resultTimeOut = 10;
    });

    it("user won", function( done ){
      g.winCondition();
      setTimeout(function(){
        expect( v ).eql( 1 );
        done();
      }, g.resultTimeOut*1.5 );
    });

    it("condition not yet met", function( done ){
      g.revealed = 1;
      g.winCondition();
      setTimeout(function(){
        expect( v ).eql( 0 );
        done();
      }, g.resultTimeOut*1.5 );
    });

  });

});
