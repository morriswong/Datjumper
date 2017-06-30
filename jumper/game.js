var game;

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
