var NUMBER_OF_PLATFORM = 20
var background
var health = 100
var coins= 0
var canSwipe = true
var swipeDistance = 200
var swipePowah = 1

var playgame = function(game){};

playgame.prototype = {

  create: function() {

    //Setting up health bar
    var barConfig = {
        width: 450,
        height: 40,
        x: 250,
        y: 40,
        bg: {
            color: '#651828'
        },
        bar: {
            color: '#FEFF03'
        },
        animationDuration: 200,
        flipped: false,
        isFixedToCamera: true
    };
    this.myHealthBar = new HealthBar(this.game, barConfig);
    this.world.bringToTop(this.myHealthBar); //Not working
    this.sfx = {
        coin: this.game.add.audio('sfxcoin'),
        double: this.game.add.audio('sfxdouble')
    };
        // background color
    this.stage.backgroundColor = '#6bf';
    background = game.add.tileSprite(0, 0, game.width, game.height, "background3");
    this.world.sendToBack(background);

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
    this.coinYMin = 99999;

    // create platforms
    this.platformsCreate();
    this.coinsCreate();

    // create hero
    this.heroCreate();

    // cursor controls
    this.cursor = this.input.keyboard.createCursorKeys();

    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function () {
            processGyro(event.alpha, event.beta, event.gamma);
        }, true);
    }

    var self = this
    var velocity = this.hero.body.velocity;

    function processGyro(alpha,beta,gamma){
        if (gamma > 0 && self.hero){
            if (velocity.x >= 400){
                velocity.x = velocity.x
            }
            else if (gamma > 10) {
                velocity.x += (gamma * 1.5);}
            else {
                velocity.x += gamma;
            }
            self.hero.scale.setTo(0.2, 0.2);
        }else if (gamma < 0 && self.hero) {
            if (velocity.x <= -400){
                velocity.x = velocity.x
            }
            else if (gamma < -10) {
                velocity.x += (gamma * 1.5);}
            else {
                velocity.x += gamma;
            }
            self.hero.scale.setTo(-0.2, 0.2);
        }
    }
  },

  update: function() {
    background.position.y = this.camera.y;
    // this is where the main magic happens
    // the y offset and the height of the world are adjusted
    // to match the highest point the hero has reached
    this.world.setBounds( 0, -this.hero.yChange, this.world.width, this.game.height + this.hero.yChange );

    // the built in camera follow methods won't work for our needs
    // this is a custom follow style that will not ever move down, it only moves up
    this.cameraYMin = Math.min( this.cameraYMin, this.hero.y - this.game.height + 500 );
    this.camera.y = this.cameraYMin;

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

    //creating coins
    this.coins.forEachAlive( function( elem ) {
        this.coinYMin = Math.min( this.coinYMin, elem.y );
        if( elem.y > this.camera.y + this.game.height ) {
            elem.kill();
            this.coinsCreateOne(this.rnd.integerInRange(0,this.world.width -70), this.rnd.integerInRange(this.coinYMin - 100, this.coinYMin - 200), 2 );
        }
   }, this );

    //Coin killer
    this.physics.arcade.overlap(this.hero, this.coins, this.onHeroVsCoin, null, this);
    // this.physics.arcade.collide(this.hero, this.coins, this.findPlatformType, null, this);

    // hero collisions and movement
    this.physics.arcade.collide( this.hero, this.platforms, this.findPlatformType, null, this );
    this.heroMove();

    console.log(parseInt(this.hero.body.y - 830) * -1);
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

// COINS

  coinsCreate: function() {
    // coins basic setup
    this.coins = this.add.group();
    this.coins.enableBody = true;
    this.coins.createMultiple( 21, 'coin' );
    // create a batch of coins
    for( var i = 0; i <= 20; i++ ) {
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

   onHeroVsCoin: function(hero, coin) {
       if (this.hero.body.touching.down){
           this.hero.body.velocity.y = -1200;
       }
       this.sfx.coin.play();
       if(health < 100){
           health += 4;
       }
       this.myHealthBar.setPercent(health);
       coins += 1;
       coin.kill();
    },

// PLATFROMS

  platformsCreate: function() {
    // platform basic setup
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    // this.physics.p2.enable( this.platforms, false);
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

    if (game.rnd.between(0, 0.5)!=0){
        platform.kind = "double";
        platform.tint =  0xF6FA05;
        platform.scale.y = 32;
        platform.overlap = function(){
            kill.platform;
        };
    } else {
        platform.kind = "normal";
    }
    return platform;
  },

  //Not working while heroMove exist
  findPlatformType: function(hero, platform){
      if (platform.kind == "double" && this.hero.body.touching.down){
          this.hero.body.velocity.y = -2000;
          health -= 15;
          this.myHealthBar.setPercent(health);
          this.sfx.double.play();
      } else if (this.hero.body.touching.down){
          this.hero.body.velocity.y = -1000;
          health -= 8;
          this.myHealthBar.setPercent(health);
      } else {
          this.hero.body.velocity.y = -1100;
      }

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
    if( this.cursor.left.isDown ) {
      this.hero.body.velocity.x = -400;
      this.hero.scale.setTo(-0.2, 0.2);
    } else if( this.cursor.right.isDown ) {
      this.hero.body.velocity.x = 400;
      this.hero.scale.setTo(0.2, 0.2);
    } else {
      this.hero.body.velocity.x = 0;
    }

    if (this.hero.body.velocity.y >= 0){
        this.hero.loadTexture('heroDown')
    } else {
        this.hero.loadTexture('heroUp')
    }
    //Swipe special movement
    if(canSwipe == true){
        if(Phaser.Point.distance(game.input.activePointer.positionDown,
            game.input.activePointer.positionUp) > swipeDistance){
                if(this.hero.body.velocity.y > 0){
                this.hero.body.velocity.y = -(600 + 200*swipePowah);}
                else{
                this.hero.body.velocity.y -= (600 + 200*swipePowah);
                }
                canSwipe = false;
                setTimeout(function(){
        canSwipe = true; //Enables swipe again
    }, (21000 - 1000*swipePowah)); //1 second less of wait for each point in swipePowah!
        }
    }

    // wrap world coordinated so that you can warp from left to right and right to left
    this.world.wrap( this.hero, this.hero.width / 2, false );

    // track the maximum amount that the hero has travelled
    this.hero.yChange = Math.max( this.hero.yChange, Math.abs( this.hero.y - this.hero.yOrig ) );

    //0 Health gameover
    if(health < 1 && this.hero.alive ) {
        health = 100;
        this.state.start( 'GameOverScreen' );
    }

    // if the hero falls below the camera view, gameover
    if( this.hero.y > this.cameraYMin + this.game.height && this.hero.alive ) {
      health = 100
      this.state.start( 'GameOverScreen' );
    }
  }
}
