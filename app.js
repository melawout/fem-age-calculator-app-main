const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = parseInt(String(currentDate.getMonth() + 1).padStart(2, '0'));
const currentDay = parseInt(String(currentDate.getDate()).padStart(2, '0'));

// Selecting DOM elements (no parseInt needed here)
const errorDay = document.querySelector('.error-day');
const errorMonth = document.querySelector('.error-month');
const errorYear = document.querySelector('.error-year');

const errorRequiredDay = document.querySelector('.error-day-required');
const errorRequiredMonth = document.querySelector('.error-month-required');
const errorRequiredYear = document.querySelector('.error-year-required');

const errorValidDate = document.querySelector('.error-valid-date');

function getInputValues() {
  // Declare the input values using 'let' so they can be reassigned
  let day = document.getElementById('day').value;
  let month = document.getElementById('month').value;
  let year = document.getElementById('year').value;

  // Check if fields are empty
  if (isEmpty(day, month, year)) {
    return false
  }

  if(!isValid(day, month, year)) {
    return false
  }

  if(!inputValidation(day, month, year)){
    return false
  }

  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);

    console.log(typeof(day)); // Should be number now
    console.log(typeof(month)); // Should be number now
    console.log(typeof(year)); // Should be number now

    calculateTime(day, month, year)
}

// Function to check if the fields are empty
function isEmpty(day, month, year) {
  let emptyFlag = false;

  if (day === "") {
    errorRequiredDay.style.display = 'block';
    emptyFlag = true;
  } else {
    errorRequiredDay.style.display = 'none';
  }

  if (month === "") {
    errorRequiredMonth.style.display = 'block';
    emptyFlag = true;
  } else {
    errorRequiredMonth.style.display = 'none';
  }

  if (year === "") {
    errorRequiredYear.style.display = 'block';
    emptyFlag = true;
  } else {
    errorRequiredYear.style.display = 'none';
  }

  // Return true if any of the fields are empty
  return emptyFlag;
}

// Function check if it is a valid date
function isValid(day, month, year){
  let validFlag = true

  if(isNaN(day) || isNaN(month) || isNaN(year)){
    errorValidDate.style.display = 'block'
    
    return false
  }else{
    errorValidDate.style.display = 'none'
  }

  return true
}


// Function to check invidual user input
function inputValidation(day, month, year){
  let validFlag = true

  if(day < 1 || day > 31){
    errorDay.style.display = 'block'
    validFlag = false
  }else{
    errorDay.style.display = 'none'
  }
  
  if(month < 1 || month > 12){
    errorMonth.style.display = 'block'
    validFlag = false
  }else{
    errorMonth.style.display = 'none'
  }
  
  if(year > currentYear){
    errorYear.style.display = 'block'
    validFlag = false
  }else{
    errorYear.style.display = 'none'
  }

  if(!validFlag){
    return false
  }

  return true
}

// Function to calculate years (example)
function calculateTime(day, month, year) {

  let resultYear = currentYear - year
  let resultMonth = currentMonth - month
  let resultDay = currentDay - year



  document.querySelector('.result-days').textContent = resultDay
  document.querySelector('.result-months').textContent = resultMonth
  document.querySelector('.result-years').textContent = resultYear;
}
