// Constructor functions act like blueprints for objects.

function Potion(name) {
    this.type = ['strength','agility', 'health'];
    this.name = name || this.type[Math.floor(Math.random() * this.types.length)];

    if (this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    }
    else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

module.exports = Potion