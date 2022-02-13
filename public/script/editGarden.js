

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