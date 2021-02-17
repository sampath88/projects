const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");
const decimal = keys.querySelector(".decimal");
keys.addEventListener("click", (e) => myCalculator(e, calculator));

function myCalculator(e, calculator) {
  if (e.target.closest("button")) {
    const displayValue = display.textContent;
    const key = e.target;
    const { type } = key.dataset;
    const { previousType } = calculator.dataset;

    if (type === "number") {
      if (key.classList.contains("decimal")) { delete key.dataset.type};
      if (
        displayValue === "0" ||
        previousType === "operator" ||
        previousType === "equal"
      ) {
        display.textContent = key.textContent;
      } else {
        display.textContent = displayValue + key.textContent;
      }
    }

    if (type === "operator") {
      decimal.dataset.type= "number";
      const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
      operatorKeys.forEach((el) => {
        el.dataset.state = "";
      });
      key.dataset.state = "selected";
      calculator.dataset.firstNumber = displayValue;

      calculator.dataset.operator = key.dataset.key;
    }

    if (type === "equal") {
      decimal.dataset.type= "number";
      const firstNumber = calculator.dataset.firstNumber;
      const secondNumber = displayValue;

      const operator = calculator.dataset.operator;
      console.log(firstNumber + secondNumber + operator);

      display.textContent =
        calculate(firstNumber, secondNumber, operator) || "0";

      const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
      operatorKeys.forEach((el) => {
        el.dataset.state = "";
      });
    }
    if (type === "clear") {
      decimal.dataset.type= "number";
      clear();
    }
    calculator.dataset.previousType = type;
  }
}

function calculate(firstNumber, secondNumber, operator) {
  var firstNumber = parseFloat(firstNumber);
  var secondNumber = parseFloat(secondNumber);
  if (operator === "plus") return firstNumber + secondNumber;
  if (operator === "minus") return firstNumber - secondNumber;
  if (operator === "times") return firstNumber * secondNumber;
  if (operator === "divide") return firstNumber / secondNumber;
}

function clear() {
  const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
  operatorKeys.forEach((el) => {
    el.dataset.state = "";
  });

  display.textContent = "0";
}
