var titlescreen = function(game){};


titlescreen.prototype = {
	create: function(){
        gameplay = game.add.audio('sfxgameplay')
        gameplay.loop = true;
        gameplay.play();
        gameplay.onLoop.add(function(){
            gameplay.play();
        }, this);
        //Set Interval loop
        // gameplay.loopFull(0.8);

        this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setScreenSize( true );

        var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "background");
		var title = game.add.image(game.width / 2, 275, "title");
		title.anchor.set(0.5,0);
		var tween = game.add.tween(title).to({
			width: 550,
			height:250
		}, 850, "Linear", true, 0, -1);
		tween.yoyo(true);
		//console.log("titlescreen started");

		var playButton = game.add.button(game.width / 2, game.height - 300, "playbutton", this.startGame);
		playButton.anchor.set(0.5);
	},

	startGame: function(){
		console.log("playButton pressed");
        game.state.start("PlayGame")
	}
}
