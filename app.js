const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // No need to pad for internal logic
const currentDay = currentDate.getDate();

// Selecting DOM elements once
const errorElements = {
  day: document.querySelector('.error-day'),
  month: document.querySelector('.error-month'),
  year: document.querySelector('.error-year'),
  requiredDay: document.querySelector('.error-day-required'),
  requiredMonth: document.querySelector('.error-month-required'),
  requiredYear: document.querySelector('.error-year-required'),
  validDate: document.querySelector('.error-valid-date')
};

function getInputValues() {
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);

  // Validation checks
  if (isEmpty(day, month, year) || !isValid(day, month, year) || !isValidDate(day, month, year)) {
    return; // Exit early if any validation fails
  }

  calculateTime(day, month, year); // Proceed if everything is valid
}

function toggleError(element, isError) {
  element.style.display = isError ? 'block' : 'none';
}

// Check if any input field is empty
function isEmpty(day, month, year) {
  let isEmptyFlag = false;

  toggleError(errorElements.requiredDay, !day);
  toggleError(errorElements.requiredMonth, !month);
  toggleError(errorElements.requiredYear, !year);

  if (!day || !month || !year) {
    isEmptyFlag = true;
  }
  return isEmptyFlag;
}

// Check if day, month, and year are valid inputs
function isValid(day, month, year) {
  let isValidFlag = true;

  toggleError(errorElements.day, day < 1 || day > 31);
  toggleError(errorElements.month, month < 1 || month > 12);
  toggleError(errorElements.year, year > currentYear);

  if (day < 1 || day > 31 || month < 1 || month > 12 || year > currentYear) {
    isValidFlag = false;
  }

  return isValidFlag;
}

// Check if the date is valid, e.g., 30 days in April, February leap year rules
function isValidDate(day, month, year) {
  const monthsWith30Days = [4, 6, 9, 11]; // April, June, September, November

  if (monthsWith30Days.includes(month) && day > 30) {
    toggleError(errorElements.validDate, true);
    return false;
  }

  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (day > (isLeapYear ? 29 : 28)) {
      toggleError(errorElements.validDate, true);
      return false;
    }
  }

  toggleError(errorElements.validDate, false);
  return true;
}

// Function to calculate time difference from today
function calculateTime(day, month, year) {
  const resultYear = currentYear - year;
  let resultMonth = currentMonth - month;
  let resultDay = currentDay - day;

  if (resultMonth < 0) {
    resultMonth += 12;
    resultYear--;
  }

  if (resultDay < 0) {
    const daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate(); // Get last month's days
    resultDay += daysInLastMonth;
    resultMonth--;
  }

  document.querySelector('.result-days').textContent = resultDay < 10 ? `0${resultDay}` : resultDay;
  document.querySelector('.result-months').textContent = resultMonth < 10 ? `0${resultMonth}` : resultMonth;
  document.querySelector('.result-years').textContent = resultYear;
}
