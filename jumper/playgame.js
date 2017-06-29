<<<<<<< HEAD
=======
var NUMBER_OF_PLATFORM = 20
var background

var health = 100
var maxHealth = 200

var coins = 0
var score = 0
var canSwipe = true
var swipeDistance = 200
var swipePowah = 1

var heroSize = 0.2

var doubleDecrease = 15
var singleDecrease = 8

var deviceCheck = new MobileDetect(window.navigator.userAgent);

var coinsDisplay
var scoreDisplay

>>>>>>> d70f086c5ea962cfd2c46987be280cd3318cce03
var playgame = function(game){};

playgame.prototype = {

<<<<<<< HEAD

  create: function() {
=======
  create: function() {

>>>>>>> d70f086c5ea962cfd2c46987be280cd3318cce03
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
    this.sfx = {
        coin: this.game.add.audio('sfxcoin'),
        double: this.game.add.audio('sfxdouble'),
        gameplay: this.game.add.audio('sfxgameplay'),
        die: this.game.add.audio('sfxdie')
    };

    // background color
    this.stage.backgroundColor = '#6bf';
    background = game.add.tileSprite(0, 0, game.width, game.height, "background");

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

    //HealthBar
    this.myHealthBar = new HealthBar(this.game, barConfig);

    // create hero
    this.heroCreate();

    // cursor controls
    this.cursor = this.input.keyboard.createCursorKeys();

    //power ups
    var increaseHealth = game.add.button(35, 850, "increaseHealth", this.healthUp, this);
    increaseHealth.fixedToCamera = true
    increaseHealth.scale.setTo(0.5, 0.5)
    // increaseHealth.anchor.set( 1 );
    var times = game.add.bitmapText(120, 870, "font", "x", 40);
    times.fixedToCamera = true
    times.tint = 0xFFFFFF;
    this.healthUpCount = game.add.bitmapText(150, 860, "font", healthUpCount.toString(), 60);
    this.healthUpCount.fixedToCamera = true;
    this.healthUpCount.tint = 0xFFFFFF;;

    var jumpHigher = game.add.button(230, 850, "jumpHigher", this.jetpack(), this);
    jumpHigher.fixedToCamera = true
    jumpHigher.scale.setTo(0.5, 0.5)
    // jumpHigher.anchor.set( 1 );
    var times = game.add.bitmapText(325, 870, "font", "x", 40);
    times.fixedToCamera = true
    times.tint = 0xFFFFFF;
    this.jetpackCount = game.add.bitmapText(365, 860, "font", jetpackCount.toString(), 60);
    this.jetpackCount.fixedToCamera = true;
    this.jetpackCount.tint = 0xFFFFFF;;

    var grow = game.add.button(445, 855, "grow", this.mushroom, this);
    grow.fixedToCamera = true
    grow.scale.setTo(0.5, 0.5)
    // grow.anchor.set( 1 );
    var times = game.add.bitmapText(520, 870, "font", "x", 40);
    times.fixedToCamera = true
    times.tint = 0xFFFFFF;
    this.mushroomCount = game.add.bitmapText(560, 860, "font", mushroomCount.toString(), 60);
    this.mushroomCount.fixedToCamera = true;
    this.mushroomCount.tint = 0xFFFFFF;;

    //Coins count
    coinsTitle = game.add.bitmapText(520, 20, "font", "coins", 30);
    coinsTitle.fixedToCamera = true
    coinsTitle.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

    this.coinsDisplay = game.add.bitmapText(550, 50, "font", coins.toString(), 30);
    this.coinsDisplay.fixedToCamera = true;
    this.coinsDisplay.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

    if (window.DeviceOrientationEvent) {
        var velocity = this.hero.body.velocity;
        var heroTiltMove = this.heroTiltMove;
        var self = this;
        window.addEventListener("deviceorientation", function () {
            heroTiltMove(event.alpha, event.beta, event.gamma, velocity, self);
        }, true);
    }

    scoreTitle = game.add.bitmapText(485, 20 , "font", "score", 24);
    scoreTitle.fixedToCamera = true
    scoreTitle.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

    this.scoreDisplay = game.add.bitmapText(490, 45 , "font", score.toString(), 24);
    this.scoreDisplay.fixedToCamera = true
    this.scoreDisplay.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

    coinsTitle = game.add.bitmapText(570, 20, "font", "coins", 24);
    coinsTitle.fixedToCamera = true
    coinsTitle.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

    this.coinsDisplay = game.add.bitmapText(600, 45, "font", coins.toString(), 24);
    this.coinsDisplay.fixedToCamera = true;
    this.coinsDisplay.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
  },

  update: function() {
    this.coinsDisplay.text = coins;
    this.scoreDisplay.text = score;

    background.tilePosition.y += 0.35
    background.position.y = this.camera.y;
    this.world.bringToTop(this.myHealthBar);
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
    this.coins.forEach( function( elem ) {
        this.coinYMin = Math.min( this.coinYMin, elem.y );
        if( elem.y > this.camera.y + this.game.height ) {
            elem.kill();
            this.coinsCreateOne(this.rnd.integerInRange(0,this.world.width -70), this.rnd.integerInRange(this.coinYMin - 100, this.coinYMin - 200), 2 );
        }
   }, this );

    //Coin killer
    this.physics.arcade.overlap(this.hero, this.coins, this.onHeroVsCoin, null, this);

    // hero collisions and movement
    this.physics.arcade.collide( this.hero, this.platforms, this.findPlatformType, null, this );
    this.heroMove();
    score = parseInt(this.hero.body.y - 830) * -1;
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
       if(health < 100){
           health += 4;
       }
       this.sfx.coin.play();
       this.myHealthBar.setPercent(health);
       coins += 1;
       coin.kill()
    },


// PLATFROMS

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
    platform.scale.x = 0.5;
    platform.scale.y = 0.5;
    platform.body.immovable = true;

    if (game.rnd.between(0, 0.5)!= 0){
        platform.loadTexture('form2', 0)
        platform.kind = "double";
        platform.scale.x = 0.5;
        platform.scale.y = 0.5;
    } else {
        platform.kind = "normal";
        platform.loadTexture('pixel', 0)
        platform.scale.x = 0.5;
        platform.scale.y = 0.5;
    }
    return platform;
  },

  findPlatformType: function(hero, platform){
      if (platform.kind == "double" && this.hero.body.touching.down){
          this.hero.body.velocity.y = -2000;
          health -= doubleDecrease;
          this.myHealthBar.setPercent(health);
          this.sfx.double.play();
      } else if (this.hero.body.touching.down){
          this.hero.body.velocity.y = -1000;
          health -= singleDecrease;
          this.myHealthBar.setPercent(health);
      } else {
          this.hero.body.velocity.y = -1100;
      }
  },

  heroCreate: function() {
    // basic hero setup
    this.hero = game.add.sprite( this.world.centerX, this.world.height - 36, 'heroUp' );
    this.hero.scale.setTo(-heroSize, heroSize);
    this.hero.anchor.set( 0.5 );

    // track where the hero started and how much the distance has changed from that point
    this.hero.yOrig = this.hero.y;
    this.hero.yChange = 0;

    // hero collision setup
    // disable all collisions except for down
    this.physics.arcade.enable( this.hero );
    this.hero.body.gravity.y = gravity;
    this.hero.body.velocity.y = -1500;
    this.hero.body.checkCollision.up = false;
    this.hero.body.checkCollision.left = false;
    this.hero.body.checkCollision.right = false;
  },

  heroTiltMove: function(alpha,beta,gamma, velocity, self){
      if (gamma > 0 && self.hero){
          velocity.x = gamma * 15
          self.hero.scale.setTo(heroSize, heroSize);
      }else if (gamma < 0 && self.hero) {
          velocity.x = gamma * 15
          self.hero.scale.setTo(-heroSize, heroSize);
      }
  },

  heroMove: function() {
    // handle the left and right movement of the hero
    if (!deviceCheck.mobile()){
        if( this.cursor.left.isDown ) {
          this.hero.body.velocity.x = -400;
          this.hero.scale.setTo(-heroSize, heroSize);
        } else if( this.cursor.right.isDown ) {
          this.hero.body.velocity.x = 400;
          this.hero.scale.setTo(heroSize, heroSize);
        } else {
          this.hero.body.velocity.x = 0;
        }
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
                this.hero.body.velocity.y = -(600 + 200*swipePowah);
            }else{
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
        this.sfx.die.play();
        this.state.start( 'GameOverScreen' );
    }

    // if the hero falls below the camera view, gameover
    if( this.hero.y > this.cameraYMin + this.game.height && this.hero.alive ) {
      health = 100
      this.sfx.die.play();
      this.state.start( 'GameOverScreen' );
    }
},

  healthUp: function(){
    if (true){
        health += (80 - health)
    }
  },

  jetpack: function(){
    if (true){
        this.physics.arcade.enable( this.hero );
        this.hero.body.gravity = 0;
        var self = this
        setTimeout(function() {
            self.hero.body.gravity = 1500;
        }, 5000);
    }
  },

  mushroom: function(){
    if (true){
        heroSize = 1;
        setTimeout(function() {
            heroSize = 0.2
        }, 5000);
    }
  }
}
