const Garden  = require("../models/Garden");
const garden = { Garden }
const gardenL = garden.length;
const gardenW = garden.width;
const canvasL = gardenL*100+50;
const canvasW = gardenW*100;
const gardenBlocks = new Array[ garden.length * garden.width ];
const plantIndexCounter;

function preload() {

}

function setup() {
    const canvas = createCanvas(canvasW, canvasL);
    const pageLoc = document.getElementById("gardenImg");
    pageLoc.child(canvas);

    saveImageBtn = createButton("Save Canvas");
    saveImageBtn.position(gardenW/2, gardenL+35);
    saveImageBtn.mousePressed(saveAsCanvas);

    function saveAsCanvas() {
        save("output_canvas.png");
      }
};

function draw() {
    background(40,23,11);
    const gardenBed = function() {
        for (var row=0; row < garden.length; row++) {
            for (var column=0; column < garden.width; column++) {
                const index = getIndex(row, column, garden.width);
                const xOffset = column*100;
                const yOffset = row*100;
                const gardenBlock = gardenBlocks[index];
                rect(xOffset,yOffset,100,100)
                fill(40,23,11)
                // plantChoices();
                // image(plantImage,xOffset,yOffset)
                // image from garden block
            }
        }
    };
    const plantChoices = obj => {
        const plantGardenData = obj.Plants;
        plantGardenData.forEach(plant=>{
            const plantName = plant.name;
            const plantImage = loadImage(`../public/images/gardenOutput/${plantName}`);
            const plantRow = 0;
            const plantColumn = 0;
            function rowCounter() {
                if(row < gardenL) {return plantRow++}
            }
            function columnCounter() {
                if(column <gardenW) {return plantColumn++}
            }
            rowCounter();
            columnCounter();
            const plantYOffset = plantRow*100;
            const plantXOffset = plantColumn*100;
            image(plantImage, 100, 100)
        })

    }
}

function getIndex(row, column, columns) {
    return columns*row + column
}

function getRow(index, columns) {return Math.floor(index/columns)}

function getColumn(index, columns) {return index % columns}

function generateLayout(gardenBlocks) {
    // take in sq ft per vegetable
    // take in vegetable image

}