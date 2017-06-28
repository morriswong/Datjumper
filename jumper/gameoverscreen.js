var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x2a5b84, 0x000000];
var gameoverscreen = function(game){};

gameoverscreen.prototype = {
create: function(){

	var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backgrounds2");
	//titleBG.tint = 0xFFFFFF;

    //Display for scores
	var scoreTitle = game.add.bitmapText(game.width/8, 20 , "font", "score", 60);
	var scoreDisplay = game.add.bitmapText(game.width/7+15, 70 , "font", score.toString(), 60);

	scoreTitle.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
	scoreDisplay.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

    //Display for Jumps
	var coinsTitle = game.add.bitmapText(420, 20 , "font", "coins", 60);
	var coinsDisplay = game.add.bitmapText(487.5, 70 , "font", coins.toString(), 60);

	coinsTitle.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
	coinsDisplay.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

	var playButton = game.add.button(game.width / 2, 880, "replay", this.startGame);
	playButton.anchor.set(0.5);
	playButton.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

	var increaseHealth = game.add.button(100, 300, "increaseHealth", this.startGame);
	increaseHealth.anchor.set(0.5)
	var increaesHealthTxt = game.add.bitmapText(220, 280 , "font", "Health", 40);
	increaesHealthTxt.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

	var jumpHigher = game.add.button(100, 500, "jumpHigher", this.startGame);
	jumpHigher.anchor.set(0.5)
	var jumpHigherTxt = game.add.bitmapText(220, 500 , "font", "Springs", 40);
	jumpHigherTxt.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

	var grow = game.add.button(100, 700, "grow", this.startGame);
	grow.anchor.set(0.5)
	var grow = game.add.bitmapText(220, 700 , "font", "Grow", 40);
	grow.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
	},

	startGame: function(){
		game.state.start("PlayGame");
	}
}
