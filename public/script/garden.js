
//finding the area of the garden
const findGardenArea = obj => {
    const length = parseInt(obj.length)
    const width = parseInt(obj.width)
    const plantArr = obj.Plants;
    console.log(length);
    const convFt = inches => {
        const sqFt = inches/144
        return sqFt;
    }
    const availableArea = () => {
        if(obj.shape==='square'){
            console.log('it\'s a square')
     
            const areaIn = length*length;
            console.log(`The area of this garden in inches is ${areaIn}`)
            const areaFt = convFt(areaIn);
            console.log(`The area of this garden in feet is ${areaFt}`);
            return areaFt
        }
        if(obj.shape==='rectangle'){
            console.log('it\'s a rectangle')
            //this is where we'll find area with npm package after we can get it linked
            const areaIn = length*width;
            const areaFt = convFt(areaIn);
            console.log(areaFt);
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
                    box.textContent = numOfPlants;
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
const getLinks = obj => {
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

//start by getting the data obj for the garden rendered in the hb file
const start = async () => {
    const title = document.getElementById('titleBox').textContent;
    console.log(title);
    await fetch(`/dashboard/gardens/info/${title}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
  
    })  .then(function (response) {
        return response.json();
        })
        .then(function (data) {
            console.log('garden', data);
            const garden = data;
            findGardenArea(garden);
            getLinks(garden);
      

    })  .catch(err=>{
        alert(err)
    })      

}

// const circle = findCircleArea(20);
// console.log(circle);

start();

