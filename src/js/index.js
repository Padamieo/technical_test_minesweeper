
var app = {
  intialized: false
};

app.init = function ( mobile ) {
  // setup ui menu

  // same time setup basics
  this.game = new game();
  this.game.init( mobile );
  this.intialized = true;

  //this.game.setupGame( example );

};

app.vibrationSupport = function (){
  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  return (navigator.vibrate ? true : false );
};

// this is our application starting point
$( document ).ready(function() {
  var mobile = /Mobi/.test(navigator.userAgent);
  app.init( mobile );
});

//modules.exports = app;
