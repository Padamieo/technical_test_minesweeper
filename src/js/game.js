var game = function(){

  this.init = function( mobile ){
    console.log("game init");

    this.mobile = mobile;
    this.mode = "default";
    //this.state = "pending";

    if(!this.mobile){
      this.disableRightClick();
    }else{
      this.vibration = app.vibrationSupport();
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

    this.setupStats();

     //this.canvas.renderer.resize(window.innerWidth, window.innerHeight);
  },

  this.setupStats = function(){
    if(window.location.host == "localhost:3000"){
        stats = new Stats()
        stats.domElement.style.position = 'absolute'
        stats.domElement.style.top = '0px'
        document.body.appendChild(stats.domElement);
    }
  },

  this.vibrate = function( value ){
    if(this.vibration){
      navigator.vibrate( value );
    }
  },

  this.loadSpriteSheet = function(){
    var localRef = this;
    var spriteSheetPromise = new Promise(function(resolve, reject) {
      var loader = new PIXI.loaders.Loader();
      loader.add('levels', 'levels/levels.json', function (e) {
        localRef.levels = e.data;
      });
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
    };
  },

  this.setupGame = function( data ){
    console.log("setupGame");
    //console.log(Stats);
    //stats.begin()

    //fallbacks here
    this.field = this.levels[1];
    this.revealed = 0;
    this.unrevealed = 0;

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

    this.canvas.start();
  },

  this.addSprite = function( r, c ){
    var image = "grass";
    if(this.mode == "special"){
      image = ( this.field[r][c] == 2 ? "rock" : "grass" );
    }

    var placeholder = PIXI.Texture.fromFrame( image );
    // following will be in the loop
    var temp = new PIXI.Sprite(placeholder);

    temp.x = c * 55;
    temp.y = r * 55;

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
      temp.on('touchstart', function(){
        localRef.touchDifferentiator( this, 'start' );
      });
      temp.on('touchend', function(){
        localRef.touchDifferentiator( this, 'end' );
      });
    }

    temp.accessible = true;
    temp.accessibleTitle = 'Click to reveal area';

    this.container.addChild(temp);
  },

  this.touchDifferentiator = function( sprite, input ) {
    console.log( input );
    //localRef.reveal( this );
  },

  this.cascade = function( r, c ){
    var batchOne = [];
    var batchTwo = [];
    var spriteGrid = this.container.children;
    var surrounds = Array2D.surrounds(this.field, r, c );
    for(var i = 0; i < surrounds.length; i++ ){
      for(var e = 0; e < spriteGrid.length; e++ ){
        if(spriteGrid[e].interactive && !spriteGrid[e].bomb){
          if( spriteGrid[e].r == surrounds[i][0] && spriteGrid[e].c == surrounds[i][1] ){
            if(spriteGrid[e].neighbours == 0){
              batchOne.push(e);
            }else{
              batchTwo.push(e);
            }
          }
        }
      }
    }

    this.cascadeSet( batchOne );

    var localRef = this;
    setTimeout(function() {
      localRef.cascadeSet( batchTwo );
    }, 150);

  },

  this.cascadeSet = function( array ){
    for(var b = 0; b < array.length; b++ ){
      var s = array[b];
      var sprite = this.container.children[s];
      this.reveal( sprite );
    }
  },

  this.calculateNeighbourSum = function( r, c ) {
    var neighbors = Array2D.neighbors(this.field, r, c );
    var sum = 0;
    for(var i = 0; i < neighbors.length; i++ ){
      if( neighbors[i] != undefined ){
        sum = sum + (neighbors[i] <= 1 ? neighbors[i] : 1 );
      }
    }
    return sum;
  },

  this.reveal = function( sprite ){
    if(sprite.interactive){
      var newTexture = PIXI.Texture.fromFrame( "dirt" );
      sprite.interactive = false;
      if(sprite.bomb){
        console.log("boom trigger end of game");
        newTexture = PIXI.Texture.fromFrame( "bomb" );
        this.vibrate( 500 );
        this.cleanUp();
      }else{
        var cal = this.calculateNeighbourSum(sprite.r, sprite.c );
        if( sprite.neighbours != 0 ){
          var n = (sprite.neighbours >= 8 ? 8 : sprite.neighbours );
          newTexture = PIXI.Texture.fromFrame(n);
        }else{
          this.cascade( sprite.r, sprite.c );
        }
        this.revealed++;
      }
      // may want animation, then reveal
      sprite.texture = newTexture;
      this.winCondition();
    }
  },

  this.animatedFlag = function( x ,y ){
    var animatedFrame = [];

      for (var i = 0; i < 2; i++) {
           var frame = PIXI.Texture.fromFrame('flag' + i );
           animatedFrame.push(frame);
      }
      var animatedFlag = new PIXI.extras.AnimatedSprite(animatedFrame);

      animatedFlag.x = this.canvas.renderer.width / 2;
      animatedFlag.y = this.canvas.renderer.height / 2;
      animatedFlag.anchor.set(0.5);
      animatedFlag.gotoAndPlay(0);
      animatedFlag.animationSpeed = 0.05;

      return animatedFlag;
  },

  this.flag = function( sprite ) {
    var image = "grass";
    if(sprite.flaged == undefined || sprite.flaged == false ){
      sprite.flaged = true;
      image = "flag0";
    }else{
      sprite.flaged = false;
    }
    sprite.texture = PIXI.Texture.fromFrame( image );
  },

  this.flag_A = function( sprite ){
    if(sprite.flaged == undefined || sprite.flaged == false ){
      sprite.flaged = true;
      console.log(sprite);

      var x = sprite.position.x;
      var y = sprite.position.y;
      var anim = this.animatedFlag( x, y );
      sprite.addChild( anim );

    }else{
      //need to action revert somehow
      sprite.flaged = false;
      sprite.texture = PIXI.Texture.fromFrame( "grass" );
    }
  },

  this.cleanUp = function(){
    // this does not work
    //this.canvas.stage.removeChild(this.container);
  },

  this.winCondition = function(){
    if(this.revealed >= this.unrevealed){
      console.log( "Winner" );
    }
  };

};
