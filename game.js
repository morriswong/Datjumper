var game;

window.onload = function() {
    game = new Phaser.Game( 640,960, Phaser.CANVAS, '' );
	game.state.add("Boot", boot);
	game.state.add("Preload", preload);
	game.state.add("TitleScreen", titlescreen);
	game.state.add("PlayGame", playgame);
    // game.state.add( 'Play', Jumper.Play );
	game.state.add("GameOverScreen", gameoverscreen);
	game.state.start("Boot");
    game.state.start("Preload");
};


var boot = function(game){};
boot.prototype = {
	preload: function(){
		game.load.image("loading","assets/sprites/jump_opt.png");   //loading bar e.g. http://github.hubspot.com/pace/docs/welcome/
	},
	create: function(){
        // this.scale.pageAlignHorizontally = true;
        // this.scale.pageAlignVertically = true;
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize( true );
		game.state.start("Preload");

	}
}
