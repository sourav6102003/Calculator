const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

const calculate = (btnValue) => {
  display.focus();

  if (btnValue === "=" || btnValue === "Enter") {
    if (output !== "") {
      output = eval(output.replace("%", "/100"));
    }
  } else if (btnValue === "AC" || btnValue === "Escape") {
    output = "";
  } else if (btnValue === "DEL" || btnValue === "Backspace") {
    output = output.toString().slice(0, -1);
  } else {
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};


buttons.forEach((button) => {
  button.addEventListener("click", (e) =>
    calculate(e.target.dataset.value));
});


document.addEventListener("keydown", (e) => {
  e.preventDefault();
  const key = e.key;

  if (!isNaN(key) || key === "." || specialChars.includes(key)) {
    calculate(key);
    highlightButton(key);
  } else if (key === "Enter") {
    calculate("=");
    highlightButton("=");
  } else if (key === "Backspace") {
    calculate("Backspace");
    highlightButton("DEL");
  } else if (key === "Escape") {
    calculate("Escape");
    highlightButton("AC");
  }
});


const highlightButton = (key) => {
  buttons.forEach((btn) => {
    if (btn.dataset.value === key ||
      (key === "Enter" && btn.dataset.value === "=") ||
      (key === "Backspace" && btn.dataset.value === "DEL") ||
      (key === "Escape" && btn.dataset.value === "AC")) {
      btn.classList.add("pressed");
      setTimeout(() => btn.classList.remove("pressed"), 150);
    }
  });
};
