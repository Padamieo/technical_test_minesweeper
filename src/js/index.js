
var app = {
  intialized: false
};

app.init = function ( mobile ) {
  // setup ui menu

  // same time setup basics
  this.game = new game();
  this.game.init( mobile ); // TODO: make this a promise so we know when we are ready
  this.intialized = true;
  app.prepActions();

};

app.vibrationSupport = function (){
  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  return (navigator.vibrate ? true : false );
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
  var mobile = /Mobi/.test(navigator.userAgent);
  app.init( mobile );
});

module.exports = app;
