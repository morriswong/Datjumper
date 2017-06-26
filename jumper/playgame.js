var NUMBER_OF_PLATFORM = 20
var background

var Jumper = function() {};
Jumper.Play = function() {};

var playgame = function(game){};

// Jumper.Play.prototype = {

playgame.prototype = {

  // preload: function() {
  //   this.load.image( 'heroUp', 'assets/frame_right.png' );
  //   this.load.image( 'heroDown', 'assets/frameFall.png' );
  //   this.load.image( 'pixel', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/pixel_1.png' );
  // },

  create: function() {
    // background color
    this.stage.backgroundColor = '#6bf';
    background = game.add.tileSprite(0, 0, game.width, game.height, "background3");
    // this.world.sendToBack(background);

    // scaling
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize( true );

    // physics
    this.physics.startSystem( Phaser.Physics.ARCADE );

    // camera and platform tracking vars
    this.cameraYMin = 99999;
    this.platformYMin = 99999;

    // create platforms
    this.platformsCreate();

    // create hero
    this.heroCreate();

    // cursor controls
    this.cursor = this.input.keyboard.createCursorKeys();

    var self = this

    if (window.DeviceOrientationEvent) {//
        window.addEventListener("deviceorientation", function () {//gyro
            processGyro(event.alpha, event.beta, event.gamma);
        }, true);
    }

    var velocity = this.hero.body.velocity;

    function processGyro(alpha,beta,gamma){
        if (gamma > 0 && self.hero){
            if (velocity.x >= 400){
                velocity.x = velocity.x
            } else if (gamma > 15) {
                velocity.x += (gamma * 1.5);
            } else {
                velocity.x += (gamma);
            }

            self.hero.scale.setTo(0.2, 0.2);
        }else if (gamma < 0 && self.hero) {
            if (velocity.x <= -400){
                velocity.x = velocity.x
            }else if (gamma < -15) {
                velocity.x += (gamma * 1.5);
            } else {
                velocity.x += (gamma);
            }
            self.hero.scale.setTo(-0.2, 0.2);
        }
    }
  },

  update: function() {
    // this is where the main magic happens
    background.position.y = this.camera.y;

    // the y offset and the height of the world are adjusted
    // to match the highest point the hero has reached
    this.world.setBounds( 0, -this.hero.yChange, this.world.width, this.game.height + this.hero.yChange );

    // the built in camera follow methods won't work for our needs
    // this is a custom follow style that will not ever move down, it only moves up
    this.cameraYMin = Math.min( this.cameraYMin, this.hero.y - this.game.height + 500 );
    this.camera.y = this.cameraYMin;
    // background = game.add.tileSprite(0, this.camera.y, game.width*2, game.height*2, "background3");
    // this.world.sendToBack(background);

    // for each platform, find out which is the highest
    // if one goes below the camera view, then create a new one at a distance from the highest one
    // these are pooled so they are very performant
    this.platforms.forEachAlive( function( elem ) {
      this.platformYMin = Math.min( this.platformYMin, elem.y );
      if( elem.y > this.camera.y + this.game.height ) {
        elem.kill();
        this.platformsCreateOne(this.rnd.integerInRange(0,this.world.width - 70), this.rnd.integerInRange(this.platformYMin - 100, this.platformYMin - 200), 100 );
      }
    }, this );

    // hero collisions and movement
    this.physics.arcade.collide( this.hero, this.platforms );
    this.heroMove();

  },

  shutdown: function() {
    // reset everything, or the world will be messed up
    this.world.setBounds( 0, 0, this.game.width, this.game.height );
    this.cursor = null;
    this.hero.destroy();
    this.hero = null;
    this.platforms.destroy();
    this.platforms = null;
  },

  platformsCreate: function() {
    // platform basic setup
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple( NUMBER_OF_PLATFORM, 'pixel' );

    // create the base platform, with buffer on either side so that the hero doesn't fall through
    this.platformsCreateOne( -16, this.world.height - 16, this.world.width + 16 );
    // create a batch of platforms that start to move up the level
    for( var i = 0; i < (NUMBER_OF_PLATFORM - 1); i++ ) {
      this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.world.height - 100 * i , 100 );
    }
  },

  platformsCreateOne: function( x, y, width ) {
    // this is a helper function since writing all of this out can get verbose elsewhere
    var platform = this.platforms.getFirstDead();
    platform.reset( x, y );
    platform.scale.x = width;
    platform.scale.y = 16;
    platform.body.immovable = true;
    return platform;
  },

  heroCreate: function() {
    // basic hero setup
    this.hero = game.add.sprite( this.world.centerX, this.world.height - 36, 'heroUp' );
    this.hero.scale.setTo(-0.2, 0.2);
    this.hero.anchor.set( 0.5 );

    // track where the hero started and how much the distance has changed from that point
    this.hero.yOrig = this.hero.y;
    this.hero.yChange = 0;

    // hero collision setup
    // disable all collisions except for down
    this.physics.arcade.enable( this.hero );
    this.hero.body.gravity.y = 1500;
    this.hero.body.velocity.y = -1500;
    this.hero.body.checkCollision.up = false;
    this.hero.body.checkCollision.left = false;
    this.hero.body.checkCollision.right = false;
  },

  heroMove: function() {
    // handle the left and right movement of the hero
    // if( this.cursor.left.isDown ) {
    //   this.hero.body.velocity.x = -400;
    // } else if( this.cursor.right.isDown ) {
    //   this.hero.body.velocity.x = 400;
    // } else {
    //   this.hero.body.velocity.x = 0;
    // }

    // handle hero jumping && this.cursor.up.isDown
    if(this.hero.body.touching.down) {
      this.hero.body.velocity.y = -1000;
    }

    if(this.hero.body.velocity.y >= 0){
        this.hero.loadTexture('heroDown')
    } else {
        this.hero.loadTexture('heroUp')
    }

    console.log(this.hero.body.velocity.y);

    // wrap world coordinated so that you can warp from left to right and right to left
    this.world.wrap( this.hero, this.hero.width / 2, false );

    // track the maximum amount that the hero has travelled
    this.hero.yChange = Math.max( this.hero.yChange, Math.abs( this.hero.y - this.hero.yOrig ) );

    // if the hero falls below the camera view, gameover
    if( this.hero.y > this.cameraYMin + this.game.height && this.hero.alive ) {
      this.state.start( 'GameOverScreen' );
    }
  }
}

// var game = new Phaser.Game( 640,960, Phaser.CANVAS, '' );
// game.state.add( 'Play', Jumper.Play );
// game.state.start( 'Play' );
