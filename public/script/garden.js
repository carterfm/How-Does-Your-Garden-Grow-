const gardenShape = document.getElementById('garden-shape').textContent;

const indPlantData = document.querySelectorAll('.inv-plant')
const plantIds = document.querySelectorAll('.plant-id')
const plantNames = document.querySelectorAll('.plant-name')
const numPlants = document.querySelectorAll('.num-plants')
const plantsPSF = document.querySelectorAll('.plant-psf')
const plantArr = [];

const buildPlants = () =>{
    plantIds.forEach(id=>{
        plantNames.forEach(name=>{
            numPlants.forEach(num=>{
                plantsPSF.forEach(quant=>{
                    if((id.dataset.indexNumber===name.dataset.indexNumber)&&(name.dataset.indexNumber===num.dataset.indexNumber)&&(num.dataset.indexNumber===quant.dataset.indexNumber)){
                        const plantObj = {
                            id: id.textContent,
                            name: name.textContent,
                            sections: num.textContent,
                            perSF: quant.textContent
                        }
                        console.log(plantObj)
                        plantArr.push(plantObj)
                    }
                })
            })
        })
    })
    console.log(plantArr)
}

//finding the area of the garden
// const findGardenArea = () => {
//     const length = document.getElementById('garden-length')
//     const width = document.getElementById('garden-width')
 
//     console.log(length);
//     const availableArea = () => {
//         if(gardenShape==='square'){
//             console.log('it\'s a square')
//             const areaFt = length*length;
//             return areaFt
//         }
//         if(gardenShape==='rectangle'){
//             console.log('it\'s a rectangle')
//             const areaFt = length*width;
//             return areaFt
//         }
//     }
    const findNumberOfPlants = () => {
        plantArr.forEach(plant=>{
            const indPlantPSF = plant.perSF;
            console.log(`${plant.name} can have ${indPlantPSF} plants per sq ft`)
            const numOfPlants = plant.sections*indPlantPSF;
            console.log(`number of ${plant.name} in this garden`, numOfPlants);

            const numberBox = document.querySelectorAll('.quantity-box');
            numberBox.forEach(box=>{
                if(box.dataset.indexNumber===plant.id){
                    box.textContent = numOfPlants;
                }
            })
        })
       
    }

//     const findAreaPerPlant = area=> {
//         console.log('area', area)
//         console.log('plantArr', plantArr)
//         const numOfTypes = plantArr.length;
//         console.log('numOfTypes', numOfTypes);

//         //finds the area in sqft that each plant type gets to fill (if evenly divided)
//         const areaPerSection = area/numOfTypes;
//         console.log(`There are ${numOfTypes} sections and ${areaPerSection} feet in each section`);
//         findNumberOfPlants(areaPerSection);
//     }
//     findAreaPerPlant(availableArea());
// }

//populate hrefs onto output
const getLinks = () => {
    const plantA = document.querySelectorAll('.plantLink');
    plantA.forEach(aTag => {
        plantArr.forEach(plant=>{
            if(aTag.dataset.indexNumber===plant.id){
                const titleArr = plant.name.split(' ');
                console.log(titleArr);
                const plantName = titleArr[0];
                const plantHref = `https://mynorthwestgarden.com/home/${plantName}`
                console.log(plantHref)

                console.log(true)
                aTag.setAttribute('href', `${plantHref}`)
                aTag.textContent = plantHref;
            }
        })
    })
}

// start by getting the data obj for the garden rendered in the hb file
buildPlants();
findNumberOfPlants();
getLinks();


