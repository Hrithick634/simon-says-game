let gameSeq=[];
let userSeq=[];
let btns=["red","yellow","purple","green"];

let started=false;
let level=0;
let maxLevel=0;
let h2=document.querySelector("h2");
let body=document.querySelector("body");

document.addEventListener("keypress", function() {
    if (started==false) {
        console.log("game staretd");
        started=true;
        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("flash")
    setTimeout(function() {
        btn.classList.remove("flash")
    },150)
}

function userFlash(btn) {
    btn.classList.add("userFlash")
    setTimeout(function() {
        btn.classList.remove("userFlash")
    },150)
}

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randInd=Math.floor(Math.random()*3);
    let randColor=btns[randInd];
    let randBtn=document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checker(idx) {
    if (userSeq[idx]===gameSeq[idx]) {
        if (userSeq.length==gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        if (maxLevel<level) {
            maxLevel=level;
        }
        h2.innerHTML=`Game Over! Your score was <b>${level-1}</b><br>highest Score ${maxLevel-1}<br>Press any key to start`;
        body.style.backgroundColor="red";
        setTimeout(function() {
            body.style.backgroundColor="white";
        }, 250)
        reset();
    }
}

function btnPress() {
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checker(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".box");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started=false;
    gameSeq=[]
    userSeq=[]
    level=0
}


