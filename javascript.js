
// Variables

let number1;
let number2;
let operator;
let totalValue;
let displayValue;
let totaled = false;

// HTML Document Elements

// Number Elements 0-9
const buttonNumbers = Array.from(document.querySelectorAll(".number"));
buttonNumbers.map(element => {
    element.addEventListener("click", onNumberClick);
})

// Operator Elements
const buttonOperators = Array.from(document.querySelectorAll(".operator"));
buttonOperators.map(element => {
    element.addEventListener("click", onOperatorClick);
})

// Screen Elements
const screenTotal = document.querySelector(".numberTotal");

// Screen Preview
const screenPreview = document.querySelector(".totalPreview");

// Total Button
const buttonTotal = document.querySelector(".total");
buttonTotal.addEventListener("click", total);

// Clear Button
const buttonClear = document.querySelector(".clear");
buttonClear.addEventListener("click", clearCalculator);

// Delete Button
const buttonBackspace = document.querySelector(".backspace");
buttonBackspace.addEventListener("click", backspace);

// Decimal Button
const buttonDecimal = document.querySelector(".decimal");
buttonDecimal.addEventListener("click", addDecimal);

// Negative or Positive Button
const buttonNegative = document.querySelector(".negative");
buttonNegative.addEventListener("click", makeNegative);

// Operation Functions

// Function to add two numbers and return the total
function add(num1, num2) {
    return num1 + num2;
}

// Function to subtract number 1 from number 2 and return the total
function subtract(num1, num2) {
    return num1 - num2;
}

// Function to multiply two numbers and return the total
function multiply(num1, num2) {
    return num1 * num2;
}

// Function to divide two numbers and return the total
function divide(num1, num2) {
    return num1 / num2;
}

// Function to multiply number1 by the power of number2
function power(num1, num2) {
    return Math.pow(num1, num2);
}

// Perform currently operation with number1 and number2
function total(){
    updateNumberValues();
    
    if (operator === "/" && number2 === 0) {
        clearCalculator();
        screenTotal.textContent = "No";
        return;
    }

    if (number1 && number2 ){
        totalValue = operate(operator, number1, number2);
        screenTotal.textContent = totalValue;  
        totaled = true;
        updatePreview(); 
    }
}

// Function that performs an operation on two numbers
function operate(oper, num1, num2) {
    let result;
    switch(oper) {
        case "+":
            result = add(num1, num2);
            break;

        case "-":
            result = subtract(num1, num2);
            break;
        
        case "x":
            result = multiply(num1, num2);
            break;

        case "/":
            result = divide(num1, num2);
            break;

        case "^":
            result = power(num1, num2);
            break;
    }
    return Number(result.toFixed(9));
}

// Update Display Value based on numbers clicked
function onNumberClick(element){

    let numberClicked = element.target.innerText;

    if (totaled === true){
        clearCalculator();
    }

    if (!displayValue) {
        displayValue = numberClicked;
    } else {
        displayValue += numberClicked;
    }

    updatePreview(numberClicked);
    updateScreenTotal(displayValue);
}

// Perform operation based on operator clicked
function onOperatorClick(element) {

    let tempOperator = element.target.innerText;
    total();
    totaled = false;
    updatePreview(tempOperator);
    operator = tempOperator; 
}

// Clear all values of the calculator and reset
function clearCalculator() {
    displayValue = null;
    screenTotal.textContent = 0;
    screenPreview.textContent = 0;
    number1 = null;
    number2 = null;
    totalValue = undefined;
    totaled = false;
}

// Remove last number from display value
function backspace(){
    if (totaled === false && displayValue != null){
        displayValue = displayValue.slice(0,-1);
        screenPreview.textContent = displayValue;
        updateScreenTotal(displayValue);
        
    }
}

// Add a decimal point to currently display value
function addDecimal(element){
    if (!displayValue) {
        displayValue = "0"
    }
    if (!displayValue.includes(".")) {
        displayValue += element.target.innerText;
        updatePreview(element.target.innerText);
        updateScreenTotal(displayValue);
    }
}

// Makes the current display value negative / positive 
function makeNegative() {
    if (displayValue) {
        if (!displayValue.includes("-")) {
            displayValue = "-" + displayValue;
            screenPreview.textContent = "-" + screenPreview.textContent
            updateScreenTotal(displayValue);
        } else {
            displayValue = displayValue.slice(1);
            screenPreview.textContent = screenPreview.textContent.slice(1);
            updateScreenTotal(displayValue);
        }
    }  
}

// Functions Update Screen

// Update Number1 and Number2 based on DisplayValue
function updateNumberValues(){
    if (totalValue > -Infinity) {
        number1 = totalValue;
    }

    if (!number1) {
        number1 = Number(displayValue);
        displayValue = null;
    } else {
        number2 = Number(displayValue);
        displayValue = null;
    }
}

// Update screen preview with or without operators
function updatePreview(input) {
    if (totaled === true) {
        screenPreview.textContent = totalValue;
    } else {
        if (screenPreview.textContent == 0){
            screenPreview.textContent = "";
        }

        screenPreview.textContent += input;
    }
}

function updateScreenTotal(input) {
    screenTotal.textContent = input;
    if (screenTotal.textContent.length === 0) {
        screenTotal.textContent = 0;
    }
}