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
    this.enemies.push(new Enemy('demon', 'big ass sword'));
    this.enemies.push(new Enemy('possessed orc', 'hostage'));
    this.enemies.push(new Enemy('skeleton', 'cursed halberd'));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name, hero?'
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

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        inquirer
            // Prompt user to attack or use a Potion
            .prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                // If using a Potion:
                if (action === 'Use potion') {
                    if(!this.player.getInventory()) {
                        console.log("You don't have any potions, hero!");
                        return;
                    }
                
                    //  Display list of Potion objects to user 
                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'action',
                            message: 'Which potion would you like to use?',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            // Apply selected Potion effect to Player
                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetail[1]} potion.`);
                        })

                }
                // If attacking:
                else { 
                    // Subtract health from the Enemy based on Player attack value
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
    }
    // If Enemy turn: 
    else {
        // Subtract health from the Player based on Enemy attack value
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};

Game.prototype.checkEndOfBattle = function() {
    if (this.isPlayerTurn) {
        inquirer
        .prompt()
        .then(({ action }) => {
            if (action === 'Use potion') {
                if (!this.player.getInventory()) {
                    // after player sees their empty inventory...

                    return this.checkEndOfBattle();
                }

                inquirer
                    .prompt()
                    .then(({ action }) => {
                        // after player uses a potion...

                        this.checkEndOfBattle();
                    });
            }
            else {
                // after player attacks...

                this.checkEndOfBattle();
            }
        });
    }
    else {
        // after anemy attack...

        this.checkEndOfBattle();
    }

    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    // The next thing that might happen is that the Player is still alive but the Enemy has been defeated. If this is the case, the Player is awarded a Potion, and the roundNumber increases. However, it's possible there are no more enemies to fight, in which case the Player has won the overall game. Otherwise, a new battle should start.
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        }
        else {
            console.log('You win!');
        }
    }
    else {
        console.log("You've been defeated!");
    }
};

module.exports = Game;