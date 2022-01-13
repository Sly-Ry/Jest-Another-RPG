// const { expect } = require('@jest/globals');
// const exp = require('constants');
const { expect } = require('@jest/globals');
const { test } = require('picomatch');
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

test('checks if player is alive or not', () => { 
    const player = new Player('Ryan');

    expect(player.isAlive()).toBeTruthy();
    
    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

// see if the correct amount of health is being subtracted from the Player health property
test("subtracts from the player's health", () => {
    const player = new Player('Ryan');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

// this shows how to create a new test that verifies that a player's attack value is within range
test("gets player's attack value", () => {
    const player = new Player('Ryan');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});