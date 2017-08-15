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

    this.container = new PIXI.Container();

    var placeholder = PIXI.Texture.fromFrame("grass");

    // for(var r = 0; r < data.length; r++ ){
    //   for(var c = 0; c < data[r].length; c++ ){
    //     //console.log(data[r][c]);
    //   }
    // }

    // following will be in the loop
    var temp = new PIXI.Sprite(placeholder);
    temp.anchor.set(0.5);

    this.container.x = this.canvas.renderer.width / 2;
    this.container.y = this.canvas.renderer.height / 2;

    // Opt-in to interactivity
    temp.interactive = true;

    // Shows hand cursor
    temp.buttonMode = true;

    temp.data = "bomb";

    if(!this.mobile){
      temp.on('click', this.onClick);
    }else{

    }

    this.container.addChild(temp);
    this.canvas.stage.addChild(this.container);
  },

  this.onClick = function() {
      console.log("click");
      this.scale.x *= 1.25;
      this.scale.y *= 1.25;
      // if( this.data == "bomb" ){
      //   console.log( "boom" );
      // }
  }

};
