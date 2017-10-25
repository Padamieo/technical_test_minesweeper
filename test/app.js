var sinon = require('sinon');
var resource = new (require('./resources'));
global.autoboot = false; //prevents jquery autoboot on call of index.js
var index = require('../src/js/index.js');
var app = '';

describe('index.js', function() {

  beforeEach( '', function( done ){
    app = index;
    $( document ).ready(function() {
      done();
    });
    document.body.innerHTML = '';
  });

  describe('init', function() {

    beforeEach(function(){
      global.autoboot = undefined;
      global.app = undefined;

      resource.setupFakeGlobalGame(); // provides similiar to sinon but fake version of global.game

      sinon.stub( game, 'init').callsFake(function( ){
        var fakePromise = new Promise(function(resolve, reject) {
            resolve();
        });
        return fakePromise;
      });

      callsPrep = 0;
      sinon.stub( app, 'gameIntialized').callsFake(function( ){
        console.log("gameIntialized xx");
        callsPrep++;
      });

    });

    it('default app auto boot', function( done ){

      expect( typeof global.app ).eql( 'undefined' );
      var ready = app.init();

      ready.then(function(result) {
        expect( callsPrep ).eql( 1 );
        expect( app.intialized ).eql( false );
        expect( app.mobile ).eql( false );
        expect( typeof global.app ).eql( 'object' );
        expect( callsInit ).eql( 1 );
        done();
      }, function(err) {
        console.log(err);
        expect( true ).eql( false );
        done();
      });

    });

  });

  describe.only( 'gameIntialized', function(){

    beforeEach(function(){
      app.intialized = false;

    });

    it('promise resolved, action ', function( done ) {
      var fakePromise = new Promise(function(resolve, reject) {
        resolve();
      });

      var returnPromise = app.gameIntialized( fakePromise );

      returnPromise.then(function(result){
        expect( app.intialized ).eql( true );
        done();
      }, function(err){
        expect( false ).eql( true );
        done();
      });
    });

    it('promise fail, startup fail', function( done ) {

      expect( app.intialized ).eql( false );

      var fakePromise = new Promise(function(resolve, reject) {
        reject();
      });

      var returnPromise = app.gameIntialized( fakePromise );

      returnPromise.then(function( result ){
        expect( false ).eql( true );
        done();
      }, function( err ){
        expect( app.intialized ).eql( false );
        done();
      });

    });

  });

  describe( 'prepActions', function(){

    beforeEach(function(  ){
      document.body.innerHTML = '<a class="button game" href="#game" data-level="" ><span>Play Random Level</span></a>';
    });


    it('electron default, true', function( ) {

      app.prepActions();

    });

  });

  describe('vibration', function() {

    //electron has navigator.vibrate as a function
    it('electron default, true', function() {
      var b = app.vibrationSupport();
      expect( b ).eql( true );
    });

    it('default browser unsuported', function() {
      navigator.vibrate = false;
      var b = app.vibrationSupport();
      expect( b ).eql( false );
    });

  });

  describe('menuReset', function() {

    it('hides canvas', function(){
      document.body.innerHTML = '<div id="menu">menu</div><div id="canvas">canvas</div>';
      expect($("#menu").length).eql(1);
      expect($("#canvas").length).eql(1);
      app.menuReset();
      expect($('#canvas').css('display')).eql('none');
    });

  });

});
