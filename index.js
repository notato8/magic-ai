import cardSet from "./sets/index.js";
import * as choices from "./choices.js"; //weird


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

class Zone extends Array { //maybe make this "ordered zone" for deck & graveyard
    send(startIndex, count = 1, destination, bottom = false) {
        for (let i = 0; i < count; i++) {
            switch (bottom) { //define the function outside the loop
                case false:
                    destination.push(this[startIndex + i]);
                    break;
                case true:
                    destination.unshift(this[startIndex + i]);
                    break;
            }
        }
        this.splice(startIndex, count);
    }

    get topIndex() {
        return this.length - 1;
    }
    
    get bottomIndex() {
        return 0;
    }
}
class Deck extends Zone {
    constructor(availableCards = []) {
        super();
    
        while (this.length < 60 && availableCards.length > 0) {
            availableCards = availableCards.filter(card => {
                return (
                    card.supertypes?.includes("Basic") ||
                    this.reduce((count, deckCard) => {
                        return deckCard.constructor == card ? count + 1 : count;
                    }, 0) < 4
                )
            });
            
            this.push(new availableCards[Math.floor(Math.random() * availableCards.length)](this));
        }
    }
    
    shuffle() {
        let m = this.length;
        let t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = this[m];
            this[m] = this[i];
            this[i] = t;
        }
    }
};

class Player {
    constructor() {
        this.deck = new Deck(cardSet);
        this.hand = new Zone();
        this.graveyard = new Zone();
    }
    
    draw(n = 1) {
        if (this.library.length > 0) {
            this.library.send(this.library.topIndex, 1, this.hand)
            if (n > 1) {
                this.draw(n - 1);
            }
        } else {
            this.attemptedToDrawCardFromLibraryWithNoCardsInIt = true;
        }
    }
    getPriority() {
        performAllStateBasedActions();
        this.passed = false;
    }
    cast(card) {
        this.getPriority();
    }
    activate(permanent, ability) {
        stack.push(new Ability(ability));
        this.getPriority();
    }
    pass() {
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
    lose() {}
}


const players = [ new Player(), new Player() ];
const battlefield = new Zone(), stack = new Zone(), exile = new Zone();
const zones = [ //might not be necessary for state-based actions
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
players.forEach(player => {
    player.deck.shuffle();
    player.library = player.deck;
    player.life = 20;
    player.draw(7);
});

while (!players.every(player => player.willMulligan === false)) { // Mulligan
    players.filter(player => player.willMulligan !== false).forEach(player => {
        choices.mulligan(player);
    });
    players.filter(player => player.willMulligan).forEach(player => {
        player.hand.send(0, player.hand.length, player.library);
        player.library.shuffle();
        player.draw(7);
        player.numberOfMulligans = 1 + (player.numberOfMulligans || 0);
        for (let i = 0; i < player.numberOfMulligans; i++) {
            player.hand.send(choices.card(player.hand), 1, player.library, true);
        }
    });
}

let activePlayer = players[0];
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
