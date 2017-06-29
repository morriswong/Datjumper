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
		game.load.image("loading","assets/sprites/loading.png");   //loading bar e.g. http://github.hubspot.com/pace/docs/welcome/
	},

	create: function(){
        console.log("loaded image");
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize( true );
        var myContext = window.addEventListener('touchstart', function() {

            // create new buffer source for playback with an already
            // loaded and decoded empty sound file
            var source = myContext.createBufferSource();
            source.buffer = myDecodedBuffer;

            // connect to output (your speakers)
            source.connect(myContext.destination);

            // play the file
            source.noteOn(0);

        }, false);
		game.state.start("Preload");

	}
}
