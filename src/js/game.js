function game(){

  this.init = function( mobile ){
    console.log("game init");

    this.mobile = mobile;

    if(!this.mobile){
      this.disableRightClick();
    }

    this.canvas = new PIXI.Application(800, 600, {
      backgroundColor : 0x1099bb
    });

    document.body.appendChild(this.canvas.view);
    var localRef = this;

    this.assetsPromise = new Promise(function(resolve, reject) {
      var loader = new PIXI.loaders.Loader();
      loader.add('placeholder.png', 'img/spritesheet.json');
      //console.log(loader);
      loader.on("complete", resolve );
      // function(){
      //   console.log(localRef);
      //   localRef.sprite = PIXI.Texture.fromFrame("grass");
      //   console.log(this);
      // });
      //this.onAssetLoad );
      loader.load();
    });

    this.assetsPromise.then(function(result) {
      //var b = PIXI.Texture.fromFrame("grass");
      //console.log(b); // "Stuff worked!"
      //console.log( localRef );
      localRef.setupGame();
    }, function(err) {
      console.log(err); // Error: "It broke"
    });

    //var container = new PIXI.Container();
    //this.state = "pending";
  },

  this.onAssetLoad = function( ){
    this.sprite = PIXI.Sprite.fromFrame("grass");
  },

  this.disableRightClick = function(){
    //document.body.oncontextmenu
    //document.oncontextmenu
    document.oncontextmenu = function(event) {
      console.log(event.toElement.localName);
      if(event.toElement.localName === 'canvas'){
        event.preventDefault();
        return false;
      }
    }
  },

  this.setupGame = function( data ){
    console.log("setupGame");

    var data = [
      [ 0,0,0,1 ],
      [ 0,0,0,0 ],
      [ 0,1,0,0 ],
      [ 0,1,0,1 ]
    ];
    this.field = data;

    this.container = new PIXI.Container();

    for(var r = 0; r < this.field.length; r++ ){
      for(var c = 0; c < this.field[r].length; c++ ){
        this.addSprite( r, c );
      }
    }

    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;
    this.container.x = this.canvas.renderer.width / 2;
    this.container.y = this.canvas.renderer.height / 2;

    this.canvas.stage.addChild(this.container);
  },

  this.addSprite = function( r, c ){
    var placeholder = PIXI.Texture.fromFrame("grass");
    // following will be in the loop
    var temp = new PIXI.Sprite(placeholder);

    temp.x = (c % 4) * 50;
    temp.y = (r % 4) * 50;

    // Opt-in to interactivity
    temp.interactive = true;

    // Shows hand cursor
    temp.buttonMode = true;

    if( this.field[r][c] != 0 ){
      temp.bomb = true;
    }else{
      temp.bomb = false;
      var s = this.calculateNeighbourSum( r, c );
      temp.data = s;
    }

    if(!this.mobile){
      temp.on('click', this.onClick);
    }else{

    }
    this.container.addChild(temp);
  },

  this.calculateNeighbourSum = function( r, c ){
    var neighbors = Array2D.neighbors(this.field, r, c );
    var sum = 0;
    for(var i = 0; i < neighbors.length; i++ ){
      if( neighbors[i] != undefined ){
        sum = sum + neighbors[i];
      }
    }
    return sum;
  },

  this.onClick = function() {
      var newTexture = PIXI.Texture.fromFrame("dirt");
      if(this.bomb){
        console.log("boom trigger end of game");
        newTexture = PIXI.Texture.fromFrame("bomb");
      }else{
        if( this.data != 0 ){
          var n = (this.data > 3 ? 3 : this.data );
          newTexture = PIXI.Texture.fromFrame(n);
        }
      }
      // may want animation, then reveal
      this.texture = newTexture;
  }

};
