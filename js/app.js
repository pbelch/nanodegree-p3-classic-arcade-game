// Enemies our player must avoid
var Enemy = function(x,y) 
	{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
	//Set image and starting position and speed for enemies
	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.speed = 80;	
	}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) 
	{
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	//Check if enemy is still on screen, else reset for right hand side re-entry
	if(this.x < 500)
		{
        this.x = this.x + this.speed * dt;
		}
		else
		{
		//Resets enemy position to edge of screen once x exceeds board limits
		this.x = -5;
		}
	//Logic to check on player location against enemy
    if(player.x > this.x - 50 && player.x < this.x + 50)
		{
		//Second if without escape to check both X and Y co-ordinates
		if(player.y > this.y - 50 && player.y < this.y + 50)
			{
			//Actions that only apply is both x and Y within 50
			//this.reset();
			player.x = 10;
			player.y = 400;
			alert("Unlucky, you just got squashed by a bug! Nice change that it's the other way round mind!");
			}   	
		}
	}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() 
	{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player Class
var Player = function()
	{
    this.sprite = 'images/char-boy.png';
    this.x = 10;
    this.y = 400;
	}

//Player Update
Player.prototype.update = function(){
    //React to keyboard press check if at the edge of the board
    //Nested IF's to ensure clean exit before next button press
	
	//Move Up
	if(this.ctlKey === 'up')
		{
        this.y = this.y - 50;
		}
	//Move Down
	else if (this.ctlKey === 'down' && this.y != 400)
		{
		this.y = this.y + 50;
		}
	//Move Left
	//Set to 10 as experienced issues where player was loosing without ever seeing the bug enter the screen
	else if(this.ctlKey === 'left' && this.x > 10)
		{ 
        this.x = this.x - 50;
		}
    //Move Right
	else if(this.ctlKey === 'right' && this.x <= 400)
		{
        this.x = this.x + 50;
		}
    //makes next action after move to be stop moving, by setting unallocated key 
	this.ctlKey = null;

	//Final win check each move and reset
	if(this.y < 0)
		{
		player.x = 10;
		player.y = 400;
		alert("Made it to the sea! Success!");
		}
	}
   
	//Player Render
	Player.prototype.render = function() 
	{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	//Player Input handler
	Player.prototype.handleInput = function(keyin)
	{
    this.ctlKey = keyin;    
	}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies = 
	[
	new Enemy(-5, 60),
	new Enemy(100, 60),
	new Enemy(60, 140),
	new Enemy(400, 140),
	new Enemy(200,230),
	new Enemy(-5, 230)
	];

// Place the player object in a variable called player
var player = new Player(); 

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
