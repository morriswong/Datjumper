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
		this.coinsDisplay = game.add.bitmapText(480, 70 , "font", coins.toString(), 60);

		coinsTitle.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
		this.coinsDisplay.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

		var playButton = game.add.button(game.width / 2, 880, "replay", this.startGame);
		playButton.anchor.set(0.5);
		playButton.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];

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

	update: function() {
		this.coinsDisplay.text = coins;
	},

	updateHealth: function(){
		if (coins >= countHealth) {
				textHealth.setText(countHealth)
				this.fx.play();
				coins = coins - countHealth;
				countHealth = Math.round(countHealth * 1.1);
			}

	},

	updateJumpHigher: function(){
		if (coins >= countJumpHigher) {
			textJumpHigher.setText(countJumpHigher)
			this.fx.play();
			coins = coins - countJumpHigher;
			countJumpHigher = Math.round(countJumpHigher * 1.1);
		}
	},

	updateGrow: function(){
		if (coins >= countGrow) {
			textGrow.setText(countGrow)
			this.fx.play();
			coins = coins - countGrow;
			countGrow = Math.round(countGrow * 1.1);
		}
	},

	startGame: function() {
		game.state.start("PlayGame");
	}

}
