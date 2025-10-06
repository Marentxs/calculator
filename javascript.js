const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backButton = document.getElementById("back");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let previousOperator = "";
let justCalculated = "";

equalsButton.addEventListener("click", operate);
clearButton.addEventListener("click", clearDisplay);
backButton.addEventListener("click", clearEntry);

function clearDisplay() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  display.value = "";
}

function clearEntry() {
  if (secondNumber !== "") {
    secondNumber = secondNumber.toString().slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else {
    firstNumber = firstNumber.toString().slice(0, -1);
  }

  if (firstNumber === "" && operator === "" && secondNumber === "") {
    clearDisplay();
    justCalculated = false;
    return;
  }
  display.value = firstNumber + operator + secondNumber;
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
    result = parseFloat(add(a, b));
  } else if (operator === "-") {
    result = parseFloat(substract(a, b));
  } else if (operator === "*") {
    result = parseFloat(multiply(a, b));
  } else if (operator === "/") {
    if (b === 0) {
      display.value = "Zero says no.";
      firstNumber = "";
      secondNumber = "";
      operator = "";
      return;
    }
    result = parseFloat(divide(a, b).toFixed(2));
  } else {
    result = firstNumber;
  }

  display.value = result;
  firstNumber = result;
  operator = "";
  secondNumber = "";
  justCalculated = true;
}

function input(value, type) {
  let previousOperator = operator;

  if (
    value === "." &&
    ((operator === "" && firstNumber.includes(".")) ||
      (operator !== "" && secondNumber.includes(".")))
  ) {
    return;
  }

  if (value === "-" && firstNumber === "" && operator === "") {
    firstNumber = value;
    display.value = firstNumber;
    return;
  }

  if (
    type === "operator" &&
    operator !== "" &&
    firstNumber !== "" &&
    secondNumber !== ""
  ) {
    operate(previousOperator);
    operator = value;
    justCalculated = false;
  }

  if (type === "number" && justCalculated === true) {
    firstNumber = value;
    justCalculated = false;
    display.value = firstNumber;
    return;
  }

  if (type === "operator" && justCalculated === true) {
    operator += value;
    justCalculated = false;
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

document.addEventListener("keydown", (event) => {
  if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
    input(event.key, "number");
  }
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    input(button.value, "operator");
  });
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" ||
    event.key === "*" ||
    event.key === "-" ||
    event.key === "+"
  ) {
    input(event.key, "operator");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    operate();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    clearEntry();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearDisplay();
  }
});
