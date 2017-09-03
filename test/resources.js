var resources = function( ){

  this.countField = function(field, value){
    var c = 0;
    var o = 0;
    Array2D.eachCell(field, function(cell) {
      if(cell == value){
        c++;
      }else{
        o++;
      }
    });
    return { others:o, contain:c };
  },

  this.mockSprite = function( g, r, c ){
    sprite = {};
    sprite.interactive = true;
    if( g.field[r][c] != 0 ){
      sprite.bomb = true;
    }else{
      sprite.bomb = false;
      var s = g.calculateNeighbourSum( r, c );
      sprite.neighbours = s;
      sprite.c = c;
      sprite.r = r;
      sprite.texture = '';
    }
    return sprite;
  },

  this.buildField = function( size ){
    s = ( size == undefined ? 3 : size );
    var bare = Array2D.build( s, s );
    var base = Array2D.fill(bare, 0);
    return base;
  },

  this.something = function(){
    console.log("something");
  },

  this.loadSpriteSheet = function(){
    var localRef = this;
    var spriteSheetPromise = new Promise(function(resolve, reject) {
      var loader = new PIXI.loaders.Loader();
      // loader.add('levels', 'levels/levels.json', function (e) {
      //   localRef.levels = e.data;
      // });
      loader.add('placeholder.png', '../src/img/spritesheet.json');
      // loader.add('levels', '../src/levels/levels.json', function (e) {
      //   localRef.levels = e.data;
      // });
      loader.on("complete", resolve );
      loader.load();
    });
    return spriteSheetPromise;
  }

};
module.exports = resources;
