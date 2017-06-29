var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x2a5b84, 0x000000];
var gameoverscreen = function(game){};

var increaseHealth
var textHealth
var countHealth = 10;

var jumpHigher
var textJumpHigher
var countJumpHigher = 20;

var grow
var textGrow
var countGrow = 30;

gameoverscreen.prototype = {
	create: function(){
		this.fx = game.add.audio('sfxcoin')
		this.fx.allowMultiple = true;

		var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backgrounds2");


	    //Display for scores
		var scoreTitle = game.add.bitmapText(game.width/8, 20 , "font", "score", 60);
		var scoreDisplay = game.add.bitmapText(game.width/7+15, 70 , "font", score.toString(), 60);

		scoreTitle.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
		scoreDisplay.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

	    //Display for coins
		var coinsTitle = game.add.bitmapText(420, 20 , "font", "coins", 60);
		var coinsDisplay = game.add.bitmapText(480, 70 , "font", coins.toString(), 60);

		coinsTitle.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
		coinsDisplay.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

<<<<<<< HEAD
	var playButton = game.add.button(game.width / 2, 860, "replay", this.startGame);
	playButton.anchor.set(0.5);
	playButton.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
    playButton.scale.setTo(0.9, 1);
=======
		var playButton = game.add.button(game.width / 2, 880, "replay", this.startGame);
		playButton.anchor.set(0.5);
		playButton.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
>>>>>>> 6eb5fa41d82ae31046a0bc4e61123716f6f01560

		var increaseHealth = game.add.button(100, 300, "increaseHealth", this.updateHealth, this);
		increaseHealth.anchor.set(0.5)
		var increaesHealthTxt = game.add.bitmapText(220, 280 , "font", "Health", 40);
		increaesHealthTxt.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
		game.add.tileSprite(400, 250, 80, 80, "coins");

		var jumpHigher = game.add.button(100, 500, "jumpHigher", this.updateJumpHigher, this);
		jumpHigher.anchor.set(0.5)
		var jumpHigherTxt = game.add.bitmapText(220, 500 , "font", "Springs", 40);
		jumpHigherTxt.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
		game.add.tileSprite(400, 480, 80, 80, "coins");

		var grow = game.add.button(100, 700, "grow", this.updateGrow, this);
		grow.anchor.set(0.5)
		var grow = game.add.bitmapText(220, 700 , "font", "Grow", 40);
		grow.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
		game.add.tileSprite(400, 680, 80, 80, "coins");

		textHealth = game.add.text(500,260, countHealth, {
			font: "65px Arial",
			fill: "#ff0044",
			align: "center"
		});

		textJumpHigher = game.add.text(500,480, countJumpHigher, {
			font: "65px Arial",
			fill: "#ff0044",
			align: "center"
		});

		textGrow = game.add.text(500,690, countGrow, {
			font: "65px Arial",
			fill: "#ff0044",
			align: "center"
		});
	},

	updateHealth: function(){
		if (coins > countHealth) {
				countHealth = Math.round(countHealth * 1.1);
				textHealth.setText(countHealth)
				this.fx.play();
				coins - countHealth;
			}

	},

	updateJumpHigher: function(){
		if (coins > countHealth) {
			countJumpHigher = Math.round(countJumpHigher * 1.1);
			textJumpHigher.setText(countJumpHigher)
			this.fx.play();
			coins-countJumpHigher;
		}
	},

	updateGrow: function(){
		if (coins > countGrow) {
			countGrow = Math.round(countGrow * 1.1);
			textGrow.setText(countGrow)
			this.fx.play();
			coins-countGrow;
		}
	},

	startGame: function() {
		game.state.start("PlayGame");
	}

}
