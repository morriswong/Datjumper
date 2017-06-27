var preload = function(game){};

preload.prototype = {
    preload: function(){
        game.load.image("loading","assets/sprites/loading.png");
		var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
		loadingBar.anchor.setTo(0.5,0.5);
		game.load.setPreloadSprite(loadingBar);
        game.load.image("title", "assets/sprites/title.png");
        game.load.image("playbutton", "assets/sprites/playbutton.png");
        game.load.image("backsplash", "assets/sprites/backsplash.png");
        game.load.image("tunnelbg", "assets/sprites/tunnelbg.png");
        game.load.image("wall", "assets/sprites/wall.png");
        game.load.image("ship", "assets/sprites/ship.png");
        game.load.image("smoke", "assets/sprites/smoke.png");
        game.load.image("barrier", "assets/sprites/barrier.png")
        game.load.image("separator", "assets/sprites/separator.png");
        game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
    },

	create: function(){
		console.log("preload started");
        game.state.start("Title");
	}
}
