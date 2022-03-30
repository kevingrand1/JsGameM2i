
const player = document.getElementById('player');
const finish = document.getElementById('finish');

const alert = document.getElementById('alert');

const output = document.getElementById('output');

const buttons = document.getElementById('buttons')
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnRight = document.getElementById('right');
const btnLeft = document.getElementById('left');

const btnSubmit = document.getElementById('submit');
const btnRedo = document.getElementById('redo');

const originalPosX = getPosition(player).left + 'px';
const originalPosY = getPosition(player).top + 'px';

let outputs = [];

btnUp.addEventListener('click',()=>{
    printer('up')
});

btnDown.addEventListener('click',()=>{
   printer('down')
});

btnRight.addEventListener('click',()=>{
    printer('right')
});

btnLeft.addEventListener('click',()=>{
    printer('left')
});

btnSubmit.addEventListener('click',()=>{doMoves();});

btnRedo.addEventListener('click',()=>{redo()});


function printer(elem = '') {
    let p = document.createElement("p");
    let content = document.createTextNode(elem);
    p.appendChild(content);
    output.appendChild(p);

    outputs.push(elem)
}

function doMoves(){
    outputs.forEach( element => move(element));
    outputs.length = 0;
}

function move(elem) {
    switch (elem) {
        case 'right':
            moveRight()
            break;
        case 'down':
            moveDown();
            break;
        case 'left':
            moveLeft()
            break;
        case 'up':
            moveUp();
            break;
    }
}

function moveUp() {
    let start = player.parentNode.getAttribute('data-id');
    let newPosition = (parseInt(start.substring(0,1)) - 1) + (start.substring(1));

    return movement(start, newPosition)
}

function moveDown() {
    let start = player.parentNode.getAttribute('data-id');
    let newPosition = (parseInt(start.substring(0,1)) + 1) + (start.substring(1));

    return movement(start, newPosition)
}

function moveLeft() {
    let start = player.parentNode.getAttribute('data-id');
    let number = parseInt(start.charAt(start.length-1));
    let newPosition = start.substring(0,2) + (number - 1);

    return movement(start, newPosition)
}

function moveRight() {
    let start = player.parentNode.getAttribute('data-id');
    let number = parseInt(start.charAt(start.length-1));
    let newPosition = start.substring(0,2) + (number + 1);

    return movement(start, newPosition)
}

function movement(start, newPosition) {

    if (!! document.getElementById(newPosition)) {

        console.log('start : ' + start, 'end : ' + newPosition);

        document.getElementById(newPosition).appendChild(player);
        win();

    } else {

        console.log('start : ' + start, 'end : ' + newPosition);

        return loose();
    }
}

function win() {
    if (player.parentNode === finish.parentNode){
        while (output.firstChild) {
            output.removeChild(output.lastChild);
        }
        outputs.length = 0;
        let p = document.createElement("p");
        p.setAttribute('id', 'alert');
        let content = document.createTextNode('You win!');
        p.appendChild(content);
        output.appendChild(p);
        buttons.style.display = "none";
        p.style.display = "block";
        btnRedo.style.display = "flex";
    }



}

function loose() {
    while (output.firstChild) {
        output.removeChild(output.lastChild);
    }
    outputs.length = 0;
    let p = document.createElement("p");
    p.setAttribute('id', 'alert');
    let content = document.createTextNode('You loose !');
    p.appendChild(content);
    output.appendChild(p);
    buttons.style.display = "none";
    p.style.display = "block";
    btnRedo.style.display = "flex";


}

function redo() {

    let p = document.getElementById('alert');

    while (output.firstChild) {
        output.removeChild(output.lastChild);
    }

    outputs.length = 0;

    player.style.left = originalPosX;
    player.style.top = originalPosY;

    buttons.style.display = "block";
    p.style.display = "none";
    btnRedo.style.display = "none";

    window.location.reload();
}

function getPosition (elem) {
    let pos = elem.getBoundingClientRect();
    return {top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right}
}













