

//createGarden Form elements
const titleBox = document.getElementById('newTitle');
const descriptionBox = document.getElementById('newDesc');
const shapeBox = document.getElementById('newShape');
const sunLevelBox = document.getElementById('newSun');
const title = titleBox.value;
const description = descriptionBox.value;
const plantChoice = document.querySelectorAll('.plantChoice');
const sunLevel = sunLevelBox.value;
const vegList = document.getElementById('plantBox').value;
const newFormSubmit = document.getElementById('getGarden');

//createGarden measurement collection label elements
const measQuesBox = document.getElementById('measQues');
const squareLabel = document.getElementById('square');
const rectShortSideLabel = document.getElementById('rectShort');
const rectLongSideLabel = document.getElementById('rectLong');


const liBox = document.querySelectorAll('.plantLI')
const howMany = document.querySelectorAll('.how-many')
const secNumInpt = document.querySelectorAll('.plant-num-input');
const infoBox = document.querySelectorAll('.info-box');
const numDispBox = document.getElementById('num-disp-box');
const hiddenNum = document.querySelectorAll('.hidden-num');
// const secOptions = [];
const placeholderOption = document.querySelectorAll('.placeholder');

//createGarden measurement value collection boxes
const len = document.getElementById('len');
const wid = document.getElementById('wid');


const resetColorAll = () => {
    liBox.forEach(box=> {
        box.setAttribute('style', 'display: flex; background-color: none');
    })
    howMany.forEach(p=>{
        p.setAttribute('style', 'visibility: hidden; width: 100%');
    })
    secNumInpt.forEach(sec=>{
        sec.setAttribute('style', 'visibility: hidden;height: 1.5rem')
    })
    infoBox.forEach(box=>{
        box.setAttribute('style', 'display: flex; align-items: center; width: 100%')
    })
}

const show = (el) => {
    el.style.display = 'inline';
}

const hide = (el) => {
    el.style.display = 'none';
}

//ensures a clear form at the beginning.
const init = () => {
    hide(measQuesBox)
    hide(squareLabel)
    hide(rectShortSideLabel)
    hide(rectLongSideLabel)
    hide(wid)

    titleBox.innerHTML = '';
    descriptionBox.innerHTML = '';
    shapeBox.value = '';
    sunLevelBox.value = '';
    resetColorAll();
}

//shows/hides appropriate boxes to collect bed measurements
const getMeasurements = () =>{
    if(shapeBox.value==='square'){
        show(measQuesBox)
        show(squareLabel)
        hide(rectShortSideLabel)
        hide(rectLongSideLabel)
        hide(wid)
    }
    if(shapeBox.value==='rectangle'){
        show(measQuesBox)
        hide(squareLabel)
        show(rectShortSideLabel)
        show(rectLongSideLabel)
        show(wid)
    }
}

const calcSections = e => {
    e.preventDefault();
    const findGardenArea = () => {
        const length = len.value
        const width = wid.value
        if(shapeBox.value==='square'){
            console.log('it\'s a square')
            const areaSqFt = length*length;
            return areaSqFt
        }
        if(shapeBox.value==='rectangle'){
            console.log('it\'s a rectangle')
            const areaSqFt = length*width;
            return areaSqFt
        }  
    }
    const gardSections = Math.floor(findGardenArea());
    console.log(`This garden has ${gardSections} sections`)
    numDispBox.textContent = gardSections;
}

// const removeOptions = (sec, val) => {
    // let ns;
    // while(ns=opt.nextSibling){
       
    // }
    // const options = document.querySelectorAll('.sec-options')
    // for(let i=0;i<val; i++){
    //     sec.lastChild.setAttribute('style', 'display:none')
    // }
    // for(let i=0; i<options.length; i++){
    //     opt.nextSibling(options[i]).remove();
    // }   
// }

// const addNewOptions = (el, val1, val2) => {
    // const options = document.querySelectorAll('.sec-options')
    // for(let i=1;i<=val1; i++){
        // const newVal = val2 + i;
        // const newOpt = document.createElement('option')
        // newOpt.setAttribute('value', `${newVal}`);
        // newOpt.setAttribute('class', 'sec-options');
        // newOpt.textContent = newVal

        // el.append(newOpt)
//     }
// }

