var preload = function(game){};
    preload.prototype = {
        preload: function() {
            var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");
            loadingBar.anchor.setTo(0.5, 0.5);
            game.load.setPreloadSprite(loadingBar);
            game.load.image("background", "assets/sprites/background.png");  //preload background iamge for titlescreen
            game.load.image("title", "assets/sprites/jump_opt.png");  //preload image for titlescreen
            game.load.image("playbutton", "assets/sprites/playbutton2.png"); //preload image for titlescreen
            game.load.image("background3", "assets/sprites/background3.png"); //preload background for playgame
            game.load.image("background2", "assets/sprites/background2.png"); //preload background for game over
            game.load.image("replay", "assets/sprites/replay.png"); //preload replay button
            //game.load.image("backsplash", "assets/sprites/backsplash.png"); //preload image for titlescreen
            //game.load.image("tunnelbg", "assets/sprites/tunnelbg.png"); //preload image for playgame
            //game.load.image("wall", "assets/sprites/wall.png"); //preload image for playgame
            game.load.image("ship", "assets/sprites/ship.png"); //preload image for playgame - spaceship
            game.load.image("smoke", "assets/sprites/smoke.png"); //preload image for ship particles as it flies
            game.load.image("barrier", "assets/sprites/barrier.png"); //preload iamge for barrier
            game.load.image("separator", "assets/sprites/separator.png");
            game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");

        },
        create: function(){
            console.log("preload started");
            game.state.start("TitleScreen");
        }
    }
