const indPlantData = document.querySelectorAll('.inv-plant')
const plantIds = document.querySelectorAll('.plant-id')
const plantNames = document.querySelectorAll('.plant-name')
const numPlants = document.querySelectorAll('.num-plants')
const plantArr = [];

const buildPlants = () =>{
    plantIds.forEach(id=>{
        plantNames.forEach(name=>{
            numPlants.forEach(num=>{
                if((id.dataset.indexNumber===name.dataset.indexNumber)&&(name.dataset.indexNumber===num.dataset.indexNumber)){
                    const plantObj = {
                        id: id.textContent,
                        name: name.textContent,
                        number: num.textContent
                    }
                    console.log(plantObj)
                    plantArr.push(plantObj)
                }
            })
        })
    })
}

//finding the area of the garden
const findGardenArea = () => {
    const length = document.getElementById('garden-length')
    const width = document.getElementById('garden-width')
 
    console.log(length);


    // const convFt = inches => {
    //     const sqFt = inches/144
    //     return sqFt;
    // }
    const availableArea = () => {
        if(obj.shape==='square'){
            console.log('it\'s a square')
     
            const areaFt = length*length;
            // console.log(`The area of this garden in inches is ${areaIn}`)
            // const areaFt = convFt(areaIn);
            // console.log(`The area of this garden in feet is ${areaFt}`);
            return areaFt
        }
        if(obj.shape==='rectangle'){
            console.log('it\'s a rectangle')
            //this is where we'll find area with npm package after we can get it linked
            const areaFt = length*width;
            // const areaFt = convFt(areaIn);
            // console.log(areaFt);
            return areaFt
        }
    }
    const findNumberOfPlants = (secArea) => {
        plantArr.forEach(plant=>{
            const plantsPerSqFt = plant.plantsPerSF;
            console.log(`${plant.name} can have ${plantsPerSqFt} plants per sq ft`)
            const numOfPlants = secArea*plantsPerSqFt;
            console.log(`number of ${plant.name} in this garden`, numOfPlants);

            const numberBox = document.querySelectorAll('.quantity-box');
            numberBox.forEach(box=>{
                if(parseInt(box.dataset.indexNumber)===plant.id){
                    box.textContent = Math.floor(numOfPlants);
                }
            })
        })
       
    }

    const findAreaPerPlant = area=> {
        console.log('area', area)
        console.log('plantArr', plantArr)
        const numOfTypes = plantArr.length;
        console.log('numOfTypes', numOfTypes);

        //finds the area in sqft that each plant type gets to fill (if evenly divided)
        const areaPerSection = area/numOfTypes;
        console.log(`There are ${numOfTypes} sections and ${areaPerSection} feet in each section`);
        findNumberOfPlants(areaPerSection);
    }
    findAreaPerPlant(availableArea());
}

//populate hrefs onto output
const getLinks = () => {
    const plantA = document.querySelectorAll('.plantLink');
    plantA.forEach(aTag => {
        obj.Plants.forEach(plant=>{
            if(parseInt(aTag.dataset.indexNumber)===plant.id){
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
// findGardenArea();
// getLinks();