const updateSections = (e, val) => {
    // e.preventDefault()
    let currentSections = parseInt(numDispBox.textContent);
    if((currentSections-val)<0){
        alert('That\'s too many sections!\nTake a look at what you have \navailable and try again.')
        e.target.value = '';
        return
    }
    console.log('numdispbox content is a ', numDispBox.textContent)
    currentSections = currentSections - val
    numDispBox.textContent = currentSections 
    // const newSections = e.target.value;
   
    // secNumInpt.forEach(inpt=> {
   
    //     addOptions(inpt);
    // })
    console.log('numdispbox content is a ', numDispBox.textContent)
    // secNumInpt.forEach(sec=>{
    //     removeOptions(sec, val);
    // })
    // if(parseInt(currentSections)<=0){
    //     document.getElementById('vis-amount-message').setAttribute('style', 'padding: 5px; color: olivedrab; display: none')
    //     document.getElementById('hidden-amount-message').setAttribute('style', 'display: block; border: 2px solid firebrick; color:firebrick; font-weight: bold')
    // } else {
    //     document.getElementById('vis-amount-message').setAttribute('style', 'padding: 5px; color: olivedrab; display: block')
    //     document.getElementById('hidden-amount-message').setAttribute('style', 'display: none; border: 2px solid firebrick; color:firebrick; font-weight: bold')
    // }
}

const addSectionsBack = val => {
    const currentSections = parseInt(numDispBox.textContent);
    const sectionsLeft = currentSections + val
    numDispBox.textContent = sectionsLeft;
    // secNumInpt.forEach(inpt=> {
   
    //     addNewOptions(inpt, val, currentSections);
    // })
}

