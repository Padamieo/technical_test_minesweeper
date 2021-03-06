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
    var s = ( size == undefined ? 3 : size );
    var bare = Array2D.build( s, s );
    var base = Array2D.fill( bare, 0 );
    return base;
  },

  this.loadSpriteSheet = function(){
    var localRef = this;
    var spriteSheetPromise = new Promise(function(resolve, reject) {
      var loader = new PIXI.loaders.Loader();
      loader.add('placeholder.png', '../src/img/spritesheet.json');
      loader.on("complete", resolve );
      loader.load();
    });
    return spriteSheetPromise;
  },

  this.removeTextureCache = function(){
    for (var textureUrl in PIXI.utils.BaseTextureCache) {
      delete PIXI.utils.BaseTextureCache[textureUrl];
    }
    for (var textureUrl in PIXI.utils.TextureCache) {
      delete PIXI.utils.TextureCache[textureUrl];
    }

    // if you use loader like this: var loader = new PIXI.loaders.Loader();
    // it keeps all the img elements and doesn't have destroy method
    // for (var textureUrl in loader.resources) {
    //   delete loader.resources.data;
    //   delete loader.resources;
    // }
  },

  this.setupFakeGlobalGame = function( setOutcome ){
    callsInit = 0;
    global.game = function(){
      this.init = function(){
        callsInit++;
        var fakePromise = new Promise(function(resolve, reject) {
          if(setOutcome == undefined){
            resolve();
          }else{
            reject();
          }
        });
        return fakePromise;
      }
    };
  }

};
module.exports = resources;
