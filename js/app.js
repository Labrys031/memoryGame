//card variables
let card = document.getElementsByClassName("card");
let cards = [...card]
const dk = document.getElementById("cdeck");
let mchCard = document.getElementsByClassName("match");
let opCards = [];
//score variables
let mvs = 0;
let count = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let cat = document.getElementById("idle");
//win variables
let closeicon = document.querySelector(".close");
let pop = document.getElementById("popup1");
//---------------------------functionality----------------------------
// shuffle cards
function shuffleCards(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
// when page refreshed / loads cards shuffle
document.body.onload = gameStart();
//new game 
function gameStart(){
    cards = shuffleCards(cards);
    for (var i = 0; i < cards.length; i++){
        [].forEach.call(cards, function(item) {
            dk.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    setBoard();
    setTimer();
    cat.src = "img/idleT.png";
}
//reset moves/score
function setBoard() {
    mvs = 0;
    count.innerHTML = mvs;
    count.style.fontSize = "30px";
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#f0f0f0";
        stars[i].style.visibility = "visible";
    }
}
//reset timer
function setTimer() {
    sec = 0;
    min = 0; 
    hr = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "00:00";
    timer.style.fontSize = "30px";
    clearInterval(interval);
}
//---------------------------gameplay----------------------------
//show cards
let showCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    cat.src = "img/lk.png";
};
//check cards
function cardOp() {
    opCards.push(this);
    let len = opCards.length;
    if(len === 2){
        mveCount();
        if(opCards[0].type === opCards[1].type){
            match();
            cat.src = "img/nice.png";
        } else {
            unmatched();
            cat.src = "img/idleT.png";
        }
    }
};
//disable cards
function off(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}
//enable cards, disable matched cards
function on(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < mchCard.length; i++){
            mchCard[i].classList.add("disabled");
        }
    });
}
//correct match
function match(){
    opCards[0].classList.add("match", "disabled");
    opCards[1].classList.add("match", "disabled");
    opCards[0].classList.remove("show", "open", "no-event");
    opCards[1].classList.remove("show", "open", "no-event");
    opCards = [];
}
//incorrect match
function unmatched(){
    opCards[0].classList.add("unmatched");
    opCards[1].classList.add("unmatched");
    off();
    setTimeout(function(){
        opCards[0].classList.remove("show", "open", "no-event","unmatched");
        opCards[1].classList.remove("show", "open", "no-event","unmatched");
        on();
        opCards = [];
    },1100);
    
}
//---------------------------scoring----------------------------
//timer
var sec = 0; 
var min = 0; 
var hr = 0;
var interval;
let timer = document.querySelector(".timer");
function strtTime(){
    interval = setInterval(function(){
        if (sec < 10) {
        timer.innerHTML = min+":"+("0"+sec).slice (-3);
        }else{
        timer.innerHTML = min+":"+sec;
        }
        sec++;
        if(sec == 60){
            min++;
            sec=0;
        }
        if(min == 60){
            hr++;
            min = 0;
        }
    },1000);
}
//count moves
function mveCount(){
    mvs++;
    count.innerHTML = mvs;
    if(mvs == 1){
        sec = 0;
        min = 0; 
        hr = 0;
        strtTime();
    }
    if (mvs > 10 && mvs < 16){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "hidden";
            }
        }
    }
    else if (mvs > 17){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "hidden";
            }
        }
    }
}
//---------------------------winning----------------------------
//win popup
function win(){
    if (mchCard.length == 16){
        clearInterval(interval);
        endTime = timer.innerHTML;
        pop.classList.add("show");
        var starRate = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = mvs;
        document.getElementById("starRating").innerHTML = starRate;
        document.getElementById("totalTime").innerHTML = endTime;
        closePop();
    };
}
//close win screen
function closePop(){
    closeicon.addEventListener("click", function(e){
        pop.classList.remove("show");
        gameStart();
    });
}
//play again 
function playAgain(){
    pop.classList.remove("show");
    gameStart();
}
//event listeners
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", cardOp);
    card.addEventListener("click", win);
};
