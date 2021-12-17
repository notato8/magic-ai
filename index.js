import cardSet from "./sets/index.js";


function performAllStateBasedActions() {
    players.forEach(player => {
        if (player.life <= 0) player.lose();
        if (player.attemptedToDrawCardFromLibraryWithNoCardsInIt) player.lose();
        if (player.counters?.poison >= 10) player.lose();
    });
    zones.filter(zone => zone != battlefield).forEach((zone, index) => {
        zone?.forEach(permanent => {
            if (permanent.types?.includes("Token")) {
                zone.splice(index, 1);
            }
        })
    })
    //704.5e here
    battlefield.filter(permanent => permanent.types?.includes("Creature")).forEach((creature, index) => {
        if (
            creature.toughness <= 0 ||
            creature.damage >= creature.tougnness ||
            creature.hasBeenDamagedBySourceWithDeathtouch
        ) {
            battlefield.splice(index, 1); //this should be a class method
            creature.owner.graveyard.push(creature);
        }
    });
    battlefield.filter(permanent => permanent.types?.includes("Planeswalker")).forEach((planeswalker, index) => {
        if (planeswalker.loyalty === 0) {
            battlefield.splice(index, 1);
            planeswalker.owner.graveyard.push(planeswalker);
        }
    });
    //704.5j-p here
    battlefield.forEach(permanent => {
        if (permanent.counters?.["+1/+1"] && permanent.counters?.["-1/-1"]) {
            const n = Math.min(permanent.counters?.["+1/+1"], permanent.counters?.["-1/-1"]);
            permanent.counters["+1/+1"] -= n;
            permanent.counters["-1/-1"] -= n; //might need to be a class method for removing counters
        }
    })
   //704.5s-t here
};
const triggers = [
    //array of functions?
    //or objects also with a flag to determine if they have been triggered
];

function Spell(card) {} //may need to be merged with Card
Spell.prototype.resolve = function () {
    stack.splice(stack.indexOf(this), 1);
};
function Ability(ability) {} //may need to be merged with Card
Ability.prototype.resolve = function () {
    stack.splice(stack.indexOf(this), 1);
};

function Deck(availableCards = cardSet) {
    while (this.length < 60) {
        availableCards = availableCards.filter(card => {
            return (
                card.prototype.supertypes?.includes("Basic") ||
                this.reduce((count, deckCard) => {
                    return Object.getPrototypeOf(deckCard) == card.prototype ? count + 1 : count;
                }, 0) < 4
            )
        });
        
        this.push(new availableCards[Math.floor(Math.random() * availableCards.length)]);
    }
};
Object.setPrototypeOf(Deck.prototype, Array.prototype);
Deck.prototype.shuffle = function () {
    let m = this.length;
    let t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = this[m];
        this[m] = this[i];
        this[i] = t;
    }
};

function Permanent() {} //may need to be merged with Card
Permanent.prototype.tap = function () { //should this be a player method instead? or both?
    this.isTapped = true;
}
Permanent.prototype.untap = function () {
    this.isTapped = false;
}

function Player() {
    this.deck = new Deck();
}
Player.prototype.draw = function (n = 1) {
    this.hand = this.hand || [];
    if (this.library.length > 0) {
        this.hand.push(this.library.pop());
        if (n > 1) {
            this.draw(n - 1);
        }
    } else {
        this.attemptedToDrawCardFromLibraryWithNoCardsInIt = true;
    }
}
Player.prototype.getPriority = function () {
    performAllStateBasedActions();
    this.passed = false;
}
Player.prototype.cast = function (card) {
    card.zone.splice(card.zone.indexOf(card), 1); //maybe the wrong way to do this
    stack.push(new Spell(card));
    this.getPriority();
}
Player.prototype.activate = function (permanent, ability) {
    stack.push(new Ability(ability));
    this.getPriority();
}
Player.prototype.pass = function () {
    const nonactivePlayer = players.find(player => player != activePlayer);
    if (nonactivePlayer.passed === false) {
        this.passed = true;
        nonactivePlayer.getPriority();
    } else if (stack.length > 0) {
        stack[stack.length - 1].resolve();
    } else {
        players.forEach(player => player.mana = {});
    }
}
Player.prototype.lose = function () {}


const players = [ new Player(), new Player() ];
const battlefield = [], stack = [], exile = [];
const zones = [
    players[0].library,
    players[1].library,
    players[0].hand,
    players[1].hand,
    battlefield,
    players[0].graveyard,
    players[1].graveyard,
    stack,
    exile
];
const startingPlayer = players[ Math.floor( Math.random() * 2 ) ];
players.forEach(player => {
    player.deck.shuffle();
    player.library = player.deck;
    player.life = 20;
    player.draw(7);
});

//mulligan

let activePlayer = startingPlayer;
let firstTurn = true;
while (true) {
    // Beginning Phase
    activePlayer.permanents?.forEach(permanent => { //redo this using zones
        permanent.hasBeenControlledByActivePlayerContinouslySinceTurnBegan = true;
    });
    // Untap Step
    activePlayer.permanents?.forEach(permanent => {
        permanent.untap();
        permanent.controllerAtBeginningOfTurn = activePlayer;
    });
    
    // Upkeep Step
     activePlayer.getPriority();
    
    // Draw Step
    activePlayer.draw();
    activePlayer.getPriority();
    
    
    // Precombat Main Phase
    activePlayer.getPriority();
    
    
    // Combat Phase
    // Beginning of Combat Step
    activePlayer.getPriority();
    
    // Declare Attackers Step
    activePlayer.permanents?.filter(permanent => permanent.types.includes("Creature"))
    .forEach(creature => {
        if (
            creature.hasBeenControlledByActivePlayerContinouslySinceTurnBegan &&
            !creature.isTapped
        ) {
        
        }
    });
    
    // Declare Blockers Step
    
    // Combat Damage Step
    
    // End of Combat Step
    
    
    // Postcombat Main Phase
    activePlayer.getPriority();
}
