var barrierSpeed = 280;
var savedbarrierSpeed = 280;


var gameoverscreen = function(game){};
gameoverscreen.prototype = {
create: function(){
    barrierSpeed = savedbarrierSpeed;
	var titleBG = game.add.tileSprite(0, 0, game.width, game.height, "background2");
	titleBG.tint = bgColors[game.rnd.between(0, bgColors.length - 1)];
	game.add.bitmapText(game.width / 2, 50 , "font", "Your score", 48).anchor.x = 0.5;
	game.add.bitmapText(game.width / 2, 150 , "font", score.toString(), 72).anchor.x = 0.5;
	var playButton = game.add.button(game.width / 2, game.height - 450, "replay", this.startGame);
	playButton.anchor.set(0.5);
	var tween = game.add.tween(playButton).to({
		width: 120,
		height:120
	}, 1200, "Linear", true, 0, -1);
	tween.yoyo(true);
	},
	startGame: function(){
		game.state.start("PlayGame");
	}
}
