const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let firstNumber = "";
let operator = "";
let secondNumber = "";
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
const decimal = document.querySelector("#decimal");
const backspace = document.querySelector("#backspace");
const percentage = document.querySelector("#percentage");

// ====================
// BUTTON HOVER
// ====================

const buttons = document.querySelectorAll(".number, .operator");

buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        button.style.opacity = "0.7";
    });

    button.addEventListener("mouseleave", () => {
        button.style.opacity = "1";
    });
});


// ====================
// NUMBER BUTTONS
// ====================

numbers.forEach(number => {
    number.addEventListener("click", () => {

        // Ignore special number buttons
        if (
            number.id === "decimal" ||
            number.id === "backspace"
        ) {
            return;
        }

        // If an operator has already been selected,
        // start entering the second number
        if (operator !== "") {
            secondNumber += number.textContent;
            display.textContent = secondNumber;
        } 
        
        else {
            firstNumber += number.textContent;
            display.textContent = firstNumber;
        }
    });
});


// ====================
// OPERATOR BUTTONS
// ====================

plus.addEventListener("click", () => {
    chooseOperator("+");
});

minus.addEventListener("click", () => {
    chooseOperator("-");
});

multiply.addEventListener("click", () => {
    chooseOperator("*");
});

divide.addEventListener("click", () => {
    chooseOperator("/");
});


// ====================
// CHOOSE OPERATOR
// ====================

function chooseOperator(selectedOperator) {

    // Don't allow operator without first number
    if (firstNumber === "") {
        return;
    }

    // If user already entered second number,
    // calculate before choosing another operator
    if (secondNumber !== "") {
        calculate();
    }

    operator = selectedOperator;
}


// ====================
// CALCULATE
// ====================

function calculate() {

    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);

    let result;

    if (operator === "+") {
        result = num1 + num2;
    }

    else if (operator === "-") {
        result = num1 - num2;
    }

    else if (operator === "*") {
        result = num1 * num2;
    }

    else if (operator === "/") {

        if (num2 === 0) {
            display.textContent = "Error";
            firstNumber = "";
            secondNumber = "";
            operator = "";
            return;
        }

        result = num1 / num2;
    }

    display.textContent = result;

    // Result becomes the new first number
    firstNumber = String(result);
    secondNumber = "";
    operator = "";
}


// ====================
// EQUALS
// ====================

const equals = document.querySelector("#equals");

equals.addEventListener("click", () => {

    if (
        firstNumber !== "" &&
        operator !== "" &&
        secondNumber !== ""
    ) {
        calculate();
    }
});


// ====================
// DECIMAL
// ====================

decimal.addEventListener("click", () => {

    if (operator === "") {

        if (!firstNumber.includes(".")) {
            firstNumber += ".";

            display.textContent = firstNumber;
        }

    } else {

        if (!secondNumber.includes(".")) {
            secondNumber += ".";

            display.textContent = secondNumber;
        }
    }
});


// ====================
// BACKSPACE
// ====================

backspace.addEventListener("click", () => {

    if (operator === "") {

        firstNumber = firstNumber.slice(0, -1);

        display.textContent = firstNumber;

    } else {

        secondNumber = secondNumber.slice(0, -1);

        display.textContent = secondNumber;
    }
});


// ====================
// PERCENTAGE
// ====================

percentage.addEventListener("click", () => {

    if (operator === "") {

        firstNumber = String(Number(firstNumber) / 100);

        display.textContent = firstNumber;

    } else {

        secondNumber = String(Number(secondNumber) / 100);

        display.textContent = secondNumber;
    }
});


// ====================
// CLEAR
// ====================

const clear = document.querySelector("#clear");

clear.addEventListener("click", () => {

    firstNumber = "";
    operator = "";
    secondNumber = "";

    display.textContent = "";
});