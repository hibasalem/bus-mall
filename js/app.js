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

let nameChart = [];
let votesChart = [];
let shownChart = [];

function Photo(name, source) {
    this.name = name;
    this.source = source;
    this.showsCounter = 0;
    this.votes = 0;

    photos.push(this);

    // push names for the chart
    nameChart.push(this.name);
}

new Photo('bag', 'img/bag.jpg');
new Photo('banana', 'img/banana.jpg');
new Photo('bathroom', 'img/bathroom.jpg');
new Photo('boots', 'img/boots.jpg');
new Photo('breakfast', 'img/breakfast.jpg');
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

function RandIndex() {
    return Math.floor(Math.random() * photos.length);
}

// storing in the local storage 

function updateStorage() {
    let arrayString = JSON.stringify(photos);
    localStorage.setItem('photos', arrayString);

    console.log(arrayString);
    console.log(localStorage);
}


// updating the result 

function getResult() {
    let data = localStorage.getItem('photos');
    let photosData = JSON.parse(data)
  
    if (photosData !== null) {
        photos = photosData;
        console.log(photos);
    }
    renderImg();
}

// showing  on the photos 

let tempArry = [];

function renderImg() {

    leftIndex = RandIndex();
    centerIndex = RandIndex();
    rightIndex = RandIndex();

    while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex || tempArry.includes(leftIndex) || tempArry.includes(centerIndex) || tempArry.includes(rightIndex)) {

        leftIndex = RandIndex();
        rightIndex = RandIndex();
        centerIndex = RandIndex();
    }

    leftElement.src = photos[leftIndex].source;
    centerElement.src = photos[centerIndex].source;
    rightElement.src = photos[rightIndex].source;

    photos[leftIndex].showsCounter++;
    photos[centerIndex].showsCounter++;
    photos[rightIndex].showsCounter++;

    // push to the array 
    tempArry = [];
    tempArry.push(leftIndex, centerIndex, rightIndex);
    console.log("temp", tempArry);
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
        } else if (event.target.id === 'right') {
            photos[rightIndex].votes++;
        } else {
            userAteempts--;
        }
        renderImg();

    } else {
        updateStorage();

        //create the button 
        imgContanair.removeEventListener('click', handleUserClick);
        let result = document.getElementById('button');
        let button = document.createElement('button');
        result.appendChild(button);
        button.textContent = "show results"

        // push votes and shows for the chart 

        for (let i = 0; i < photos.length; i++) {
            votesChart.push(photos[i].votes);
            shownChart.push(photos[i].showsCounter);
        }



        //create the list when click on button 

        button.addEventListener('click', makelist);
        function makelist() {
            let list = document.getElementById('results');
           /* let listli = 0;
            for (let i = 0; i < photos.length; i++) {
                listli = document.createElement('li');
                list.appendChild(listli);
                listli.textContent = `${photos[i].name} has ${photos[i].votes} votes ,and was seen ${photos[i].showsCounter} times`
               
            } */
            chart();
            
        }
        //hide the button
        button.addEventListener('click', hideIt);
        function hideIt() {

            document.getElementById('button').style.display = 'block';
            this.style.display = 'none';
        }
    }
}

//  the chart function from the library 

function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // chart type 
        type: 'bar',
        data: {
            labels: nameChart,

            datasets: [
                {
                    label: 'votes',
                    data: votesChart,
                    backgroundColor: [
                        '#c7ffd8',
                    ],

                    borderWidth: 1
                },

                {
                    label: 'shown',
                    data: shownChart,
                    backgroundColor: [
                        '#161d6f',
                    ],

                    borderWidth: 1
                }

            ]
        },
        options: {}
    });

}

getResult();
