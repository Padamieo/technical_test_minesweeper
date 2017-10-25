global.$ = global.jQuery = require('jquery');
game = require('./game');

var app = {
  current: 'menu',
  intialized: false
};

app.init = function () {
  if(global.autoboot === undefined){
    this.mobile = /Mobi/.test(navigator.userAgent);
    global.app = this;
    this.game = new game();
    ready = this.game.init( this.mobile );
    app.gameIntialized( ready );
    return ready;
  }
};

app.gameIntialized = function( promise ){
  var localRef = this;
  promise.then(function(result) {
    localRef.intialized = true;
    app.prepActions();
  }, function(err) {
    console.log(err);
  });
  return promise;
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
