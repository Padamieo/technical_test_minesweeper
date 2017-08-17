var game = function(){

  this.init = function( mobile ){
    console.log("game init");

    this.mobile = mobile;
    this.mode = "default";
    //this.state = "pending";
    this.gridSize = 9;

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
      localRef.setupGame( 1 );
    }, function(err) {
      console.log(err);
    });

    //this.canvas.renderer.scale.x = this.canvas.renderer.scale.y = 0.5;

    this.setupStats();

     //this.canvas.renderer.resize(window.innerWidth, window.innerHeight);
  },

  this.setupStats = function(){
    if(window.location.host == "localhost:3000"){
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
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

  this.generateField = function(){
    var initiated = Array2D.build( this.gridSize, this.gridSize );
    var base = Array2D.fill( initiated, 0 );
    console.log(base);
  },

  this.setupGame = function( level ){
    console.log("setupGame");

    //no level set fallback to random generated
    if( level == undefined ){
      data = this.generateField();
    }else{
      if( this.levels[level] != undefined ){
        data = this.levels[level];
      }else{
        data = this.generateField();
      }
    }
    this.field = data;
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

    // for ui on press, may not be used
    //this.ui = new PIXI.Container();
  },

  this.addSprite = function( r, c ){
    var image = "grass";
    if(this.mode == "special"){
      image = ( this.field[r][c] == 2 ? "rock" : "grass" );
    }
    var placeholder = [];
    var frame = PIXI.Texture.fromFrame( image );

    placeholder.push( frame );
    var temp = new PIXI.extras.AnimatedSprite( placeholder, true );

    temp.x = c * 55;
    temp.y = r * 55;

    // Opt-in to interactivity
    temp.interactive = true;
    // Shows hand cursor
    temp.buttonMode = true;

    temp.animationSpeed = 0;

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
    if( input == "start" ){
      this.canvas.stage.interactive = true;
      var graphics = new PIXI.Graphics();
      graphics.beginFill(0xFFFFFF, 0);
      graphics.lineStyle(2, 0xFFFFFF, 1);
      //var mousePosition = this.canvas.renderer.interaction.mouse.global;
      //console.log(mousePosition);
      console.log( this.canvas.renderer );
      graphics.drawCircle( 100, 100, 100 );
      this.canvas.stage.addChild(graphics);
      //localRef.reveal( sprite );
    }

    if( input == "end" ){
      //remove indicator
    }
    console.log( input );

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
      if(sprite.flaged == undefined || sprite.flaged == false ){
        var newTexture = PIXI.Texture.fromFrame( "dirt" );
        sprite.interactive = false;
        if(sprite.bomb){
          console.log("boom trigger end of game");
          newTexture = PIXI.Texture.fromFrame( "bomb" );
          this.vibrate( 500 );
          //this.cleanUp();
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
        sprite.animationSpeed = 0;
        sprite.texture.update();

        this.winCondition();
      }
    }
  },

  this.animatedFlag = function( ){
    var animatedFrame = [];
    for (var i = 0; i < 3; i++) {
         var frame = PIXI.Texture.fromFrame('flag' + i );
         animatedFrame.push(frame);
    }
    return animatedFrame;
  },

  this.flag = function( sprite ){
    if(sprite.flaged == undefined || sprite.flaged == false ){
      sprite.flaged = true;

      sprite.textures = this.animatedFlag();
      sprite.animationSpeed = 0.05;
      sprite.gotoAndPlay(0);
      sprite.texture.update();
    }else{
      //need to action revert somehow
      sprite.flaged = false;
      sprite.texture = PIXI.Texture.fromFrame( "grass" );
      sprite.animationSpeed = 0;
    }
  },

  this.cleanUp = function(){
    // this does not work
    // this.canvas.stage.removeChild(this.container);
  },

  this.winCondition = function(){
    if(this.revealed >= this.unrevealed){
      console.log( "Winner" );
    }
  };

};
//modules.exports = game;
