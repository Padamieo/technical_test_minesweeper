PIXI = require("pixi.js");
stats = require("stats.js");
Array2D = require("array2d");

var game = function(){

  this.gridSize = 9;
  this.flagHoldDuration = 500;
  this.mode = "default";
  this.currentlevel = 1;
  this.vibration = false;
  this.mobile = false;
  this.revealed = 0;
  this.unrevealed = 0;
  this.bombRatio = 12;
  this.cascadeTime = 150;
  this.defaultIndicator = 125;
  this.resultTimeOut = 1000;
  this.reRoute = '';
  this.ratio = 1;
  this.localhost = "localhost:3000";

  this.init = function( mobile ){
    var localRef = this;
    var intialized = new Promise(function(resolve, reject) {

      localRef.mobile = mobile;

      if(!localRef.mobile){
        localRef.disableRightClick();
      }else{
        localRef.vibration = app.vibrationSupport();
      }

      localRef.canvas = new PIXI.Application(600, 600, {
        backgroundColor : 0x15932a
      });

      // Scale mode for all textures, will retain pixelation
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

      document.body.appendChild(localRef.canvas.view);
      $(localRef.canvas.view).attr('id', 'canvas');

      var spriteSheetPromise = localRef.loadSpriteSheet();

      spriteSheetPromise.then(function(result) {
        resolve(result);
      }, function(err) {
        reject(err);
      });

      localRef.setupStats();
      localRef.displaySize();

      //localRef.canvas.renderer.resize(window.innerWidth, window.innerHeight);
    });
    return intialized;
  },

  this.displaySize = function(){
    this.ratio = 1;

    if(window.innerHeight > 600 && window.innerWidth > 600){
      var cal = (window.innerHeight / 600);
      var h = window.innerHeight;
      var w = cal*600;
      if( w > window.innerWidth){
        var cal = (window.innerWidth / 600);
        var w = window.innerWidth;
        //var h = cal*800;
      }
      //var w = window.innerWidth;
      //console.log(cal);
      this.ratio = cal;
      this.canvas.renderer.resize(w, h );
    }
  },

  this.setupStats = function(){
    if( window.location.host == this.localhost ){
      this.stats = new stats();
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.top = '0px';
      document.body.appendChild(this.stats.domElement);
    }
  },

  this.vibrate = function( value ){
    if(this.mobile){
      if(this.vibration){
        navigator.vibrate( value );
      }
    }
  },

  this.loadSpriteSheet = function(){
    var localRef = this;
    var spriteSheetPromise = new Promise(function(resolve, reject) {
      var loader = new PIXI.loaders.Loader();
      loader.add('levels', localRef.reRoute+'levels/levels.json', function (e) {
        localRef.levels = e.data;
      });
      loader.add('placeholder.png', localRef.reRoute+'img/spritesheet.json');
      loader.on("complete", resolve );
      loader.on("error", reject );
      loader.load();
    });
    return spriteSheetPromise;
  },

  // disabled default right click contextmenu on canvas
  this.disableRightClick = function(){
    //document.body.oncontextmenu
    //document.oncontextmenu
    document.oncontextmenu = function(event) {
      if(event.target.localName === 'canvas'){
        event.preventDefault();
        return false;
      }
    };
  },

  this.generateField = function(){
    var initiated = Array2D.build( this.gridSize, this.gridSize );
    var bare = Array2D.fill( initiated, 0 );
    var numberOfBombs = this.calculateBombs();
    for (i = 0; i < numberOfBombs; i++) {
      bare = this.insertRandom( bare, 1 );
    }
    return bare;
  },

  this.insertRandom = function( array, value ){
      var r = this.randomBetween( 0, this.gridSize-1 );
      var c = this.randomBetween( 0, this.gridSize-1 );
      if(array[r][c] == 0){
        array = this.insertSpecific( array, r, c, value );
      }else{
        array = this.insertRandom( array, value );
      }
      return array;
  },

  this.randomBetween = function( min, max ){
    return Math.floor( Math.random()*( max - min + 1 ) + min );
  },

  this.calculateBombs = function(){
    var spaced = this.gridSize*this.gridSize;
    var bombRatio = ( this.bombRatio > 33 ? 33 : this.bombRatio );
    var bombsToPlace = (spaced/100)*bombRatio;
    var number = Math.ceil(bombsToPlace);
    return number;
  },

  this.insertSpecific = function( array, r, c, value ){
    return Array2D.set( array, r, c, value );
  },

  this.generateSprites = function (){
    for(var r = 0; r < this.field.length; r++ ){
      for(var c = 0; c < this.field[r].length; c++ ){
        this.addSprite( r, c );
        if( this.field[r][c] == 0 ){
          this.unrevealed = this.unrevealed + 1;
        }
      }
    }
  },

  this.setupGame = function( level ){
    
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
    this.generateSprites();

    this.container.scale.set(this.ratio);

    this.container.x = (this.canvas.renderer.width/2) - (this.container.width / 2);
    this.container.y = (this.canvas.renderer.height/2) - (this.container.height / 2);

    this.canvas.stage.interactive = true;

    this.canvas.stage.addChild(this.container);

    if(this.mobile){
      this.setupIndicator();
    }

    this.canvas.start();
  },

  this.setupIndicator = function(){
    this.indicator = new PIXI.Graphics();
    this.indicator.beginFill(0xFFFFFF, 0);
    this.indicator.lineStyle(2, 0xFFFFFF, 1);
    this.indicatorData = {
      size: this.defaultIndicator*this.ratio,
      endTime: 0,
      startTime: 0
    };
    this.indicator.drawCircle( this.canvas.renderer.width/2, this.canvas.renderer.height/2, this.indicatorData.size*this.ratio );
    this.canvas.stage.addChild( this.indicator );
    this.indicator.alpha = 0;
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

    temp.interactive = true;
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

      temp.on('touchstart', function(e){
        localRef.touchDifferentiator( this, 'start', e );
      });
      temp.on('touchend', function(e){
        localRef.touchDifferentiator( this, 'end', e );
      });
      temp.on('touchendoutside', function(e){
        localRef.touchDifferentiator( this, 'end', e );
      });
      // TODO: potential other input cases
      // temp.on('touchcancel', function(e){
      //   localRef.touchDifferentiator( this, 'cancel', e );
      // });
      // temp.on('touchmove', function(e){
      //   localRef.touchDifferentiator( this, 'move', e );
      // });
    }

    temp.accessible = true;
    temp.accessibleTitle = 'Click to reveal area';

    this.container.addChild(temp);

    return temp; // passing back information for testing
  },

  this.touchDifferentiator = function( sprite, input, e ) {
    // TODO: following commented out code is for tracking touch position
    // var touchPosition = e.data.getLocalPosition(this.canvas.stage);
    // var x = touchPosition.x;
    // var y = touchPosition.y;
    var x = (sprite.x+22.5)*this.ratio;
    var y = (sprite.y+22.5)*this.ratio;

    if( input == "start" ){

      var time = new Date().getTime();
      this.indicatorData.endTime = time + this.flagHoldDuration;

      var localRef = this;
      this.timer = new PIXI.ticker.Ticker();
      this.timer.add(function() {
        // TODO: would be nice to have indictor stop when flag is able to be placed more precisely and or change color
        var time = new Date().getTime();
        if( localRef.indicatorData.endTime >= time ){
          localRef.indicator.clear();
          localRef.indicator.beginFill(0xFFFFFF, 0);
          localRef.indicator.lineStyle(2, 0xFFFFFF, 1);
          var size = localRef.indicatorData.size / 1.1;
          localRef.indicatorData.size = ( size < 45 ? 45 : size );
          localRef.indicator.drawCircle(localRef.container.x, localRef.container.y, localRef.indicatorData.size );
          localRef.indicator.worldTransform.tx = x;
          localRef.indicator.worldTransform.ty = y;
          localRef.indicator.alpha = 1;
        }else{
          localRef.vibrate( 10 );
          this.destroy();
        }
      });
      this.timer.start();
    }

    // if( input == "move" ){
    //   // TODO: may want the indicator to follow users finger
    // }

    if( input == "end" ){
      var timeNow = new Date().getTime();
      if( timeNow >= this.indicatorData.endTime ){
        this.flag( sprite );
      }else{
        this.reveal( sprite );
      }
      this.indicator.alpha = 0;
      this.indicatorData.size = this.defaultIndicator*this.ratio;
      this.timer.destroy();
    }

    // if( input == "kill" ){
    //   this.timer.destroy();
    // }

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
    }, localRef.cascadeTime );

  },

  this.cascadeSet = function( array ){
    for(var i = 0; i < array.length; i++ ){
      var s = array[i];
      var sprite = this.container.children[s];
      if(sprite != undefined){
        this.reveal( sprite );
      }
    }
  },

  this.calculateNeighbourSum = function( r, c ) {
    var neighbors = Array2D.neighbors(this.field, r, c );
    var sum = 0;
    var fallback = ( this.mode == "default" ? 1 : 0 );
    for(var i = 0; i < neighbors.length; i++ ){
      if( neighbors[i] != undefined ){
        sum = sum + (neighbors[i] <= 1 ? neighbors[i] : fallback );
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
          newTexture = PIXI.Texture.fromFrame( "bomb" );
          this.vibrate( 500 );
          this.showResult();
          //this.cleanUp(); // unkown element
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
        // TODO: may want animation, then reveal
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
      sprite.flaged = false;
      sprite.texture = PIXI.Texture.fromFrame( "grass" );
      sprite.animationSpeed = 0;
    }
  },

  this.showResult = function (){
    //TODO : show outcome to user
    setTimeout(function() {
      app.menuReset();
    }, this.resultTimeOut );
  },

  // TODO : find way to clean up ready for a new game house keeping
  // this.cleanUp = function(){
  //  this.canvas.stage.removeChild(this.container);
  // },

  this.winCondition = function(){
    if(this.revealed >= this.unrevealed){
      // TODO: this need polish
      $( "#message" ).show();
      setTimeout(function() {
        $( "#message" ).hide();
        app.menuReset();
      }, this.resultTimeOut );
    }
  };

};

module.exports = game;
