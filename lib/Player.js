// if you needed to call an API to help with the creation of your object, you definitely would not want that API logic cluttering up your constructor. It would be better to call the API first, then pass the API data in as arguments.
const Character = require('./Character');
const Potion = require('./Potion');

// Using extends, we were able to tell one class (Player) to inherit all of the methods from another class (Character).
class Player extends Character {
    constructor(name = '') {
        super(name);
        
        this.inventory = [new Potion('health'), new Potion()];
    };
  
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };
  
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };
  
    addPotion(potion) {
        this.inventory.push(potion);
    };
  
    usePotion(index) {
        const potion = this.inventory.splice(index, 1)[0];
    
        switch (potion.name) {
            case 'agility':
            this.agility += potion.value;
            break;
            case 'health':
            this.health += potion.value;
            break;
            case 'strength':
            this.strength += potion.value;
            break;
        }
    };
};

module.exports = Player;