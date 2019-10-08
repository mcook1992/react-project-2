"use strict";

//works in codepen--have to tinker to make sure it works with the type of data we're getting.
export function getAverageScore(array) {
  var brandNewArray = [];
  var alreadyInArray = false;
  array.forEach(element => {
    var currentDate = element.dateSubmitted;

    brandNewArray.forEach(elem => {
      //seeing if the current date of student answers has already been added to the Brand New Array
      if (elem.dateSubmitted == currentDate) {
        //if that date is already in the array, we add one count and one score to that value
        alreadyInArray = true;
        elem.value = elem.value + Number(element.answer);
        elem.countNumber++;
        elem.average = elem.value / elem.countNumber;
      }
    });

    if (alreadyInArray == false) {
      const newObject = {
        value: Number(element.answer),
        dateSubmitted: element.dateSubmitted,
        countNumber: 1,
        average: Number(element.answer)
      };
      brandNewArray.push(newObject);
    } else {
      alreadyInArray = false;
    }
  });

  console.log(brandNewArray);
  return brandNewArray;
}
