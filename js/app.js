/*
 * declaration of global variables 
 */
const stars = document.querySelectorAll('ul.stars li');
let deck = document.querySelector('ul.deck');
let cards = document.querySelectorAll(".card");
let cardArray = Array.from(cards);
let moves = 0;
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

//method that starts the game
function initGame(){
    numberOfMatch = 0;
    clickedCard = [];
    resetGame();

    createTimerElement();
    

    fillDeck();

    for(let i = 0; i < deck.children.length; i++){
        deck.children[i].addEventListener('click', displayCard);
        deck.children[i].addEventListener('click', function(){
         //Add a clicked card to clickedcard
            if(!clickedCard.includes(this)){
                clickedCard.push(this);
            
            
                if(clickedCard.length%2 === 0){
                    countMove();
                    starRating();
                }
                if(clickedCard.length === 2){
                    openedCard();
                }
            }
            
        });
    }

   
}
// To show card content.
var displayCard = function(){
    this.classList.toggle('show');
    this.classList.toggle('open');
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
    moves++;
    if(moves === 1){
        setTimer();
    }
    moveElement.innerHTML = moves;
}
//To determine the matched cards
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


//For the matching cards
 function matched(){

    for(let i =0; i < 2; i++){
        clickedCard[i].classList.add('match');
        clickedCard[i].classList.remove('show', 'open');
    }
    clickedCard = [];
    
    
 }
//For the clicked pair that do not match
 function unmatched(){
   setTimeout(function(){
    for(let i =0; i < 2; i++){
        clickedCard[i].classList.remove('show', 'open');
    }
    clickedCard = [];
   }, 500);
 }
//Reset the game
 function resetGame(){
     resetTime();
     resetMove();
     resetStar();
     shuffle(cardArray);

 }


 function resetTime(){
    clearInterval(clock);

 }

 function resetStar(){
     for(let i =0; i<stars.length;i++){
        stars[i].style.display='inline';
     }
    
 }  

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

// add event listener to repeat icon.
let restart = document.querySelector('.fa-repeat');
restart.addEventListener('click', initGame);

//call gameover function
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

// Add event listener to clicks of the buttons.

close.addEventListener('click', closeModal);
closebtn.addEventListener('click', closeModal);
reset.addEventListener('click', function(){
    closeModal();
    initGame();
});





