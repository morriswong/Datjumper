var game;

//playgame
var NUMBER_OF_PLATFORM = 20
var background

var health = 100

var gravity = 1500
var velocityUp = -1500

var coins= 0
var coinsDisplay
var score = 0

var canSwipe = true
var swipeDistance = 200
var swipePowah = 1

var heroSize = 0.2

var doubleDecrease = 10
var singleDecrease = 5

var healthUpCount = 0
var jetpackCount = 0
var mushroomCount = 0

var deviceCheck = new MobileDetect(window.navigator.userAgent);

//gameoverscreen
var increaseHealth
var textHealth
var countHealth = 10;

var jumpHigher
var textJumpHigher
var countJumpHigher = 15;

var grow
var textGrow
var countGrow = 20;

window.onload = function() {
    game = new Phaser.Game( 640,960, Phaser.CANVAS, '' );
	game.state.add("Boot", boot);
	game.state.add("Preload", preload);
	game.state.add("TitleScreen", titlescreen);
	game.state.add("PlayGame", playgame);
	game.state.add("GameOverScreen", gameoverscreen);
	game.state.start("Boot");
};

var boot = function(game){};
boot.prototype = {

    preload: function(){
		game.load.image("loading","assets/sprites/loadingbar2.png");   //loading bar e.g. http://github.hubspot.com/pace/docs/welcome/
        game.load.image("loadingBG", "assets/sprites/backgrounds1.png")
	},

	create: function(){
        // game.load.onLoadStart.add(this.loadStart, this);
        // game.load.onLoadComplete.add(this.loadComplete, this);
        // this.start();

        console.log("loaded image");
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize( true );
		game.state.start("Preload");

	}



}
