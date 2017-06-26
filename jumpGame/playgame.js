var tunnelWidth = 256;

var playgame = function(game){};

var friendlyBarRatio = 2;

// Barrier class - global variable for new barrier to access
var Barrier = function (game, speed, tintColor) {
	var positions = [(game.width - tunnelWidth) / 2, (game.width + tunnelWidth) / 2];
	var position = game.rnd.between(0, 1);
	Phaser.Sprite.call(this, game, positions[position], -100, "barrier");
	var cropRect = new Phaser.Rectangle(0, 0, tunnelWidth / 2.5, 24);
	this.crop(cropRect);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(position, 0.5);
	this.tint = tintColor;
	this.body.velocity.y = speed;
    this.body.velocity.y = speed;
	this.placeBarrier = true;
    this.body.immovable = true;

    //friendly barrier
    this.anchor.set(position, 0.5);
	this.levelTint = tintColor;
	if(game.rnd.between(0, friendlyBarRatio)!=0){
		this.tint = tintColor;
		this.friendly = false;
	}
	else{
		this.friendly = true;
	}
	this.body.immovable = true;
	this.body.velocity.y = speed;
	this.placeBarrier = true;
};

Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;

//Destorying the barrier once it passes the ship - this allows to save memory
Barrier.prototype.update = function(){

    if(this.placeBarrier && this.y > barrierGap){
		this.placeBarrier = false;
		playgame.prototype.addBarrier(this.parent, this.levelTint);
	}
	if(this.y > game.height){
		this.destroy();
	}
}

