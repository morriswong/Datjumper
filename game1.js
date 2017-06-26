var Jumper = function() {};
Jumper.Play = function() {};

Jumper.Play.prototype = {

  preload: function() {
    this.load.image( 'hero', 'basketball.png' );
    this.load.image( 'pixel', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/pixel_1.png' );
    this.game.load.spritesheet('coin', 'coin_spritesheet.png', 22, 22);

  },

  create: function() {

    // HUD
    
    let coinIcon = this.game.make.image(0, 0, 'coin');
    this.hud = this.game.add.group();
    this.hud.add(coinIcon);
    this.hud.position.set(10, 10);

    // background color
    this.stage.backgroundColor = '#6bf';

    // scaling
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.maxWidth = this.game.width;
    // this.scale.maxHeight = this.game.height;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize( true );

    // physics
    this.physics.startSystem( Phaser.Physics.ARCADE );

    // camera and platform tracking vars
    this.cameraYMin = 99999;
    this.platformYMin = 99999;
    this.coinYmin = 99999;

    // create platforms
    this.platformsCreate();
    this.coinsCreate();

    // create hero
    this.heroCreate();

    // cursor controls
    this.cursor = this.input.keyboard.createCursorKeys();

    gyro.frequency = 10;
    var self = this;
    // start gyroscope detection/
    gyro.startTracking(function(o) {
      // updating player velocity
         self.hero.body.velocity.x += o.gamma/15;
        //  self.hero.body.velocity.y += o.beta/8;
    });
  },

  update: function() {
      //Coin killer
    this.game.physics.arcade.overlap(this.hero, this.coins, this.onHeroVsCoin, null, this);
    // onHeroVsCoin = function (hero, coin) {
    //     console.log("pet");
    //     coin.kill();
    //     };
    // this is where the main magic happens
    // the y offset and the height of the world are adjusted
    // to match the highest point the hero has reached
    this.world.setBounds( 0, -this.hero.yChange, this.world.width, this.game.height + this.hero.yChange );

    // the built in camera follow methods won't work for our needs
    // this is a custom follow style that will not ever move down, it only moves up
    this.cameraYMin = Math.min( this.cameraYMin, this.hero.y - this.game.height + 500 );
    this.camera.y = this.cameraYMin;

    // hero collisions and movement
    this.physics.arcade.collide( this.hero, this.platforms );
    this.heroMove();
    //OVerlap collisions


    // for each plat form, find out which is the highest
    // if one goes below the camera view, then create a new one at a distance from the highest one
    // these are pooled so they are very performant
    this.platforms.forEachAlive( function( elem ) {
      this.platformYMin = Math.min( this.platformYMin, elem.y );
      if( elem.y > this.camera.y + this.game.height ) {
        elem.kill();
        this.platformsCreateOne(this.rnd.integerInRange(0,this.world.width -70), this.rnd.integerInRange(this.platformYMin -100, this.platformYMin - 200), 100 );
      }
    }, this );
    //coins
    this.coins.forEachAlive( function( elem ) {
      this.coinYMin = Math.min( this.coinYMin, elem.y );
      if( elem.y > this.camera.y + this.game.height ) {
        elem.kill();
        this.coinsCreateOne(this.rnd.integerInRange(0,this.world.width -70), this.rnd.integerInRange(this.coinYMin -100, this.coinYMin - 200), 1 );
      }
    }, this );
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
  coinsCreate: function() {
    // coins basic setup
    this.coins = this.add.group();
    this.coins.enableBody = true;
    this.coins.createMultiple( 200, 'coin' );
    // create a batch of platforms that start to move up the level
    for( var i = 0; i <= 45; i++ ) {
    this.coinsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.world.height - 100*i, 2);
    }

  },
  coinsCreateOne: function( x, y, width ) {
    // this is a helper function since writing all of this out can get verbose elsewhere
    var coin = this.coins.getFirstDead();
    coin.reset( x, y );
    coin.scale.x = width;
    coin.scale.y = 2;
    coin.body.immovable = true;
    this.game.physics.enable(coin);
    coin.animations.add('rotate', [0, 1, 2, 1], 6, true); // 6fps, looped
    coin.animations.play('rotate');
    return coin;

  },
  platformsCreate: function() {
    // platform basic setup
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    this.platforms.createMultiple( 200, 'pixel' );

    // create the base platform, with buffer on either side so that the hero doesn't fall through
    this.platformsCreateOne( -16, this.world.height - 16, this.world.width + 16 );
    // create a batch of platforms that start to move up the level
    for( var i = 0; i <= 45; i++ ) {
    this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.world.height - 100*i, 100);
    }

  },
  onHeroVsCoin: function(hero, coin) {
      console.log("pet");
      coin.kill();
  },
  platformsCreateOne: function( x, y, width ) {
    // this is a helper function since writing all of this out can get verbose elsewhere
    var platform = this.platforms.getFirstDead();
    platform.reset( x, y );
    platform.scale.x = width;
    platform.scale.y = 16;
    platform.body.immovable = true;

    if (game.rnd.between(0, 1)!=0){
            platform.type = "double";
            platform.tint =  0xF6FA05;
            platform.scale.y = 22;
            platform.overlap = function(){
                kill.platform;
            };
        }
    else {
            platform.type = "normal";
            }
    return platform;
  },


  heroCreate: function() {
    // basic hero setup
    this.hero = game.add.sprite( this.world.centerX, this.world.height - 36, 'hero' );
    this.hero.anchor.set( 0.5 );

    // track where the hero started and how much the distance has changed from that point
    this.hero.yOrig = this.hero.y;
    this.hero.yChange = 0;

    // hero collision setup
    // disable all collisions except for down
    this.physics.arcade.enable( this.hero );
    this.hero.body.gravity.y = 500;
    this.hero.body.velocity.y = -1000;
    this.hero.body.checkCollision.up = false;
    this.hero.body.checkCollision.left = false;
    this.hero.body.checkCollision.right = false;
  },


  heroMove: function() {
     //handle the left and right movement of the hero
     if( this.cursor.left.isDown ) {
      this.hero.body.velocity.x = -400;
     } else if( this.cursor.right.isDown ) {
       this.hero.body.velocity.x = 400;
     } else {
         this.hero.body.velocity.x = 0;
    }

    // handle hero jumping && this.cursor.up.isDown
    if(this.hero.body.touching.down) {
          this.hero.body.velocity.y = -1000;
      navigator.vibrate([500]);
    }


    // wrap world coordinated so that you can warp from left to right and right to left
    this.world.wrap( this.hero, this.hero.width / 2, false );

    // track the maximum amount that the hero has travelled
    this.hero.yChange = Math.max( this.hero.yChange, Math.abs( this.hero.y - this.hero.yOrig ) );

    // if the hero falls below the camera view, gameover
    if( this.hero.y > this.cameraYMin + this.game.height && this.hero.alive ) {
      this.state.start( 'Play' );
    }
  }
}

var game = new Phaser.Game( 640,960, Phaser.CANVAS, '' );
game.state.add( 'Play', Jumper.Play );
game.state.start( 'Play' );
