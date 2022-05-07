const Potion = require('../lib/Potion')

function Player(name = '') {
    this.name = name
    
    this.health = Math.floor(Math.random() * 10 + 95)
    this.strength = Math.floor(Math.random() * 5 + 7)
    this.agility = Math.floor(Math.random() * 5 + 7)

    this.inventory = [new Potion('health'), new Potion()]
    
}

//returns a string showing the players health
Player.prototype.getHealth = function() {
    return `${this.name}'s health is now at ${this.health}`
}

//returns an object with various player properties
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    }
}

Player.prototype.getInventory = function () {
    if (this.inventory.length) {
        return this.inventory
    }
    return false
}

//checks to see if player is alive by checking the obj health property
Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false
    }
    return true
}

//reduces the players health by subtracting the health property from the obj by enemy atk
Player.prototype.reduceHealth = function(health) {
    this.health -= health

    if (this.health < 0) {
        this.health = 0
    }
}

//sets the attack value by setting a min and max by sub and adding 5 to player strength in that order
//then calculates a random value using min and max and returns it
Player.prototype.getAttackValue = function() {
    const min = this.strength - 5
    const max = this.strength + 5

    return Math.floor(Math.random() * (max - min) + min)
}

//pushes a potion to the player obj inventory arr
Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion)
}

//potion is being set to the "new Potion()" using getInventory() to take the player inventory arr and
//then using a splice() to choose the index of 1 and setting it in a new arr 
Player.prototype.usePotion = function(index) {
    const potion = this.getInventory().splice(index, 1)[0]

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value
            break
        case 'health':
            this.health += potion.value
            break
        case 'strength':
            this.strength += potion.value
            break
    }
}


module.exports = Player