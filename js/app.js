/*This javascript file has Enemy and Player Classes defined. Also their objects are
  instantiated respectively */
//Enemy Class Declaration
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    //the y coordiante and speed are randomized using the functions randomY() and randomSpeed()
    this.y = this.randomY();
    this.speed = this.randomSpeed();
};

/*The random functions - randomy(), randomSpeed() choose a random number from the array. These functions will help
making enemy movements less predictable.*/

Enemy.prototype.randomY = function(){
    var yPosition = [70, 140, 210];
    var y = yPosition[(Math.floor(Math.random() * yPosition.length))];
    return y;

};

Enemy.prototype.randomSpeed = function(){
    var enemySpeeds = [300, 400, 350, 250];
    var speed = enemySpeeds[(Math.floor(Math.random() * enemySpeeds.length))] - 100;
    return speed;

};

/* The enemy class prototype fuction : update is used to animate enemies across the screen
 and reset the enemy once it crosses the screen */
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
        this.enemyReset();
    }
};

// This function resets the enemy coordinates the speed once the enemy crosses the width of the screen
Enemy.prototype.enemyReset = function() {
    this.x = 0;
    this.y = this.randomY();
    this.speed = this.randomSpeed();
};

//This fuction draws the enemy on the screen using the enemy .png file and coordinates
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player Class Declaration
var Player = function() {
    this.x = 200;
    this.y = 420;
    this.sprite = 'images/char-cat-girl.png';
};

/*This fuction checks the postion of the player to see if the player collided with enemy or
  reached the water line successfully and resets the game if any of the conditions are true */
Player.prototype.update = function(dt) {
    if (this.checkCollisions(player, allEnemies) === true) {
        this.gameReset();
        alert("You Lost!");
    }
    if (this.y < 10) {
        this.gameReset();
        alert("You Won!");
    }
};

/*This fuction checks if the player collieded with any of the enemies if the player collieded true is retured to
  update function else false is returned. */
Player.prototype.checkCollisions = function(player, allEnemies) {
    var arrayLen = allEnemies.length;
    for (var i = 0; i < arrayLen ; i++) {
        if (
            (Math.abs(player.x - allEnemies[i].x) < 50) &&
            (Math.abs(player.y - allEnemies[i].y) < 50)
        ) {
            return true;
        }
    }
    return false;
};

// This function resets the player to the starting coordinates.
Player.prototype.gameReset = function() {

    this.x = 200;
    this.y = 420;
};

//This function draws the player on the screen
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This event listener waits for keyboard input form the user to move the player on the screen
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//This function is called by eventlistener which inturn handles diffrent types of input from the user to move the player
Player.prototype.handleInput = function(keys) {
    var xMovement = 85;
    var yMovement = 70;
    switch (keys) {
        case 'left':
            if ((this.x - xMovement) > 0) {
                this.x = this.x - xMovement
            }
            break;

        case 'right':
            if ((this.x + xMovement) < 400) {
                this.x = this.x + xMovement;
            }
            break;
        case 'up':
            if ((this.y - 65) > 0) {
                this.y = this.y - yMovement;
            }
            break;
        case 'down':
            if ((this.y + 65) < 420) {
                this.y = this.y + yMovement;
            }
            break;
    }
};

// Objects are declared for the Enemy class
var enemy = new Enemy();
var enemytwo = new Enemy();
var enemythree = new Enemy();
var enemyfour = new Enemy();

//All the enemy objects are stored into an array
var allEnemies = new Array();
allEnemies.push(enemy, enemytwo, enemythree, enemyfour);

//Object declared for the Player Class
var player = new Player();