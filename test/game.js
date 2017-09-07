var assert = require('assert');
var expect = require('expect.js');
var sinon = require('sinon');
var game = require('../src/js/game.js');
var g = '';
var resource = new (require('./resources'));

describe('game.js', function() {

  beforeEach(function() {
      document.body.innerHTML = '';
      g = new game();
  });

  describe('init', function() {

    beforeEach(function() {
      callsDisable = 0;
      sinon.stub( g, 'disableRightClick').callsFake(function( ){
        callsDisable++;
      });

      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';

    });


    it('Unable to find resources', function(done){
      g.reRoute = '';
      var ready = g.init( false );
      ready.then(function(result) {
        console.log(result);
        done();
      }, function(err) {
        expect( err.message ).eql( "[XMLHttpRequest] Request failed. Status: 0, text: \"\"" );
        done();
      });
    })

    it('loads up correctly', function(done){
      var mobile = false;
      var ready = g.init( mobile );
      ready.then(function(result) {

        expect( g.mobile ).eql( mobile );

        //confirm levels loaded in ready
        expect( g.levels['empty'].length ).eql( 9 );
        expect( g.levels['empty'][0].length ).eql( 9 );

        expect( callsDisable ).eql( 1 );

        //need more confirmation of setup

        done();
      }, function(err) {
        console.log(err);
        done();
      });
    });

    it('mobile Identifies and load correctly', function(done){
      var mobile = true;
      var ready = g.init( mobile );
      ready.then(function(result) {

        expect( g.mobile ).eql( mobile );
        expect( callsDisable ).eql( 0 );
        //expect( callsVibrateS ).eql( 1 );

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
      g.canvas = new PIXI.Application(400, 400);
      // document.body.appendChild(g.canvas.view);
      // $(g.canvas.view).attr('id', 'canvas');

      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';

      var spriteSheetPromise = g.loadSpriteSheet();
      spriteSheetPromise.then(function(result) {
        done();
      }, function(err) {
        console.log(err);
      });

      g.container = new PIXI.Container();

      g.field = resource.buildField();
      g.field = g.insertSpecific( g.field , 2, 2, 1 );

    });

    it('default single sprite setup', function() {
      var sprite = g.addSprite( 0, 0 );
      expect( sprite._texture.textureCacheIds[0] ).eql( 'grass' );
      expect( g.container.children.length ).eql( 1 );
      expect( sprite.interactive ).eql( true );
      expect( g.container.children[0].interactive ).eql( true );
      expect( sprite.neighbours ).eql( 0 );
      expect( sprite.x ).eql( 0 );
      expect( sprite.y ).eql( 0 );

      expect( typeof sprite._events['click'] ).eql( 'object' );
      expect( typeof sprite._events['rightclick'] ).eql( 'object' );
      // need to test texture change from grass to dirt on click
    });

    it('sprite mobile triggers', function() {
      g.mobile = true;
      var sprite = g.addSprite( 0, 0 );
      expect( typeof sprite._events['touchstart'] ).eql( 'object' );
      expect( typeof sprite._events['touchend'] ).eql( 'object' );
      expect( typeof sprite._events['touchendoutside'] ).eql( 'object' );
    });

    it('sprite will shows neighbor bomb', function() {
      var sprite = g.addSprite( 1, 1 );
      expect( sprite._texture.textureCacheIds[0] ).eql( 'grass' );
      expect( sprite.neighbours ).eql( 1 );
      // need to test texture change from grass to number on click
    });

    it('sprite is a hidden bomb', function() {
      var sprite = g.addSprite( 2, 2 );
      expect( sprite._texture.textureCacheIds[0] ).eql( 'grass' );
      expect( sprite.neighbours ).eql( undefined );
      expect( sprite.bomb ).eql( true );
      expect( g.container.children[0].bomb ).eql( true );
      // need to test texture change from grass to bomb on click
    });

    it('field entry is rock, mode is default, default to grass', function() {
      g.field = g.insertSpecific( g.field, 1, 1, 2 );
      var sprite = g.addSprite( 1, 1 );
      expect( sprite._texture.textureCacheIds[0] ).eql( 'grass' );
    });

    it('sprite / field entry is a rock, mode is special', function() {
      g.mode = 'special';
      g.field = g.insertSpecific( g.field, 1, 1, 2 );
      var sprite = g.addSprite( 1, 1 );
      expect( sprite._texture.textureCacheIds[0] ).eql( 'rock' );
      var sprite_default = g.addSprite( 0, 0 );
      expect( sprite_default._texture.textureCacheIds[0] ).eql( 'grass' );
    });

    afterEach(function(){
      resource.removeTextureCache();
    });

  });

  describe('touchDifferentiator', function(){

    beforeEach(function( done ){
      g.canvas = new PIXI.Application(400, 400);
      // document.body.appendChild(g.canvas.view);
      // $(g.canvas.view).attr('id', 'canvas');

      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';

      var spriteSheetPromise = g.loadSpriteSheet();
      spriteSheetPromise.then(function(result) {
        done();
      }, function(err) {
        done();
        console.log(err);
      });

      g.container = new PIXI.Container();

      g.field = resource.buildField();
      g.field = g.insertSpecific( g.field, 2, 2, 1 );

      g.setupIndicator();

      flagCalled = 0;
      sinon.stub( g, 'flag').callsFake(function( ){
        flagCalled++;
      });

      reavalCalled = 0;
      sinon.stub( g, 'reveal').callsFake(function( ){
        reavalCalled++;
      });
    });

    it('touch reveal', function() {
      var sprite = g.addSprite( 0, 0 );
      expect( sprite._texture.textureCacheIds[0] ).eql( 'grass' );
      expect(g.timer).eql( undefined );

      g.touchDifferentiator( sprite, 'start', {} );

      expect(g.timer.started).eql( true );

      g.touchDifferentiator( sprite, 'end', {} );

      expect(g.timer.started).eql( false );
      expect( reavalCalled ).eql( 1 );
      expect( flagCalled ).eql( 0 );
    });

    it('touch flag', function( done ) {
      expect(g.flagHoldDuration).eql( 500 );
      g.flagHoldDuration = 5;
      var sprite = g.addSprite( 0, 0 );
      expect(g.timer).eql( undefined );

      g.touchDifferentiator( sprite, 'start', {} );
      expect(g.timer.started).eql( true );

      setTimeout(function(){
        //expect(g.indicatorData.size).eql( 45 );
        g.touchDifferentiator( sprite, 'end', {} );
        expect( g.timer.started ).eql( false );
        expect( reavalCalled ).eql( 0 );
        expect( flagCalled ).eql( 1 );
        done();
      }, g.flagHoldDuration*1.5);
    });

    xit('touch fallback destroy timer', function( done ) {
      expect(g.flagHoldDuration).eql( 500 );
      g.flagHoldDuration = 5;
      var sprite = g.addSprite( 0, 0 );
      expect(g.timer).eql( undefined );

      g.touchDifferentiator( sprite, 'start', {} );

      expect(g.timer.started).eql( true );

      setTimeout(function(){
        expect(g.timer).eql( undefined ); // timer should be destroyed
        done();
      }, g.flagHoldDuration*10);
    });

    afterEach(function(){
      resource.removeTextureCache();
    });

  });

  describe('cascade', function() {

    beforeEach(function(){
      base = resource.buildField();
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

  });

  describe('reveal', function( ) {

    before(function( done ){
      g.canvas = new PIXI.Application(400, 400);
      // document.body.appendChild(g.canvas.view);
      // $(g.canvas.view).attr('id', 'canvas');

      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';

      var spriteSheetPromise = g.loadSpriteSheet();
      spriteSheetPromise.then(function(result) {
        done();
      }, function(err) {
        done();
        console.log(err);
      });

      g.container = new PIXI.Container();

      g.field = resource.buildField();
      g.field = g.insertSpecific( g.field, 2, 2, 1 );

    });

    xit("reveal sprite", function(){
      var sprite = g.addSprite( 0, 0 );
      // g.reveal( sprite );

    });

    afterEach(function(){
      resource.removeTextureCache();
    });

  });


  describe('animatedFlag', function() {

    beforeEach(function( done ){
      resource.removeTextureCache(); //should not need this here, somewhere we are missing a this

      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';

      var spriteSheetPromise = g.loadSpriteSheet();
      spriteSheetPromise.then(function(result) {
        done();
      }, function(err) {
        done();
        console.log(err);
      });
    });

    it('return 3 frame animation', function() {
      var arrayAnimation = g.animatedFlag();
      expect( arrayAnimation.length ).eql( 3 );
      for(var i = 0; i < 3; i++ ){
        expect( arrayAnimation[i].textureCacheIds[0] ).eql( 'flag'+i );
      }
    });

    afterEach(function(){
      resource.removeTextureCache();
    });

  });

  describe('flag', function() {

    beforeEach(function( done ){

      var appRoot = require('app-root-path');
      g.reRoute = appRoot+'/src/';

      var spriteSheetPromise = g.loadSpriteSheet();
      spriteSheetPromise.then(function(result) {
        done();
      }, function(err) {
        done();
        console.log(err);
      });

      g.container = new PIXI.Container();

      g.field = resource.buildField();
      g.field = g.insertSpecific( g.field, 2, 2, 1 );

    });

    it("flag sprite", function(){
      var sprite = g.addSprite( 0, 0 );
      expect( sprite.animationSpeed ).eql( 0 );
      g.flag( sprite );
      expect( g.container.children.length ).eql( 1 );
      expect( g.container.children[0]._textures.length ).eql( 3 );
      expect( sprite._textures.length ).eql( 3 );
      expect( sprite.animationSpeed ).eql( 0.05 );
    });

    it("flag & un flag sprite", function(){
      var sprite = g.addSprite( 0, 0 );
      sprite.flaged = undefined;
      expect( sprite.flaged ).eql( undefined );
      expect( sprite.animationSpeed ).eql( 0 );
      g.flag( sprite );
      expect( sprite.flaged ).eql( true );
      expect( sprite.animationSpeed ).eql( 0.05 );
      g.flag( sprite );
      expect( sprite.flaged ).eql( false );
      expect( sprite.animationSpeed ).eql( 0 );
    });

    afterEach(function(){
      resource.removeTextureCache();
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

  afterEach(function(){
    resource.removeTextureCache();
  });

});
