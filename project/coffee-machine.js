// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

let coffeeMachine = {
    supplies: {water: 400, milk: 540, beans: 120, cups: 9, money: 550},
    flavors: {
        espresso: {water: 250, milk: 0, beans: 16, cups: 1, money: 4},
        latte: {water: 350, milk: 75, beans: 20, cups: 1, money: 7},
        cappuccino: {water: 200, milk: 100, beans: 12, cups: 1, money: 6}
        },
    coffeeType: {1: "espresso", 2: "latte", 3: "cappuccino"},
    units: {water: `mL of water`, milk: `mL of milk`, beans: `grams of coffee beans`, cups: `disposable cups`},
    properNames: {water: `water`, milk: `milk`, beans: `coffee beans`, cups: `disposable cups`, money: `money`},

        status: function () {
        console.log(`The coffee machine has:
        ${this.supplies.water} ml of water
        ${this.supplies.milk} ml of milk
        ${this.supplies.beans} g of coffee beans
        ${this.supplies.cups} disposable cups
        $${this.supplies.money} of money`);
        },

    checkSupplies: function (availableSupplies, selection) {
        if (!selection) {
            return false;
        }
        let missingSupplies = [];
        let isSufficient = true;

        for (let key in availableSupplies) {
            if (key in selection) {
                if (availableSupplies[key] < selection[key]) {
                        isSufficient = false;
                        missingSupplies.push(key);
                }
            }
        }

        if (isSufficient) {
            console.log("I have enough resources, making you a coffee!");
        } else {
            console.log(`Sorry, not enough ${missingSupplies.join(", ")}`);
        }
        return isSufficient;
    },
    
    buy: function () {
        let userPreference = parseInt(input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino: "));
        if (this.checkSupplies(this.supplies, this.flavors[this.coffeeType[userPreference]])) {
            for (let key in this.supplies) {
                switch (true) {
                    case (key in this.flavors[this.coffeeType[userPreference]] && key !== 'money'):
                        this.supplies[key] -= this.flavors[this.coffeeType[userPreference]][key];
                        break;
                    case (key in this.flavors[this.coffeeType[userPreference]] && key === 'money'):
                        this.supplies[key] += this.flavors[this.coffeeType[userPreference]][key];
                        break;
                    default:
                        break;
                }
            }
        }
    },

    fill: function () {
            for (let key in this.units) {
                if (key in this.supplies) {
                    let fillItems = parseInt(input(`Write how many ${this.units[key]} you want to add: `));
                    this.supplies[key] += fillItems;
                }
            }
        },

    take: function () {
            console.log(`I gave you ${this.supplies.money}\n`);
            this.supplies.money = 0;
        },

    userPrompt: function () {
            while (true) {
                //this.status();
                let action = input("\nWrite action (buy, fill, take, remaining, exit):");
                switch (action) {
                    case `buy`:
                        this.buy();
                        break;
                    case `fill`:
                        this.fill();
                        break;
                    case `take`:
                        this.take();
                        break;
                    case `remaining`:
                        this.status();
                        break;
                    case `back`:
                        break;
                    case `exit`:
                        break;
                    default:
                        console.log(`Invalid input`)
                        break;
                }

            }
        },
};

coffeeMachine.userPrompt();