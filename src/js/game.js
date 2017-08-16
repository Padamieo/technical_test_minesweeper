function game(){

  this.init = function( mobile ){
    console.log("game init");

    this.mobile = mobile;
    this.mode = "default";
    //this.state = "pending";

    if(!this.mobile){
      this.disableRightClick();
    }

    this.canvas = new PIXI.Application(600, 600, {
      backgroundColor : 0x1099bb //0x15932a
    });

    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    document.body.appendChild(this.canvas.view);
    var localRef = this;

    var spriteSheetPromise = this.loadSpriteSheet();
    spriteSheetPromise.then(function(result) {
      localRef.setupGame();
    }, function(err) {
      console.log(err);
    });

  },

  this.loadSpriteSheet = function(){
    var spriteSheetPromise = new Promise(function(resolve, reject) {
      var loader = new PIXI.loaders.Loader();
      loader.add('placeholder.png', 'img/spritesheet.json');
      loader.on("complete", resolve );
      loader.load();
    });
    return spriteSheetPromise;
  },

  // disabled default right click contextmenu on canvas
  this.disableRightClick = function(){
    //document.body.oncontextmenu
    //document.oncontextmenu
    document.oncontextmenu = function(event) {
      //console.log(event.toElement.localName);
      if(event.toElement.localName === 'canvas'){
        event.preventDefault();
        return false;
      }
    }
  },

  this.setupGame = function( data ){
    console.log("setupGame");

    var data = [
      [ 1,0,0,0 ],
      [ 0,0,0,0 ],
      [ 0,0,0,0 ],
      [ 0,0,0,1 ]
    ];
    this.field = data;
    this.revealed = 0;
    this.unrevealed = 0;

    //intial attempt to get amount of blank spaces for win condition
    // var contains = Array2D.contains(this.field, 0);
    // console.log("contains");
    // console.log(contains);

    this.container = new PIXI.Container();

    for(var r = 0; r < this.field.length; r++ ){
      for(var c = 0; c < this.field[r].length; c++ ){
        this.addSprite( r, c );
        if( this.field[r][c] == 0 ){
          this.unrevealed = this.unrevealed + 1;
        }
      }
    }

    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;
    this.container.x = this.canvas.renderer.width / 2;
    this.container.y = this.canvas.renderer.height / 2;

    this.canvas.stage.addChild(this.container);
  },

  this.addSprite = function( r, c ){
    if(this.mode == "default"){
      var image = "grass";
    }else{
      var image = ( this.field[r][c] == 2 ? "rock" : "grass" );
    }

    var placeholder = PIXI.Texture.fromFrame( image );
    // following will be in the loop
    var temp = new PIXI.Sprite(placeholder);

    temp.x = (c % 4) * 55;
    temp.y = (r % 4) * 55;

    // Opt-in to interactivity
    temp.interactive = true;
    // Shows hand cursor
    temp.buttonMode = true;

    if( this.field[r][c] != 0 ){
      temp.bomb = true;
    }else{
      temp.bomb = false;
      var s = this.calculateNeighbourSum( r, c );
      temp.neighbours = s;
      temp.c = c;
      temp.r = r;
    }

    var localRef = this;
    if(!this.mobile){

      temp.on('click', function(){
        localRef.reveal( this );
      });

      temp.on('rightclick', function(){
        localRef.flag( this );
      });

    }else{
      // touch-only
      temp.on('tap', function(){
        localRef.reveal( this );
      });

    }

    temp.accessible = true;
    temp.accessibleTitle = 'Click to reveal area';

    this.container.addChild(temp);
  },

  this.cascade = function( r, c ){
    var batchOne = [];
    var batchTwo = [];
    var spriteGrid = this.container.children;
    //take x,y / r,c look for empty ones arround
    //console.log( r +"="+ c );
    var surrounds = Array2D.surrounds(this.field, r, c );
    //console.log( surrounds );
    for(var i = 0; i < surrounds.length; i++ ){
      //console.log(spriteGrid.length);
      for(var e = 0; e < spriteGrid.length; e++ ){
        if(spriteGrid[e].interactive && !spriteGrid[e].bomb){
          if( spriteGrid[e].r == surrounds[i][0] && spriteGrid[e].c == surrounds[i][1] ){

            // console.log(surrounds[i]);
            // console.log(spriteGrid[e].r+"-"+spriteGrid[e].c);

            if(spriteGrid[e].neighbours == 0){
              // var sprite = this.container.children[e];
              // this.reveal( sprite );
              batchOne.push(e);
            }else{
              batchTwo.push(e);
            }

          }
        }
      }
    }

    for(var i = 0; i < batchOne.length; i++ ){
      var e = batchOne[i];
      var sprite = this.container.children[e];
      this.reveal( sprite );
    }
    /*
    var localRef = this;
    setTimeout(function() {
      for(var i = 0; i < batchTwo.length; i++ ){
        var e = batchTwo[i];
        var sprite = localRef.container.children[e];
        localRef.reveal( sprite );
      }
    }, 150);
    */

  },

  this.calculateNeighbourSum = function( r, c ){
    var neighbors = Array2D.neighbors(this.field, r, c );
    var sum = 0;
    for(var i = 0; i < neighbors.length; i++ ){
      if( neighbors[i] != undefined ){
        sum = sum + (neighbors[i] <= 1 ? neighbors[i] : 1 );
      }
    }
    return sum;
  },

  this.reveal = function( sprite ) {
    var newTexture = PIXI.Texture.fromFrame( "dirt" );
    sprite.interactive = false;
    if(sprite.bomb){
      console.log("boom trigger end of game");
      newTexture = PIXI.Texture.fromFrame( "bomb" );
    }else{
      var cal = this.calculateNeighbourSum(sprite.r, sprite.c );
      if( sprite.neighbours != 0 ){
        var n = (sprite.neighbours >= 8 ? 8 : sprite.neighbours );
        newTexture = PIXI.Texture.fromFrame(n);
      }else{
        this.cascade( sprite.r, sprite.c );
      }
      this.revealed++;
      console.log(this.revealed);
    }
    // may want animation, then reveal
    sprite.texture = newTexture;

  },

  this.flag = function( sprite ) {
    //may need a limit on flags per bombs
    console.log("place flag");
    var newTexture = PIXI.Texture.fromFrame( "flag" );
    sprite.texture = newTexture;
  }

};
