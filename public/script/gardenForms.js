//createGarden Form
const titleBox = document.getElementById('newTitle');
const descriptionBox = document.getElementById('newDesc');
const shapeBox = document.getElementById('newShape');
const sunLevelBox = document.getElementById('newSun');
const title = titleBox.value;
const description = descriptionBox.value;
// const shape = document.getElementById('newShape').value;

const sunLevel = sunLevelBox.value;
const vegList = document.getElementById('plantBox').value;
const newFormSubmit = document.getElementById('getGarden');

//createGarden measurement collection elements
const measQuesBox = document.getElementById('measQues');
const squareLabel = document.getElementById('square');
const rectShortSideLabel = document.getElementById('rectShort');
const rectLongSideLabel = document.getElementById('rectLong');
const circleDiamLabel = document.getElementById('circle');

//createGarden measurement values
const len = document.getElementById('len');
const wid = document.getElementById('wid');

const plantSel = [];

const show = (el) => {
    el.style.display = 'inline';
}

const hide = (el) => {
    el.style.display = 'none';
}

const init = () => {
    hide(measQuesBox)
    hide(squareLabel)
    hide(rectShortSideLabel)
    hide(rectLongSideLabel)
    hide(circleDiamLabel)
    hide(wid)

    titleBox.innerHTML = '';
    descriptionBox.innerHTML = '';
    shapeBox.value = '';
    sunLevelBox.value = '';
}

const getMeasurements = () =>{
    if(shapeBox.value==='circle'){
        show(measQuesBox)
        hide(squareLabel)
        hide(rectShortSideLabel)
        hide(rectLongSideLabel)
        show(circleDiamLabel)
        hide(wid)
    }
    if(shapeBox.value==='square'){
        show(measQuesBox)
        show(squareLabel)
        hide(rectShortSideLabel)
        hide(rectLongSideLabel)
        hide(circleDiamLabel)
        hide(wid)
    }
    if(shapeBox.value==='rectangle'){
        show(measQuesBox)
        hide(squareLabel)
        show(rectShortSideLabel)
        show(rectLongSideLabel)
        hide(circleDiamLabel)
        show(wid)
    }
}


const buildNewGarden= (e) => {
    e.preventDefault();
    const newGarden = {
        name: titleBox.value,
        description: descriptionBox.value,
        shape: shapeBox.value,
        length: len.value,
        width: wid.value,
        sun: sunLevelBox.value,
    }
    console.log(newGarden)
    saveGarden(newGarden);
}

const saveGarden = async (obj) => {
    const response = await fetch(`/dashboard/gardens/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
  });
  if (response.ok) {
      console.log(obj.name);
            document.location.replace(`/dashboard/gardens/new`);
            alert('yay!!')
          } else {
        
            alert('no new plan for you :(');
          }
}

shapeBox.addEventListener('change', getMeasurements)

document.querySelector('#newGarden').addEventListener('submit', buildNewGarden);

init();