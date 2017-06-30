var bgColors = [0xF16745, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x2a5b84, 0x000000];
var gameoverscreen = function(game){};

var increaseHealth
var textHealth
var costHealth = 10;

var jumpHigher
var textJumpHigher
var costJumpHigher = 15;

var grow
var textGrow
var costGrow = 20;

gameoverscreen.prototype = {
	create: function(){
		this.fx = game.add.audio('sfxcoin')
		this.fx.allowMultiple = true;

		var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "backgrounds3");

	    //Display for total scores
		var scoreTitle = game.add.bitmapText(game.width/8, 30 , "font", "score", 60);
		var scoreDisplay = game.add.bitmapText(game.width/7+15, 100 , "font", score.toString(), 60);
		scoreTitle.tint = 0xffa100;
		scoreDisplay.tint = 0xffa100;

	    //Display for total coins
		var coinsTitle = game.add.bitmapText(420, 30 , "font", "coins", 60);
		this.coinsDisplay = game.add.bitmapText(480, 100 , "font", coins.toString(), 60);
		coinsTitle.tint = 0xF9DC00;
		this.coinsDisplay.tint = 0xF9DC00;

        //Display for power ups
		var increaseHealth = game.add.button(100, 330, "increaseHealth", this.updateHealth, this);
		increaseHealth.anchor.set(0.5)
		var increaesHealthTxt = game.add.bitmapText(220, 310 , "font", "Health", 40);
		increaesHealthTxt.tint = 0xFFFFFF;
        game.add.button(520, 280, "coins", this.updateHealth, this);
        this.textHealth = game.add.bitmapText(420, 290 , "font", costHealth.toString(), 65);

		var jumpHigher = game.add.button(100, 550, "jumpHigher", this.updateJumpHigher, this);
		jumpHigher.anchor.set(0.5)
		var jumpHigherTxt = game.add.bitmapText(220, 530 , "font", "Jetpack", 40);
		jumpHigherTxt.tint = 0xFFFFFF;
        game.add.button(520, 510, "coins", this.updateJumpHigher, this);
        this.textJumpHigher = game.add.bitmapText(420, 510 , "font", costJumpHigher.toString(), 65);

		var grow = game.add.button(100, 730, "grow", this.updateGrow, this);
		grow.anchor.set(0.5)
		var grow = game.add.bitmapText(220, 740 , "font", "Grow", 40);
		grow.tint = 0xFFFFFF;
        game.add.button(520, 710, "coins", this.updateGrow, this);
        this.textGrow = game.add.bitmapText(420, 720 , "font", costGrow.toString(), 65);

        var ggText = game.add.bitmapText(60, 190 , "font", "Buy power ups to jump higher!", 35);

        var playButton = game.add.button(game.width / 2, 880, "replay", this.startGame);
        // var playText = game.add.bitmapText(230, 780 , "font", "Play again", 35);
		playButton.anchor.set(0.5);
        playButton.scale.setTo(0.9, 1)
	},

	update: function() {
		this.coinsDisplay.text = coins;

        this.textHealth.text = costHealth;
        this.textJumpHigher.text = costJumpHigher;
        this.textGrow.text = costGrow;
	},

	updateHealth: function(){
		if (coins >= costHealth) {
			// textHealth.setText(costHealth)
			this.fx.play();
			coins = coins - costHealth;
			costHealth = Math.round(costHealth * 1.1);
            healthUpCount += 1;
		}
	},

	updateJumpHigher: function(){
		if (coins >= costJumpHigher) {
			// textJumpHigher.setText(costJumpHigher)
			this.fx.play();
			coins = coins - costJumpHigher;
			costJumpHigher = Math.round(costJumpHigher * 1.1);
            jetpackCount += 1;
		}
	},

	updateGrow: function(){
		if (coins >= costGrow) {
			// textGrow.setText(costGrow)
			this.fx.play();
			coins = coins - costGrow;
			costGrow = Math.round(costGrow * 1.1);
            mushroomCount += 1;
		}
	},

	startGame: function() {
		game.state.start("PlayGame");
	}

}
