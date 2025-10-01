const display = document.getElementById("display");

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}
