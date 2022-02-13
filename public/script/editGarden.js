//createGarden Form elements
const titleBox = document.getElementById('editTitle');
const descriptionBox = document.getElementById('editDesc');
const shapeBox = document.getElementById('editShape');
const sunLevelBox = document.getElementById('editSun');
const title = document.getElementById('title').innerHTML;
const description = document.getElementById('description').innerHTML;
const plantChoice = document.querySelectorAll('.editPlantChoice');
const sunLevel = document.getElementById('sunLevel').innerHTML;
const vegList = document.getElementById('editPlantBox').value;
const editFormSubmit = document.getElementById('editGarden');
const shape = document.getElementById('shape').innerHTML;
const id = document.getElementById('id').innerHTML;
const prevPlants = document.querySelectorAll('.garden-plant').innerHTML;
const prevPlantBox = document.getElementById('prevPlantBox');
const prevLength = document.getElementById('length').innerHTML;
const prevWidth = document.getElementById('width').innerHTML;



//createGarden measurement collection label elements
const measQuesBox = document.getElementById('editMeasQues');
const squareLabel = document.getElementById('square');
const rectShortSideLabel = document.getElementById('rectShort');
const rectLongSideLabel = document.getElementById('rectLong');

const len = document.getElementById('len');
const wid = document.getElementById('wid');


const show = (el) => {
    el.style.display = 'inline';
}

const hide = (el) => {
    el.style.display = 'none';
}

const getMeasurements = () =>{
    // if(shapeBox.value==='circle'){
    //     show(measQuesBox)
    //     hide(squareLabel)
    //     hide(rectShortSideLabel)
    //     hide(rectLongSideLabel)
    //     show(circleDiamLabel)
    //     hide(wid)
    // }
    if(shapeBox.value==='square'){
        show(measQuesBox)
        show(squareLabel)
        hide(rectShortSideLabel)
        hide(rectLongSideLabel)
        // hide(circleDiamLabel)
        hide(wid)
        wid.value='';
    }
    if(shapeBox.value==='rectangle'){
        show(measQuesBox)
        hide(squareLabel)
        show(rectShortSideLabel)
        show(rectLongSideLabel)
        // hide(circleDiamLabel)
        show(wid)
    }
}

const init = () => {

    titleBox.value = title;
    descriptionBox.value = description;
    shapeBox.value = shape;
    sunLevelBox.value = sunLevel;

    if(shapeBox.value==='square'){
        hide(rectShortSideLabel)
        hide(rectLongSideLabel)
        hide(wid)
        len.value = prevLength;

    }
    if(shapeBox.value==='rectangle'){
        hide(squareLabel)
        len.value = prevLength;
        wid.value = prevWidth;
    }
}

//Goes to view garden output page popped with new garden
const seeGarden = async (id) => {
    const response = await fetch(`/dashboard/gardens/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        if (response.ok) {
            console.log(response);
            document.location.replace(`/dashboard/gardens/${id}`);
        } else {
        alert(response.statusText);
        }
}

//Posts the garden obj and sqitches to the garden output page
const updateGarden = async (obj) => {
    const response = await fetch(`/api/garden/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
  });
  if (response.ok) {
      console.log(obj);
      seeGarden(id);
          } else {
        
            alert('Something went wrong!');
          }
}

//builds the garden obj
const buildUpdatedGarden= (e) => {
    e.preventDefault();
    const plantArr = [];
    plantChoice.forEach(plant => {
        if(plant.checked===true){
            plantArr.push(plant.value)
        }
    });
    console.log(plantArr);
    const updatedGarden = {
        title: titleBox.value,
        description: descriptionBox.value,
        shape: shapeBox.value,
        length: len.value,
        width: wid.value,
        sunLevel: sunLevelBox.value,
        plantIds: plantArr
    }
    console.log(updatedGarden)
    updateGarden(updatedGarden);
}

//measurement collection boxes will appear once the user has chosen a shape
shapeBox.addEventListener('change', getMeasurements)

//initiates obj build after form submission
document.getElementById('editGarden').addEventListener('submit', buildUpdatedGarden);

init()