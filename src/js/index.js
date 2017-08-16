
var app = {
  intialized: false
};

app.init = function ( mobile ) {
  // setup ui menu

  // same time setup basics
  this.game = new game();
  this.game.init( mobile );
  this.intialized = true;

  var example = [
    [ 0,0,0,1 ],
    [ 0,0,0,0 ],
    [ 0,1,0,0 ],
    [ 0,0,0,1 ]
  ];
  //this.game.setupGame( example );

};

// this is our application starting point
$( document ).ready(function() {
  var mobile = /Mobi/.test(navigator.userAgent);
  app.init( mobile );
});
