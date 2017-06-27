var titlescreen = function(game){};
titlescreen.prototype = {
	create: function(){
        this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setScreenSize( true );

        var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "background");

		var title = game.add.image(game.width / 2, 75, "title");
		title.anchor.set(0.5,0);

		var playButton = game.add.button(game.width / 2, game.height - 400, "playbutton", this.startGame);
		playButton.anchor.set(0.5);
        var tween = game.add.tween(playButton).to({
			width: 350,
			height:150
		}, 800, "Linear", true, 0, -1);
		tween.yoyo(true);
		console.log("titlescreen started");
	},
	startGame: function(){
		console.log("playButton pressed");
        game.state.start("PlayGame")
	}
}
