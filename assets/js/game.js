// import _ from 'underscore';


let deck = [];
const types = ['C','H','S','D']
const specialTypes = ['A','J','Q','K']

const createDeck = () => {
    for (let index = 2; index < 10; index++) {
        for (const type of types) {
            deck.push(index + type)
        }
    }
    for (const specialType of specialTypes) {
        for (const type of types) {
            deck.push(specialType + type)
        }
    }

    return _.shuffle(deck)
}

console.log(createDeck())