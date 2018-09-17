/*
 * declaration of global variables 
 */
const stars = document.querySelectorAll('ul.stars li');
let deck = document.querySelector('ul.deck');
let cards = document.querySelectorAll(".card");
let cardArray = Array.from(cards);
let moves;
const moveElement = document.querySelector('.moves');
let clickedCard;
let numberOfMatch; //It stores the number of matched cards
const shuffledCards = shuffle(cardArray);
let clock;
let rating;

//game starts once the window loads.
window.onload = function(){
    initGame();
}

//This starts the game
function initGame(){
    numberOfMatch = 0;
    clickedCard = [];
    moves = 0;
    resetGame();

    createTimerElement();
    

    fillDeck();

    for(let i = 0; i < deck.children.length; i++){
        deck.children[i].addEventListener('click', displayCard);
        deck.children[i].addEventListener('click', function(){
         //Add a clicked card to clickedcard
            if(clickedCard.length <= 2 && !clickedCard.includes(this) &&  !this.classList.contains('match')){
                clickedCard.push(this);
            
            
                if(clickedCard.length === 2){
                    countMove();
                    starRating();
                    openedCard();
                }
            }
            
        });
    }

   
}

// To show card content.
let displayCard = function(){
    this.classList.toggle('show', true);
    this.classList.toggle('open', true);
};


//create timer HTML element.
function createTimerElement(){
    let timer = document.createElement('div');
    timer.className = "timer";
    document.querySelector('.score-panel').appendChild(timer);

}

//set the time for the game.
function setTimer(){
    timer = document.querySelector('.timer');
    let minute = 0;
    let second = 0;
    

    clock = setInterval(function(){
        timer.innerHTML = minute + ' min: ' + second + ' sec';
        second++
        if(second % 60 === 0){
            minute++;
            second = 0;
        }

    },1000);

}

/*
 * Display the cards on the page+
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function fillDeck(){
    deck.innerHTML = "";
    for(let i = 0; i < shuffledCards.length; i++){
        shuffledCards[i].classList.remove('open', 'show', 'match');
        deck.appendChild(shuffledCards[i]);
    }
}



//Count the move make with the paired clicks
function countMove(){
    moves;
    moves++;
    if(moves === 1){
        setTimer();
    }
    moveElement.innerHTML = moves;
}
//Determines the matched cards
function openedCard(){
    if(clickedCard[0].firstElementChild.className ===
        clickedCard[1].firstElementChild.className){
        matched();
        numberOfMatch +=2;
        if(numberOfMatch === 16){
            gameOver();
        }
    }else{
        unmatched();
    }
 }

//Matches two corresponding cards
 function matched(){
    for(let i =0; i < 2; i++){
        clickedCard[i].classList.add('match');
        clickedCard[i].classList.remove('show', 'open');
    }
    clickedCard = [];
    
    
 }
//Cards that are not matched after being clicked
 function unmatched(){
   setTimeout(function(){
    for(let i =0; i < 2; i++){
        clickedCard[i].classList.remove('show', 'open');
    }
    clickedCard = [];
   }, 500);
 }

 //Resets the game to initial values.
 function resetGame(){
     resetTime();
     resetMove();
     resetStar();
     shuffle(cardArray);

 }

// Restarts time from Zero
 function resetTime(){
    clearInterval(clock);

 }

//Resets the stars to default
 function resetStar(){
     for(let i =0; i<stars.length;i++){
        stars[i].style.display='inline';
     }
    
 }  

 //Makes number of moves zero
 function resetMove(){
    moves = 0;
    moveElement.innerHTML = moves;
 }





// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Restarts the game from the beginning all over 
let restart = document.querySelector('.fa-repeat');
restart.addEventListener('click', initGame);

/*
 *Shows when all the cards are matched
 *calls the modal message
 */
function gameOver(){
    clearInterval(clock);
    openModal();
}

//Star rating
function starRating(){
    if(moves >= 16){
        stars[0].style.visibility = 'collapse';
        stars[1].style.visibility = 'collapse';
    }else if(moves === 10 && moves < 16 ){
        stars[0].style.visibility = 'collapse';
    }
}
/* 
*  Modal congratulatory message
*/
const modal = document.querySelector('.modal');
let close = document.querySelector('.close');
let closebtn = document.querySelector('.closebtn');
let reset = document.querySelector('.reset');
let modalTime = document.querySelector('.modal-time');
let modalMove = document.querySelector('.modal-moves');
let modalStar = document.querySelector('.modal-stars');
rating = document.querySelector('.stars');

//Opens the congratulatory modal.
function openModal(){
    modalTime.innerHTML = timer.innerHTML;
    modalMove.innerHTML = moveElement.innerHTML;
    modalStar.innerHTML = rating.innerHTML;
    modal.style.display='block';
}
   
//Closes the modal.
function closeModal(){
    modal.style.display= 'none';
}

// close, reset and closebtn 

close.addEventListener('click', closeModal);
closebtn.addEventListener('click', closeModal);
reset.addEventListener('click', function(){
    closeModal();
    initGame();
});