//Posts the garden obj and sqitches to the garden output page
const saveGarden = async (obj) => {
    const response = await fetch(`/api/garden`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
  });
    if (response.ok) {
        console.log(`response OK!`)
    const newData = await response.json();
    console.log(newData)
    const res = await fetch(`/dashboard/gardens/${newData.id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        if (res.ok) {
        document.location.replace(`/dashboard/gardens/${newData.id}`);
        } else {
        alert(response.statusText);
        }
    } else {
    alert('Something went wrong!');
    }
}

//builds the garden obj
const buildNewGarden= (e) => {
    e.preventDefault();
    const plantArr = [];
    const buildPlantObjs = (plant) => {
        secNumInpt.forEach(sec=>{
            console.log('sec.value',sec.value)
            if(sec.dataset.indexNumber===plant.value){
                console.log('sec.value',sec.value)
                const newPlantValues = [plant.value, sec.value];
                console.log(`Here is a plant array: ${newPlantValues}`)
                plantArr.push(newPlantValues);
            }
        })
    }
    plantChoice.forEach(plant=> {
        if(plant.checked===true){
            buildPlantObjs(plant);
        }
    })
    console.log('plantArr',plantArr);
    

    console.log(plantArr);
    const newGarden = {
        title: titleBox.value,
        description: descriptionBox.value,
        shape: shapeBox.value,
        length: len.value,
        width: wid.value,
        sunLevel: sunLevelBox.value,
        plantsToAdd: plantArr
    }
    console.log(newGarden)
    saveGarden(newGarden);
}




const resetColor = (e) => {
    e.preventDefault();
    liBox.forEach(box=>{
        if(box.dataset.indexNumber===e.target.dataset.indexNumber){
            box.setAttribute('style', 'display: flex; background-color: none');
        }
    })
    howMany.forEach(p=> {
        if(p.dataset.indexNumber===e.target.dataset.indexNumber){
            p.setAttribute('style', 'visibility: hidden; width: 100%');
            console.log('p matches')
        }
    })
    secNumInpt.forEach(inpt=> {
        if(inpt.dataset.indexNumber===e.target.dataset.indexNumber){
            inpt.setAttribute('style', 'visibility: hidden; height: 1.5rem')
            if(inpt.value>0){
                addSectionsBack(parseInt(inpt.value))
                inpt.value = '';}
            console.log('inpt matches')
        }
    })
    infoBox.forEach(box=>{
        if(box.dataset.indexNumber===e.target.dataset.indexNumber){
            box.setAttribute('style', 'display: flex; align-items: center; width: 100%')
            console.log('box matches')
        }
    })
}

const changeLIColor = (e) => {
    e.preventDefault();
    liBox.forEach(box=>{
        if(box.dataset.indexNumber===e.target.dataset.indexNumber){
            box.setAttribute('style', 'display: flex; justify-content: start; background-color: #bccc48; border: 2px solid green');
        }
    })
    howMany.forEach(p=> {
        if(p.dataset.indexNumber===e.target.dataset.indexNumber){
            p.setAttribute('style', 'visibility: visible; width: 100%; font-size: 1rem; font-weight:bold');
            console.log(`change color p ${p.dataset.indexNumber} matches`)
        }
    })
    secNumInpt.forEach(inpt=> {
        if(inpt.dataset.indexNumber===e.target.dataset.indexNumber){
            inpt.setAttribute('style', 'border: 2px solid olivedrab; height: 1.5rem')
            console.log('change color inpt matches')
        }
    })
    infoBox.forEach(box=>{
        if(box.dataset.indexNumber===e.target.dataset.indexNumber){
            box.setAttribute('style', 'display: flex; align-items: center; width: 100%')
            console.log('change color box matches')
        }
    })
}

const clickBox = (e) => {
    console.log('into click box');
    e.preventDefault()
    plantChoice.forEach(choice=>{
        if(e.target.dataset.indexNumber===choice.value){
            console.log(`choice value: ${choice.value}`, `target index ${e.target.dataset.indexNumber}`)
            choice.click();
            console.log('is the choice checked',choice.checked)
            if(choice.checked===true){
                changeLIColor(e)
            } else {
                resetColor(e);
            }
        }
    })
}
 


// const filterInpt = (e) => {
//     const inptArr = [];
//     const inptIndex = e.target.dataset.indexNumber
//     inptArr.push(e.target.value);
//     const i = inptArr[inptArr.length-1]
//     console.log('i =',i)
//     updateSections(inptIndex, i)
// }

const addOptions = (inpt) => {
    // let numOpt = 0;
    const number = parseInt(numDispBox.textContent);
    console.log('number', number)
    for(let i=1; i<= number; i++){
        const choice = document.createElement('option')
        choice.setAttribute('value', `${i}`);
        choice.setAttribute('class', 'sec-options')
        
        choice.textContent = i;
        inpt.appendChild(choice);
    }
}

//measurement collection boxes will appear once the user has chosen a shape
shapeBox.addEventListener('change', getMeasurements)



len.addEventListener('change', e => {
    e.preventDefault();
    document.getElementById('vis-amount-message').setAttribute('style', 'padding: 5px; color: green; display: block');
    calcSections(e);

    infoBox.forEach(box=>{
        box.addEventListener('click', clickBox)
    });
    secNumInpt.forEach(inpt=> {
        addOptions(inpt);
        let prevValue;
        let newValue;

        inpt.addEventListener('mousedown', e => {
            // e.preventDefault();
            prevValue = e.target.value
            // hiddenNum.forEach(box=>{
            //     if(box.dataset.indexNumber===e.target.dataset.indexNumber){
            //         box.innerHTML = prevValue;
            //     }
            // })
            console.log('old', prevValue)
        })
        inpt.addEventListener('change', e=> {
            e.preventDefault()
            newValue = e.target.value;
            console.log('new', newValue)
            if(newValue>prevValue){
                console.log(newValue>prevValue)
                const difference = newValue - prevValue
                updateSections(e, difference)

            }
            if(prevValue>newValue){
                console.log(newValue>prevValue)
                const difference = prevValue - newValue
                addSectionsBack(difference)
            } else if(parseInt(numDispBox.textContent)===0){
                document.getElementById('vis-amount-message').setAttribute('style', 'padding: 5px; color: olivedrab; display: none')
                document.getElementById('hidden-amount-message').setAttribute('style', 'display: block; border: 2px solid firebrick; color:firebrick; font-weight: bold')
            } else {
                document.getElementById('vis-amount-message').setAttribute('style', 'padding: 5px; color: olivedrab; display: block')
                document.getElementById('hidden-amount-message').setAttribute('style', 'display: none; border: 2px solid firebrick; color:firebrick; font-weight: bold')
            }


                // if(e.key==="Backspace"){return}
                // console.log('inpt value', e.target.value)
                
    
            //     setTimeout(()=>{filterInpt(e)}, 500);
            // });
            // inpt.addEventListener('keydown', e => {
            //     if(e.key==="Backspace"){
            //         if(e.target.value===''){return}
            //         else{
            //             const sectionsToAdd = parseInt(e.target.value);
            //             addSectionsBack(sectionsToAdd)
            //         }
            //     }
            })
        
        
  
    });
});

//initiates obj build after form submission
newFormSubmit.addEventListener('click', e=>{
    if((title==='')||(shapeBox.value==='')||(len.value==='')||(sunLevel==='')){
        
        alert('Please make sure you\'ve filled out all the required fields correctly.')
    }
    buildNewGarden(e);
});

init();