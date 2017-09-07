var index = require('../src/js/index.js');
index.autoboot = false; // this prevent auto load up of game from jquery
var sinon = require('sinon');

describe('index.js', function() {

  beforeEach( '', function(){
    document.body.innerHTML = '';
  });

  describe('init', function() {

    beforeEach(function(){
      v = 0;
      global.game = function(){
        this.init = function(){
          v++;
        }
      };
    });

    it('default app auto boot', function(){
      expect( typeof global.app ).eql( 'undefined' );
      index.autoboot = true;
      index.init( false );
      expect( index.mobile  ).eql( false );
      expect( v  ).eql( 1 );
      expect( typeof global.app ).eql( 'object' );
    });

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
