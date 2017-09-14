global.$ = global.jQuery = require('jquery');

var app = {
  current: 'menu',
  intialized: false,
  autoboot: true
};

app.init = function () {
  if(this.autoboot){
    this.mobile = /Mobi/.test(navigator.userAgent);
    global.app = this;
    if( global.game == undefined ){
      global.game = require('game');
    }
    this.game = new global.game();
    ready = this.game.init( this.mobile ); // TODO: use init promise so we know when we are initialized
    var localRef = this;
    ready.then(function(result) {
      localRef.intialized = true;
      app.prepActions();

      // $( "#menu" ).hide();
      // $( "#canvas" ).show();
      // localRef.game.mode = 'special';
      // localRef.game.setupGame(2);

    }, function(err) {

    });
    //app.menuScale();

  }
};

app.menuScale = function(){

};

app.vibrationSupport = function (){
  navigator.v =  navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  return (navigator.v ? true : false );
};

app.prepActions = function(){
  var localRef = this;
  $( document ).on( "click", ".button", function() {

    if($(this).hasClass("game")){
      $( "#canvas" ).show();
      var level = $(this).data("level");
      var mode = $(this).data("mode");

      if(mode != undefined){
        localRef.game.mode = mode;
      }

      $( "#menu" ).slideUp( "slow", function() {
        localRef.game.setupGame(level);
      });
    }

  });
};

app.menuReset = function(){
  $( "#menu" ).slideDown( "slow", function() {
    $( "#canvas" ).hide();
  });
};

// this is application starting point, has to be prevented from loading in tests
$( document ).ready(function() {
  app.init();
});

module.exports = app;
