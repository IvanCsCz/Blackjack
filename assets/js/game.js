(() => {
    'use-strict'

    const types = ['C','H','S','D']
    const specialTypes = ['A','J','Q','K']
    const [newGameBtn, drawACardBtn, stopBtn] = document.querySelectorAll('.button');
    const [playerScoreElement, computerScoreElement] = document.querySelectorAll('small')
    const [playerCardsElement, computerCardsElement] = document.querySelectorAll('.card_img')
    let playerScore = 0;
    let computerScore = 0;

    const createDeck = () => {
        const deck = [];

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

    const drawACard = (deck) => {
        if(deck.length === 0){
            throw "There's no more cards"
        }
        
        return {
            lastCard:deck.pop(),
            updatedDeck:deck
        }
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length -1)
        if( isNaN( value) ){
            if(value === 'A') return 11
            return 10
        }else{
            return Number(value)
        }
    }

    const computerTurn = (playerScore) => {
        drawACardBtn.disabled = true;
        stopBtn.disabled = true;
        do {
            const {lastCard, updatedDeck} = drawACard(deck)
            computerScore += cardValue(lastCard)
            deck = updatedDeck

            computerScoreElement.innerText = computerScore
            const cardImg = document.createElement('img');
            cardImg.src = `assets/cartas/${lastCard}.png`;
            cardImg.classList.add('card')

            computerCardsElement.append(cardImg)

            if(playerScore > 21 ){
                break;
            }
        } while ( computerScore < playerScore && computerScore <= 21);

        setTimeout(() => {
            if (playerScore === computerScore){
                alert("It's a draw")
            } else if (playerScore > 21 ){
                alert('Computer won!!')
            }else if(computerScore > 21){
                alert('Player won!!')
            }else{
                alert('Computer won!!')
            }
        }, 500)
    }

    drawACardBtn.addEventListener('click', () => {
        
        const {lastCard, updatedDeck} = drawACard(deck)
        playerScore += cardValue(lastCard)
        deck = updatedDeck

        playerScoreElement.innerText = playerScore
        const cardImg = document.createElement('img');
        cardImg.src = `assets/cartas/${lastCard}.png`;
        cardImg.classList.add('card')

        playerCardsElement.append(cardImg)

        if(playerScore > 21){
            drawACardBtn.disabled = true;
            computerTurn(playerScore)

        } else if(playerScore === 21){
            drawACardBtn.disabled = true;
            computerTurn(playerScore)

        }
    });

    stopBtn.addEventListener('click', () => {
        computerTurn(playerScore)
    })

    newGameBtn.addEventListener('click', () => {
        deck = createDeck()
        
        playerScore = 0;
        computerScore = 0;
        
        playerScoreElement.innerText = 0
        computerScoreElement.innerText = 0
        
        playerCardsElement.innerHTML = ''
        computerCardsElement.innerHTML = ''
        
        drawACardBtn.disabled = false
        stopBtn.disabled = false

    })

    let deck = createDeck()

})();