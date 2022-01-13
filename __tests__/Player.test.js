const { expect } = require('@jest/globals');
const { exp } = require('prelude-ls');
const Player = require('../lib/Player');

test('creates a player object', () => {
    const player = new Player('Ryan');

    expect(player.name).toBe('Ryan');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test("gets player's stats as an object", () => {
    const player = new Player('Ryan');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');    
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Ryan');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test("get player's health value", () => {
    const player = new Player('Ryan');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});
