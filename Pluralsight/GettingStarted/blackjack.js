let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 
            'Ten', 'Nine', 'Eight', 'Seven',
            'Six', 'Five', 'Four', 'Three', 'Two'];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

let gameStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', () => {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});

hitButton.addEventListener('click', () => {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', () => {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
})

function createDeck() {
    let deck = []; 
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {    
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                suit: suits[suitIndex],
                value: values[valueIndex]
            };
            deck.push(card);
        }
    }
    return deck;
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function showStatus() {
    if(!gameStarted){
        textArea.innerText = 'Welcome to Blackjack!';
        return;
    }

    let dealerCardString = '';
    for (let index = 0; index < dealerCards.length; index++) {
        dealerCardString += getCardString(dealerCards[index]) + '\n';
    }

    let playerCardString = '';
    for (let index = 0; index < playerCards.length; index++) {
        playerCardString += getCardString(playerCards[index]) + '\n';
    }

    updateScores();

    textArea.innerText = 
        'Dealer has: \n' + 
        dealerCardString +
        '(Score: ' + dealerScore + ')\n\n' +

        'Player has: \n' + 
        playerCardString +
        '(Score: ' + playerScore + ')\n\n';

    if(gameOver){
        if(playerWon){
            textArea.innerText += 'YOU WIN!';
        }
        else{
            textArea.innerText += 'DEALER WINS!';
        }

        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}

function shuffleDeck(deck) {
    for (let index = 0; index < deck.length; index++) {
        let swapIndex = Math.trunc(Math.random() * deck.length);
        let temp = deck[swapIndex];
        deck[swapIndex] = deck[index];
        deck[index] = temp;
    }
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let index = 0; index < cardArray.length; index++) {
        let card = cardArray[index];
        score += getCardNumericValue(card);
        if(card.value === 'Ace'){
            hasAce = true;
        }
    }
    if(hasAce && (score + 10) <= 21){
        return score + 10;
    }
    return score;
}

function getCardNumericValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        default:
            return 10;
            break;
    }
}

function checkForEndOfGame() {
    updateScores();

    if(gameOver){
        while (dealerScore < playerScore
            && playerScore <= 21
            && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }

    if(playerScore > 21){
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else{
            playerWon = false;
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}


