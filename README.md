# Phaser game project - Jump!
Link: http://datjumper.surge.sh/

# Gameplay
Jump! is an endless plaform game. It can be played on a computer or a mobile device. 

In the game, the hero jumps upwards from platform to platform to collect coins. The hero’s energy is indicated by the energy bar. The hero uses energy on each jump and replenishes energy by collecting coins. The hero survives and the game goes on as long as: 
1) the hero doesn’t fall out of the screen and 
2) the energy bar hasn’t been emptied. 
Score increases with respect to the height that the hero survives and the coins collected. Power-up items can be purchased after each game with coins accumulated in previous games and be used in the game for special powers.

The goal of the game is to survive for as long as possible and for players to have fun!

# Game rationale
To create the effect that the hero is jumping upwards, we have made use of Phaser’s built-in physics engine so that the hero moves and stays only on the lower half of the screen. Meanwhile, the environment around the hero moves downwards according to the hero’s interaction with the barrier sprites. Power-up items give hero special powers which adds fun to the game.

## About the Sprites
### 1. The hero has the ability to:
- jump upwards
- bounce upwards when it lands on a big platform
- bounce upwards twice as high when it lands on a small platform
- collect coins and increase coin count
- increase scores as the game goes on
- use special items purchased with coins collected for special powers

### 2. Other sprites and their effects on collision with hero:
#### a. Barrier sprites:
- Big platform \- Hero jumps upwards
- Small platform \-Hero jumps upwards twice as high
#### b. Reward sprites:
- Coins \- Increase coin count 
### 3. Scoring sprites (on game screen):
- Energy bar (top left) \- increases or decreases depending on the hero’s jumps and coin collection
- Scores (top middle) \- increases with time of the game and coin collection
- Coin count (top right) \- increases with coin collection

### 4. Power-up items (can be purchased at the end of the game and be used in game by tapping on them): 
- Health \- Increases hero’s energy
- Jetpack \- Jumping boost for five second
- Mushroom \- Increases hero’s size

## The game is over when:
- The hero falls below the screen view
- The hero’s energy runs out

## Game control:
### 1. On the computer:
- Use arrows to move left and right
### 2. On mobile devices:
- Tilt device left and right

# States included in the game and their functionalities
## 1. game.js
- Game boots
## 2. preload.js
- Images and audios load into the game
- Game loads
- Loading bar and percentage loaded to show that the game is loading
## 3. titlescreen.js
- Shows the name of the game
- There is a “play” button that leads to the game screen
## 4. playgame.js
- Game starts
- The game instruction is shows on screen temporarily
- The hero jumps and interacts with other sprites. It can jump through one side of the screen to go to the other side
- Sprites except the hero are randomly generated on the screen, and destroyed when they have moved out of the screen
- The sky background tiles moves along the game
## 5. gameoverscreen.js
- Score is recorded
- Coin count is recorded
- Power-ups can be purchased with coins
- There is “play again” button that restarts the game

# Resources used
- Javascript library: Phaser
- Music and images downloaded from the Internet and some images adapted
- Gyroscope of the mobile device for the tilt

# Authors 
### Developers:
Perry Luo (Github:PerryLuo), Miguel Suay (Github:MiguelSuay), Morris Wong (Github:morriswong)
### Technical writer:
Corah Chiu (Github:corahchiu)

# Credits
### Music credits

### Image credits
