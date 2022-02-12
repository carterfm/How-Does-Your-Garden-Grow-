// const findArea = require('areashapes');
// const {findSquareArea, findCircleArea, findRectangleArea} = require('../../utils/areas.js')
// const fakeFunction = require('./dashboard');

// fakeFunction();



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
            // this is where we'll find area with npm package after we can get it linked

            // const areaSquare = findSquareArea(length);
            // console.log(areaSquare);

            // const area=findArea.square(10);
            // console.log(area);

            const areaIn = length*length;
            const areaFt = convFt(areaIn);
            console.log(areaFt);
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
        if(obj.shape==='circle'){
            console.log('it\'s a circle')
            //this is where we'll find area with npm package after we can get it linked
            const radius = length/2
            const areaIn = 3.14159*radius**2;
            const areaFt = convFt(areaIn);
            console.log(areaFt);
            return areaFt
        }
    }
    const findNumberOfPlants = (secArea) => {
        plantArr.forEach(plant=>{
            const plantsPerSqFt = plant.plantsPerSF;
            console.log('plants per sq ft', plantsPerSqFt)
            const numOfPlants = secArea*plantsPerSqFt;
            console.log(`number of ${plant.name}`, numOfPlants);

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
        const areaPerSection = Math.floor(area/numOfTypes);
        console.log('areaPerSection',areaPerSection);
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
