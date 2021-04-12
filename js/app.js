'use strict';

let leftElement = document.getElementById('left');
let centerElement = document.getElementById('center');
let rightElement = document.getElementById('right');

let maxAteempts = 25;
let userAteempts = 0;


let leftIndex = 0;
let centerIndex = 0;
let rightIndex = 0;

let photos = [];

function Photo(name, source) {
    this.name = name;
    this.source = source;

    this.showsCounter = 0;
    this.votes = 0;

    photos.push(this);
}

new Photo('bag', 'img/bag.jpg');
new Photo('banana', 'img/banana.jpg');
new Photo('bathroom', 'img/bathroom.jpg');
new Photo('boots', 'img/boots.jpg');
new Photo('bathroom', 'img/bathroom.jpg');
new Photo('bubblegum', 'img/bubblegum.jpg');
new Photo('chair', 'img/chair.jpg');
new Photo('cthulhu', 'img/cthulhu.jpg');
new Photo('dog-duck', 'img/dog-duck.jpg');
new Photo('dragon', 'img/dragon.jpg');
new Photo('pen', 'img/pen.jpg');
new Photo('pet-sweep', 'img/pet-sweep.jpg');
new Photo('scissors', 'img/scissors.jpg');
new Photo('shark', 'img/shark.jpg');
new Photo('sweep', 'img/sweep.png');
new Photo('tauntaun', 'img/tauntaun.jpg');
new Photo('unicorn', 'img/unicorn.jpg');
new Photo('usb', 'img/usb.gif');
new Photo('water-can', 'img/water-can.jpg');
new Photo('wine-glass', 'img/wine-glass.jpg');

console.log(photos);

function RandIndex() {

    return Math.floor(Math.random() * photos.length);
}

// showing  on the photos 

function renderImg() {

    leftIndex = RandIndex();
    centerIndex = RandIndex();
    rightIndex = RandIndex();
    while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex) {

        while (leftIndex === rightIndex) {
            rightIndex = RandIndex();
        }
        while (leftIndex === centerIndex) {
            centerIndex = RandIndex();
        }
        while (centerIndex === rightIndex) {
            rightIndex = RandIndex();
        }
    }

    leftElement.src = photos[leftIndex].source;
    centerElement.src = photos[centerIndex].source;
    rightElement.src = photos[rightIndex].source;

    photos[leftIndex].showsCounter++;
    photos[centerIndex].showsCounter++;
    photos[rightIndex].showsCounter++;
}
renderImg();

//  clicking  the photos and changing them

let imgContanair = document.getElementById('images');
imgContanair.addEventListener('click', handleUserClick);
console.log(photos);

function handleUserClick(event) {
    userAteempts++;

    if (userAteempts <= maxAteempts) {
        //the 25 attempts
        if (event.target.id === 'left') {
            photos[leftIndex].votes++;
        } else if (event.target.id === 'center') {
            photos[centerIndex].votes++;
        } else {
            photos[rightIndex].votes++;
        }
        renderImg();

    } else {
        //create the button 
        let result = document.getElementById('button');
        let button = document.createElement('button');
        result.appendChild(button);
        button.textContent ="show results"

        //create the list when click on button 

        button.addEventListener('click', makelist);

        function makelist() {

            let list = document.getElementById('results');
            let listli = 0;

            for (let i = 0; i < photos.length; i++) {
                listli = document.createElement('li');
                list.appendChild(listli);
                listli.textContent = `${photos[i].name} has ${photos[i].votes} votes ,and was seen ${photos[i].showsCounter} times`
            }

            imgContanair.removeEventListener('click', handleUserClick);
        }

        //hide the button

        button.addEventListener('click', hideIt);
        function hideIt() {

            document.getElementById('button').style.display = 'block'; 
            this.style.display = 'none';            
        }
    }
}


