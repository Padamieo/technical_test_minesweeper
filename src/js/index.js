global.$ = global.jQuery = require('jquery');

var app = {
  intialized: false,
  autoboot: true
};

app.init = function () {
  if(this.autoboot){
    this.mobile = (/Mobi/.test(navigator.userAgent) ? false : true );
    global.app = this;
    if( global.game == undefined ){
      global.game = require('game');
    }
    this.game = new game();
    this.game.init( this.mobile ); // TODO: make this a promise so we know when we are ready
    this.intialized = true;
    app.prepActions();
  }
};

app.vibrationSupport = function (){
  navigator.v =  navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  return (navigator.v ? true : false );
};

app.prepActions = function(){
  var localRef = this;
  $( document ).on( "click", ".button", function() {
    //TODO: probably use handlebars or something for generating, this is placeholder simple method
    if(this.id === 'start1'){
      $( "#canvas" ).show();
      $( "#menu" ).slideUp( "slow", function() {
        localRef.game.setupGame(1);
      });
    }
    if(this.id === 'start2'){
      $( "#canvas" ).show();
      $( "#menu" ).slideUp( "slow", function() {
        localRef.game.setupGame(2);
      });
    }

  });
};

app.menuReset = function(){
  $( "#menu" ).slideDown( "slow", function() {
    $( "#canvas" ).hide();
  });
};

// this is our application starting point
$( document ).ready(function() {
  app.init();
});

module.exports = app;
