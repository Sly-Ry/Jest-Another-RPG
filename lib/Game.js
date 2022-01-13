const inquirer = require('inquirer');
const Enemy = require ('./Enemy');
const Player = require ('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

Game.prototype.initializeGame = function(){
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name, commander?'
        })
        // destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            this.startNewBattle();
        })
};


Game.prototype.startNewBattle = function() {
    // Establish who will take their turn first based on their agility values.
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    }
    else {
        this.isPlayerTurn = false;
    }

    // Display the Player object's stats.
    console.log('Your stats are as followed:');
    console.table(this.player.getStats());

    // Display the description of the current Enemy.
    console.log(this.currentEnemy.getDescription());

    this.battle();
};



module.exports = Game;