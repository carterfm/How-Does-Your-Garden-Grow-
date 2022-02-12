const findArea = require('areashapes');

const findSquareArea = (len) => {
    const squareArea = findArea.square(len);
    return squareArea;
}
const findCircleArea = (len) => {
    const radius = len/2;
    const circleArea = findArea.circle(radius);
    return circleArea;
}
const findRectangleArea = (len, wid) => {
    const rectangleArea = findArea.rectangle(len, wid);
    return rectangleArea;
}

module.exports = {
    findSquareArea,
    findCircleArea,
    findRectangleArea
}