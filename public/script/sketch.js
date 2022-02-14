const gardenId = document.getElementById("id-box").textContent();
let gardenL;
let gardenW;
let canvasL;
let canvasW;
let plantGardenData;


function preload() {
    fetch(`/api/garden/${gardenId}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    }).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const garden = data;
        //Getting dimension attributes that will be used for rendering
        gardenL = garden.length;
        gardenW = garden.width;
        canvasL = gardenL*100+50;
        canvasW = gardenW*100;

        //Generating array that will be used to render the actual garden visual
        for (plant of garden.Plants) {
            for (let i = 0; i < plant.GardenPlant.numberOfPlants; i++) {
                plantGardenData.push(plant.name);
            }
        }
    }).catch(err=>{
        alert(err);
    })   
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
    const plantChoices = () => {
        plantGardenData.forEach(plant => {
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
            image(plantImage, 100, 100);
        });
    };
}

// function getIndex(row, column, columns) {
//     return columns*row + column
// }

// function getRow(index, columns) {return Math.floor(index/columns)}

// function getColumn(index, columns) {return index % columns}