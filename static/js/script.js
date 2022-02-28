// Challenge No.1
function clicker() {
    const d = new Date();
    let year = prompt("لطفا سال تولدت رو وارد کن", "year,month,day");
    const dUser = new Date(year);
    let dResult = Math.floor((d-dUser)/(1000*60*60*24));
    document.getElementById('plain-text').firstChild.textContent = dResult;
}

function reset() {
    document.getElementById('plain-text').firstChild.textContent = "نتیجه رو اینجا می نویسم."
}

//========================================================================

// Challenge No.2
function startGame(yourChoice) {
    let humanChoice, botChoice;
    // random choice for bot decision
    let items = ['rock', 'paper', 'scissors'];
    botChoice = items[Math.floor(Math.random()*items.length)];
    // get user choice
    humanChoice = yourChoice.id;
    // set result images from choices
    document.getElementById('user-img').src = yourChoice.src;
    document.getElementById('pc-img').src = document.getElementById(botChoice).src;
    // Decide who win
    let score = decideWinner(humanChoice, botChoice);
    switch (score) {
        case 1:
            document.getElementById('result').innerHTML = 'شما بردی';
            document.getElementById('result').style.color = 'green';
            break;
        case 0.5:
            document.getElementById('result').innerHTML = 'مساوی شد';
            document.getElementById('result').style.color = 'black';
            break;
        case 0:
            document.getElementById('result').innerHTML = 'شما باختی';
            document.getElementById('result').style.color = 'red';
            break;
    }
    // view result section and hide start section
    document.getElementById('result-cont').style.visibility = "unset";
    document.getElementById('start').style.visibility = "hidden";
}

function decideWinner(humanChoice, botChoice) {
    // All possibilities
    let pairs = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    }
    let score = pairs [humanChoice][botChoice];
    return score;
}

// Reset game view by click on result message
function resetGame() {
    document.getElementById('result-cont').style.visibility = "hidden";
    document.getElementById('start').style.visibility = "unset";
}

//========================================================================

// Challenge No.3
function catGenerator() {
    const image = document.createElement('img');
    const div = document.getElementById('catContainer');
    image.src = 'static/images/7t6.gif'
    div.appendChild(image);
}
function catDelete() {
    const div = document.getElementById('catContainer');
    div.lastChild.remove();
}

//========================================================================

// Challenge No.4
function changeColor() {
    let r = document.getElementById('red').value;
    let g = document.getElementById('green').value;
    let b = document.getElementById('blue').value;
    const box = document.getElementById('theBox');
    box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('color-code').innerHTML = `rgb(${r}, ${g}, ${b})`;
}

//========================================================================

// Challenge No.5
function counterMaker() {
    let counter = 0;
    return (reset=0)=>{
        if (reset){counter=0; return null;}
        return counter += 1;
    }
}
let count = counterMaker();
let interval;

function startTiming() {
    clearInterval(interval);
    interval = setInterval(timer, 10);
}

function stopTiming() {
    clearInterval(interval);
}

function saveTime() {
    const saveTime = document.createElement('p');
    const saveBox = document.getElementById('saved-time');
    saveBox.appendChild(saveTime);
    saveTime.innerHTML = document.getElementById('show-time').innerHTML;
}

function resetTiming() {
    stopTiming();
    count(reset=1);
    document.getElementById('show-time').innerHTML = "00 : 00 : 00";
    let savedBox = document.getElementById('saved-time');
    while (savedBox.firstChild) {
        savedBox.removeChild(savedBox.lastChild);
    }
}

function timer() {
    const showTime = document.getElementById('show-time');
    let time = count();
    let dms = time%100;
    let second = ((time-dms)/100)%60;
    let min = Math.floor(((time-dms)/100)/60);
    if (dms < 10) {
        dms = '0'+dms;
    }
    if (second<10) {
        second = '0'+second;
    }
    if (min<10){
        min = '0'+min;
    }
    showTime.innerHTML = `${min} : ${second} : ${dms}`;
}

//========================================================================

// Challenge No.6
const rows = document.querySelectorAll('tr');
const gameCells = document.querySelectorAll('td');
const board = document.getElementById('board');
let doozRound = 1;
let doozStatus = 0;
function play() {
    if (doozRound%2==1) {
        this.innerHTML = 'X';
        this.style.color = "green";
        board.innerHTML = "نوبت O هست";
        board.style.color = "red";
    }else {
        this.innerHTML = 'O'
        this.style.color = "red";
        board.innerHTML = "نوبت X هست";
        board.style.color = "green";
    }
    this.style.pointerEvents = "none";
    doozRound += 1;
    whoWin();
}
function doozReset() {
    for (let index = 0; index < gameCells.length; index++) {
        const element = gameCells[index];
        element.textContent = "";
        element.style.pointerEvents = "visible";
    }
    doozRound = 1;
    doozStatus = 0;
    board.innerHTML = "روی یک خانه کلیک کن";
    board.style.color = "black";
}
function whoWin() {
    //search on row
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const col = [];
        for (let j = 0; j < row.childElementCount; j++) {
            col[j] = row.cells[j].textContent;
        }
        if (col[0]==col[1] && col[0]==col[2] && col[1]==col[2] && col[0]!="") {
            doozStatus = 1;
        }
    }
    // search on cols
    for (let i = 0; i < 3; i++) {
        const col = [];
        for (let j = 0; j < rows.length; j++) {
            const row = rows[j];
            col[j] = row.cells[i].textContent;
        }
        if (col[0]==col[1] && col[0]==col[2] && col[1]==col[2] && col[0]!="") {
            doozStatus = 1;
        }
    }
    // search on diagonals
    const dia = [];
    const diaInv = [];
    for (let i = 0; i<rows.length; i++) {
        const row = rows[i];
        dia[i] = row.cells[i].textContent;
        diaInv[i] = row.cells[2-i].textContent;
        if (dia[0]==dia[1] && dia[0]==dia[2] && dia[1]==dia[2] && dia[0]!="" ||
        diaInv[0]==diaInv[1] && diaInv[0]==diaInv[2] && diaInv[1]==diaInv[2] && diaInv[0]!="") {
            doozStatus = 1;
        }
    }
    if (doozStatus) {
        for (let index = 0; index < gameCells.length; index++) {
            const element = gameCells[index];
            element.style.pointerEvents = "none";
        }
        if (doozRound%2==0) {
            board.innerHTML = "X برنده شد";
            board.style.color = "green";
        } else {
            board.innerHTML = "O برنده شد";
            board.style.color = "red";
        }
    }
}
