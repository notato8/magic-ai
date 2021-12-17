import Card from "../prototypes/card.js";


function BladeInstructor() {};
function Plains() {};
function Island() {};
function Swamp() {};
function Mountain() {};
function Forest() {};

const cards = [
    BladeInstructor,
    Plains,
    Island,
    Swamp,
    Mountain,
    Forest
];


cards.forEach(card => Object.setPrototypeOf(card, Card));

Object.assign(BladeInstructor.prototype, {
    name: "Blade Instructor",
    cost: { mana: {
        generic: 2,
        white: 1
    } },
    types: ["Creature"],
    subtypes: ["Human", "Soldier"],
    power: 3,
    toughness: 1
});
Object.assign(Plains.prototype, {
    name: "Plains",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Plains"],
});
Object.assign(Island.prototype, {
    name: "Island",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Island"],
});
Object.assign(Swamp.prototype, {
    name: "Swamp",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Swamp"],
});
Object.assign(Mountain.prototype, {
    name: "Mountain",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Mountain"],
});
Object.assign(Forest.prototype, {
    name: "Forest",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Forest"],
});


export default cards;
