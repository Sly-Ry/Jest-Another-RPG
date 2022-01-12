// if you needed to call an API to help with the creation of your object, you definitely would not want that API logic cluttering up your constructor. It would be better to call the API first, then pass the API data in as arguments.
const Potion = require('../lib/Potion');

function Player(name = '') {
    this.name = name;
    this.inventory = [new Potion('health'), new Potion()];

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
}

module.exports = Player;