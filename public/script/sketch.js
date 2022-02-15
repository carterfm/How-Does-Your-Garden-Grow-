const gardenId = document.getElementById("id-box").textContent;
let gardenL;
let gardenW;
let canvasL;
let canvasW;
let plantGardenData = [];


// function preload() {
//     const preloadImages = function() {
//         let allPlantsList = ["Carrots", "Onions (bulb)", "Beans (bush)", "Asparagus", "Cabbage", "Beets", "Corn (sweet)", "Cucumbers", "Eggplant", "Lettuce", "Radishes"]
//         allPlantsList.forEach(plant => {
//             let plantName = plant;
//             let  
//         })
//     }
// }

function draw() {
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
        console.log(data);
        //Getting dimension attributes that will be used for rendering
        gardenL = garden.length;
        gardenW = garden.width;
        canvasL = gardenL*100;
        canvasW = gardenW*100;

        
        //Generating array that will be used to render the actual garden visual
        for (plant of garden.Plants) {
            console.log(plant.GardenPlant.numberOfPlants)
            for (let i = 0; i < plant.GardenPlant.numberOfPlants; i++) {
                plantGardenData.push(plant.name);
            }
        };
        const canvas = createCanvas(canvasL, canvasW);
        canvas.parent('canvas-holder');

        // saveImageBtn = createButton("Save Canvas");
        // saveImageBtn.position(canvasL/2+85,canvasW*1.59);
        // saveImageBtn.mousePressed(saveAsCanvas);
        // saveImageBtn.parent('canvas-holder')
        // function saveAsCanvas() {
        //     save("output_canvas.png");
        // };
        background(40,23,11);
        const gardenBed = () => {
            for (let row=0; row < garden.length; row++) {
                for (let column=0; column < garden.width; column++) {
                    const xOffset = column*100;
                    const yOffset = row*100;
                    fill(40,23,11)
                    rect(yOffset,xOffset,100,100)
                }
            }
        };
        // console.log(garden.length); //8
        // console.log(garden.width); //4
        gardenBed();
        
        const plantRender = () => {
            plantGardenData.forEach((plant,index) => {
                const plantRow = Math.floor(index/garden.length); 
                const plantColumn = index % garden.length;
                const plantYOffset = plantRow*100;
                const plantXOffset = plantColumn*100;
                loadImage(`../../images/gardenOutput/${plant}.png`, img => {
                        image(img,plantXOffset,plantYOffset,100,100)
                    }
                );
            });
        };
        plantRender();
    }).catch(err=>{
        alert(err);
    })
    noLoop()   
}
//  function draw() {
//     gardenBed();
//     plantChoices();
//  }
// function setup() {
//     // const canvas = createCanvas(canvasW, canvasL);
//     // canvas.parent('canvas-holder')
//     // const pageLoc = document.getElementById("gardenImg");
//     // pageLoc.child(canvas);

//     saveImageBtn = createButton("Save Canvas");
//     saveImageBtn.position(gardenW/2, gardenL+35);
//     saveImageBtn.mousePressed(saveAsCanvas);

//     function saveAsCanvas() {
//         save("output_canvas.png");
//     };
// //     const gardenBed = function() {
// //         for (var row=0; row < garden.length; row++) {
// //             for (var column=0; column < garden.width; column++) {
// //                 const index = getIndex(row, column, garden.width);
// //                 const xOffset = column*100;
// //                 const yOffset = row*100;
// //                 const gardenBlock = gardenBlocks[index];
// //                 rect(xOffset,yOffset,100,100)
// //                 fill(40,23,11)
// //                 // plantChoices();
// //                 // image(plantImage,xOffset,yOffset)
// //                 // image from garden block
// //             }
// //         }
// //     };
// //     const plantChoices = () => {
// //         plantGardenData.forEach(plant => {
// //             const plantName = plant.name;
// //             const plantImage = loadImage(`../public/images/gardenOutput/${plantName}`);
// //             const plantRow = 0;
// //             const plantColumn = 0;
// //             function rowCounter() {
// //                 if(row < gardenL) {return plantRow++}
// //             }
// //             function columnCounter() {
// //                 if(column <gardenW) {return plantColumn++}
// //             }
// //             rowCounter();
// //             columnCounter();
// //             const plantYOffset = plantRow*100;
// //             const plantXOffset = plantColumn*100;
// //             image(plantImage, 100, 100);
// //         });
// //     };
// //     gardenBed();
// //     plantChoices();
// // };
