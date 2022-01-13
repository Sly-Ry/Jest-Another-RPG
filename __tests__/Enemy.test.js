const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

test('creates an enemy object', () => {
    const enemy = new Enemy('demon', 'sword');

    expect(enemy.name).toBe('demon');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});