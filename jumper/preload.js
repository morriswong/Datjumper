var preload = function(game){};

preload.prototype = {
    preload: function(){
        // game.load.image("loading","assets/sprites/loading.png");
		var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
		loadingBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(loadingBar);
        game.load.image("background", "assets/sprites/background.png");  //preload background iamge for titlescreen
        game.load.image("title", "assets/sprites/jump_opt.png");  //preload image for titlescreen
        game.load.image("playbutton", "assets/sprites/playbutton2.png"); //preload image for titlescreen
        game.load.image("background3", "assets/sprites/background3.png"); //preload background for playgame
        game.load.image("background2", "assets/sprites/background2.png"); //preload background for game over
        game.load.image("replay", "assets/sprites/replay.png"); //preload replay button
        game.load.image("separator", "assets/sprites/separator.png");
        game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");

        game.load.image( 'heroUp', 'assets/sprites/frame_right.png' );
        game.load.image( 'heroDown', 'assets/sprites/frameFall.png' );
        game.load.spritesheet('coin', 'assets/sprites/coin_spritesheet.png', 22, 22);
        game.load.audio('sfxcoin', 'assets/audio/coin.wav');
        game.load.audio('sfxdouble', 'assets/audio/doubleJump.wav');
        game.load.image( 'pixel', 'https://raw.githubusercontent.com/photonstorm/phaser-coding-tips/master/issue-003/assets/platform.png' );
        game.load.image( 'form2', 'https://raw.githubusercontent.com/photonstorm/phaser-coding-tips/master/issue-003/assets/ice-platform.png')
    },

	create: function(){
		console.log("preload started");
        game.state.start("TitleScreen");
	}
}
