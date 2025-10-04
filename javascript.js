const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let previousOperator = "";

equalsButton.addEventListener("click", operate);
clearButton.addEventListener("click", clearDisplay);

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  display.value = "";
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate() {
  let result;
  let a = Number(firstNumber);
  let b = Number(secondNumber);

  if (operator === "+") {
    result = add(a, b);
  } else if (operator === "-") {
    result = substract(a, b);
  } else if (operator === "*") {
    result = multiply(a, b);
  } else if (operator === "/") {
    if (b === 0) {
      display.value = "Zero says no.";
      return;
    }
    result = parseFloat(divide(a, b).toFixed(2));
  }

  display.value = result;
  firstNumber = result;
  operator = "";
  secondNumber = "";
}

function input(value, type) {
  let previousOperator = operator;

  if (
    type === "operator" &&
    operator !== "" &&
    firstNumber !== "" &&
    secondNumber !== ""
  ) {
    operate(previousOperator);
    operator = value;
  }

  if (type === "operator") {
    operator = value;
  } else if (operator === "") {
    firstNumber += value;
  } else {
    secondNumber += value;
  }

  display.value = firstNumber + operator + secondNumber;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    input(button.value, "number");
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    input(button.value, "operator");
  });
});