//-----------------------------------------------------------------------------------------

    playgame.prototype = {
    	create: function(){
            //creating the wall and the tunnel spacing
    		var tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)]
            //setting score
            score = 0;
    		this.scoreText = game.add.bitmapText(20, game.height - 90 , "font", "0", 48);
    		game.time.events.loop(250, this.updateScore, this);
            //________________________________________________________________________________
    		var tunnelBG = game.add.tileSprite(0, 0, game.width*2, game.height*2, "background3");
			tunnelBG.autoScroll(0,100);
    		// tunnelBG.tint = tintColor;
    		// var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width /2, game.height, "wall");
    		// leftWallBG.tint = tintColor;
    		// var rightWallBG = game.add.tileSprite((game.width + tunnelWidth) / 2, 0, game.width / 2, game.height, "wall");
    		// rightWallBG.tint = tintColor;
    		console.log("playgame started");

            //creating the ship starting position
            this.shipPositions = [(game.width - tunnelWidth) / 2 + 32, (game.width + tunnelWidth) / 2 - 32];
            this.ship = game.add.sprite(this.shipPositions[0], 860, "ship");
            this.ship.side = 0;
            this.ship.anchor.set(0.5);
            this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);

            // creating ship movement from user input
            this.ship.canMove = true;
            game.input.onDown.add(this.moveShip, this);

            // creating the particles that flies out from the ship
            this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y + 10, 20);
    		this.smokeEmitter.makeParticles("smoke");
    		this.smokeEmitter.setXSpeed(-15, 15);
    		this.smokeEmitter.setYSpeed(50, 150);
    		this.smokeEmitter.setAlpha(0.5, 1);
    		this.smokeEmitter.start(false, 1000, 40);

            // moving the ship vertically
            this.verticalTween = game.add.tween(this.ship).to({
	             y: 0
            }, shipVerticalSpeed, Phaser.Easing.Linear.None, true);

            // control the game is played using a swipe or click
            this.ship.canSwipe = false;
    		this.ship.anchor.set(0.5);
    		game.physics.enable(this.ship, Phaser.Physics.ARCADE);
    		game.input.onDown.add(this.moveShip, this);
    		game.input.onUp.add(function(){
    			this.ship.canSwipe = false;
    		}, this);
    		this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y + 10, 20);
    		this.smokeEmitter.makeParticles("smoke");
    		this.smokeEmitter.setXSpeed(-15, 15);
    		this.smokeEmitter.setYSpeed(50, 100);
    		this.smokeEmitter.setAlpha(0.25, 0.75);
    		this.smokeEmitter.start(false, 1000, 50);
    		this.verticalTween = game.add.tween(this.ship).to({
    			y: 0
    		}, shipVerticalSpeed, Phaser.Easing.Linear.None, true);

            //Creating barrier to give the illusion of the arrow is moving
    		this.barrierGroup = game.add.group();
            this.addBarrier(this.barrierGroup, tintColor);

            //new property for the ship
            this.ship.destroyed = false;

            // //set up the score labels on the wall
            // rightWallBG.tint = tintColor;
		    // for(var i = 1; i <= scoreSegments.length; i++){
			//     var leftSeparator = game.add.sprite((game.width - tunnelWidth) / 2, scoreHeight * i, "separator");
			//     leftSeparator.tint = tintColor;
    		// 	leftSeparator.anchor.set(1, 0)
    		// 	var rightSeparator = game.add.sprite((game.width + tunnelWidth) / 2, scoreHeight * i, "separator");
    		// 	rightSeparator.tint = tintColor;
    		// 	var posX = (game.width - tunnelWidth) / 2 - leftSeparator.width / 2;
    		// 	if(i % 2 == 0){
    		// 		posX = (game.width + tunnelWidth) / 2 + leftSeparator.width / 2;
    		// 	}
    		// 	game.add.bitmapText(posX, scoreHeight * (i - 1) + scoreHeight / 2 - 18 , "font", scoreSegments[i - 1].toString(), 36).anchor.x = 0.5;
    		// }
    		// this.shipPositions = [(game.width - tunnelWidth) / 2 + 32, (game.width + tunnelWidth) / 2 - 32];

            //Highlight bar for the score display on the wall
            this.highlightBar = game.add.tileSprite(game.width / 2, 0, tunnelWidth, scoreHeight, "smoke");
    		this.highlightBar.anchor.set(0.5, 0);
    		this.highlightBar.alpha = 0.1;
    		this.highlightBar.visible = false;


    	},

    //new method to control movement of ship
        moveShip: function(){
        	if(this.ship.canMove){
        		this.ship.canMove = false;
        		this.ship.side = 1 - this.ship.side;
        		var horizontalTween = game.add.tween(this.ship).to({
        			x: this.shipPositions[this.ship.side]
        		}, shipHorizontalSpeed, Phaser.Easing.Linear.None, true);
        		horizontalTween.onComplete.add(function(){
        			game.time.events.add(shipMoveDelay, function(){
        				this.ship.canMove = true;
        			}, this);
        		}, this);
        	}
            //Ghost ship to fade the image of ship's movements
            var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship");
            ghostShip.alpha = 0.5;
            ghostShip.anchor.set(0.5);
            var ghostTween = game.add.tween(ghostShip).to({
            	alpha: 0
            }, 350, Phaser.Easing.Linear.None, true);
            ghostTween.onComplete.add(function(){
            	ghostShip.destroy();
            });

            //moving the ship by clicking or swipping
            this.ship.canSwipe = true;
		    if(this.ship.canMove){
			    this.ship.canMove = false;
			    this.ship.side = 1 - this.ship.side;
			    var horizontalTween = game.add.tween(this.ship).to({
				    x: this.shipPositions[this.ship.side]
			    }, shipHorizontalSpeed, Phaser.Easing.Linear.None, true);
			    horizontalTween.onComplete.add(function(){
				    game.time.events.add(shipMoveDelay, function(){
					this.ship.canMove = true;
				}, this);
			    }, this);

			    var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship");
    			ghostShip.alpha = 0.5;
    			ghostShip.anchor.set(0.5);
    			var ghostTween = game.add.tween(ghostShip).to({
    				alpha: 0
    			}, 350, Phaser.Easing.Linear.None, true);
    			ghostTween.onComplete.add(function(){
    				ghostShip.destroy();
    			});
		    }
        },

        //method to let the particles follow the ship movements
        update: function(){
            //moving the ship by clicking or swipping
            this.smokeEmitter.x = this.ship.x;
		    this.smokeEmitter.y = this.ship.y;
		    if(this.ship.canSwipe){
			    if(Phaser.Point.distance(game.input.activePointer.positionDown,
				game.input.activePointer.position) > swipeDistance){
					this.restartShip();
			    }
		    }

            //check for collision
            if(!this.ship.destroyed && this.ship.alpha == 1){
                    if(this.ship.y < scoreHeight * scoreSegments.length){
            			this.highlightBar.visible = true;
            			var row = Math.floor(this.ship.y / scoreHeight);
            			this.highlightBar.y = row * scoreHeight;
                    }
            	    game.physics.arcade.collide(this.ship, this.barrierGroup, function(s, b){
                        if(!b.friendly){
                            this.highlightBar.visible = false;
                    		this.ship.destroyed = true
                    		this.smokeEmitter.destroy();
                    		var destroyTween = game.add.tween(this.ship).to({
                    			x: this.ship.x + game.rnd.between(-100, 100),
                    			y: this.ship.y - 100,
                    			rotation: 10
                    		}, 1000, Phaser.Easing.Linear.None, true);
                    		destroyTween.onComplete.add(function(){
                    			var explosionEmitter = game.add.emitter(this.ship.x,
                    				this.ship.y, 200);
                    			explosionEmitter.makeParticles("smoke");
                    			explosionEmitter.setAlpha(0.5, 1);
                    			explosionEmitter.minParticleScale = 0.5;
                    			explosionEmitter.maxParticleScale = 2;
                    			explosionEmitter.start(true, 2000, null, 200);
                    			this.ship.destroy();

                                //start the gameoverscreen
                                this.ship.destroy();
                                game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                                	game.state.start("GameOverScreen");
                                });
                    		}, this);
                        }
                        else{
                			if(b.alpha == 1){
                				var barrierTween = game.add.tween(b).to({
                				alpha:0
                				}, 200, Phaser.Easing.Bounce.Out, true);
                				if(this.ship.y < scoreHeight * scoreSegments.length){
                					var row = Math.floor(this.ship.y / scoreHeight);
                					score += scoreSegments[row] * 5;
                					this.scoreText.text = score.toString();
                				}
                			}
                		}
            	}, null, this)
            }
        },

        //moving the ship by clicking or swipping
        restartShip: function(){
            this.highlightBar.visible = false;
            if(!this.ship.destroyed && this.ship.alpha == 1){
		        barrierSpeed *= barrierIncreaseSpeed;
		           for(var i = 0; i < this.barrierGroup.length; i++){
			       this.barrierGroup.getChildAt(i).body.velocity.y = barrierSpeed;
		           }
		    this.ship.canSwipe = false;
            }
            this.ship.canSwipe = false;
            this.verticalTween.stop();
            this.ship.alpha = 0.5;
            this.verticalTween = game.add.tween(this.ship).to({
                y: 860
            }, 100, Phaser.Easing.Linear.None, true);
            this.verticalTween.onComplete.add(function(){
                this.verticalTween = game.add.tween(this.ship).to({
                y: 0
                }, shipVerticalSpeed, Phaser.Easing.Linear.None, true);
                var alphaTween = game.add.tween(this.ship).to({
    			    alpha: 1
    		    }, shipInvisibilityTime, Phaser.Easing.Bounce.In, true)
                }, this)
        },

        //add a barrier using the delcared global variable on game.js
        addBarrier: function(group, tintColor){
        	var barrier = new Barrier(game, barrierSpeed, tintColor);
        	game.add.existing(barrier);
        	group.add(barrier);
        },

        updateScore: function(){
    	if(this.ship.alpha == 1 && !this.ship.destroyed){
    		if(this.ship.y < scoreHeight * scoreSegments.length){
    			var row = Math.floor(this.ship.y / scoreHeight);
    			score += scoreSegments[row];
    			this.scoreText.text = score.toString();
    		}
    	}
}









    }
