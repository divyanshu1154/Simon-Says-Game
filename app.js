let started = "false";
let boxes = ["red","green","blue","yellow"];

let gameArray = [];
let userArray = [];

let level = 0;
let playerName;

let p = document.querySelector(".content");
let body = document.querySelector("body");
let scoreBoard = document.querySelector(".scoreBoard");

function userName(){
    playerName = prompt("Enter Your Name");
}

document.addEventListener("click",function(){
    
    if (started == "false"){
        userName();
        started = "true";
        console.log("game started");
        levelUp();
    }
})

function randBox(){                             // random box
    let rand = Math.ceil(Math.random()*3);
    return boxes[rand];
}

function flash(elem){                           // flash
    elem.classList.add("white");
    setTimeout(() => {
        elem.classList.remove("white");
    }, 500);
}

function levelUp(){
    level++;
    p.innerText = level;
    let elem = randBox();
    let box = document.querySelector(`.${elem}`);
    gameArray.push(elem);
    flash(box);
    console.log(gameArray);
}

let box = document.querySelectorAll(".box");
box.forEach(function(elem){
    elem.addEventListener("click",function(){
        flash(this);
        userArray.push(this.id)
        match();
    });
})

// matching sequence
function match(){
    let round = userArray.length - 1;
    console.log(userArray);
    if(userArray[round] == gameArray[round]){
        if (userArray.length == gameArray.length){
            userArray = [];
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    }
    else{
        reset();
    }
}

function reset(){
    userArray = [];
    gameArray = [];
    scoreShow();
    level = 0;
    body.classList.add("darkred");
    setTimeout(() => {
        p.innerText = "Click anywhere to start"
        body.classList.remove("darkred");
        console.log("game over")
        started = "false";
    }, 1000);
}

function scoreShow(){
    p.innerHTML = `Your Score is <b>${level}<b>`;
    let score = document.createElement("li");
    score.innerHTML = `${playerName}  =  ${level}`;
    scoreBoard.prepend(score);
}


