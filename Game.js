var game;

var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a, 0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];   //delete this<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

var shipHorizontalSpeed = 100;
var shipMoveDelay = 0;

var shipVerticalSpeed = 15000;

var swipeDistance = 10;    //this is to distinguish a swipe from a click

var barrierSpeed = 280;

var barrierGap = 120;  //creating more barriers

var shipInvisibilityTime = 1000;

var barrierIncreaseSpeed = 2;

var scoreHeight = 100;
var scoreSegments = [100, 50, 25, 10, 5, 2, 1];

var score


//________________________________________________________________________________

window.onload = function() {
    game = new Phaser.Game(640, 960);
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
		this.game.load.image("loading","assets/sprites/loading.png");   //loading bar e.g. http://github.hubspot.com/pace/docs/welcome/
	},
	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.state.start("Preload");

	}
}
