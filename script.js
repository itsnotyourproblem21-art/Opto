const calculatorKeyLayout = [
  { label: "MC", action: "memory-clear", row: 1, column: 1 },
  { label: "MR", action: "memory-recall", row: 1, column: 2 },
  { label: "MS", action: "memory-store", row: 1, column: 3 },
  { label: "M+", action: "memory-add", row: 1, column: 4 },
  { label: "M-", action: "memory-subtract", row: 1, column: 5 },
  { label: "Backspace", action: "backspace", row: 2, column: 1, columnSpan: 2 },
  { label: "CE", action: "clear-entry", row: 2, column: 3 },
  { label: "C", action: "clear-all", row: 2, column: 4 },
  { label: "√", action: "sqrt", row: 2, column: 5 },
  { label: "7", action: "digit", value: "7", row: 3, column: 1 },
  { label: "8", action: "digit", value: "8", row: 3, column: 2 },
  { label: "9", action: "digit", value: "9", row: 3, column: 3 },
  { label: "/", action: "operator", value: "/", row: 3, column: 4 },
  { label: "%", action: "percent", row: 3, column: 5 },
  { label: "4", action: "digit", value: "4", row: 4, column: 1 },
  { label: "5", action: "digit", value: "5", row: 4, column: 2 },
  { label: "6", action: "digit", value: "6", row: 4, column: 3 },
  { label: "*", action: "operator", value: "*", row: 4, column: 4 },
  { label: "1/x", action: "reciprocal", row: 4, column: 5 },
  { label: "1", action: "digit", value: "1", row: 5, column: 1 },
  { label: "2", action: "digit", value: "2", row: 5, column: 2 },
  { label: "3", action: "digit", value: "3", row: 5, column: 3 },
  { label: "-", action: "operator", value: "-", row: 5, column: 4 },
  { label: "=", action: "equals", row: 5, column: 5, rowSpan: 2 },
  { label: "0", action: "digit", value: "0", row: 6, column: 1, columnSpan: 2 },
  { label: "+/-", action: "sign", row: 6, column: 3 },
  { label: ".", action: "decimal", row: 6, column: 4 },
  { label: "+", action: "operator", value: "+", row: 6, column: 5 }
];

const periodicElements = [
  { number: 1, symbol: "H", mass: "1.008", row: 1, column: 1 },
  { number: 2, symbol: "He", mass: "4.003", row: 1, column: 18 },
  { number: 3, symbol: "Li", mass: "6.94", row: 2, column: 1 },
  { number: 4, symbol: "Be", mass: "9.0122", row: 2, column: 2 },
  { number: 5, symbol: "B", mass: "10.81", row: 2, column: 13 },
  { number: 6, symbol: "C", mass: "12.011", row: 2, column: 14 },
  { number: 7, symbol: "N", mass: "14.007", row: 2, column: 15 },
  { number: 8, symbol: "O", mass: "15.999", row: 2, column: 16 },
  { number: 9, symbol: "F", mass: "18.998", row: 2, column: 17 },
  { number: 10, symbol: "Ne", mass: "20.180", row: 2, column: 18 },
  { number: 11, symbol: "Na", mass: "22.990", row: 3, column: 1 },
  { number: 12, symbol: "Mg", mass: "24.305", row: 3, column: 2 },
  { number: 13, symbol: "Al", mass: "26.982", row: 3, column: 13 },
  { number: 14, symbol: "Si", mass: "28.085", row: 3, column: 14 },
  { number: 15, symbol: "P", mass: "30.974", row: 3, column: 15 },
  { number: 16, symbol: "S", mass: "32.06", row: 3, column: 16 },
  { number: 17, symbol: "Cl", mass: "35.45", row: 3, column: 17 },
  { number: 18, symbol: "Ar", mass: "39.948", row: 3, column: 18 },
  { number: 19, symbol: "K", mass: "39.098", row: 4, column: 1 },
  { number: 20, symbol: "Ca", mass: "40.078", row: 4, column: 2 },
  { number: 21, symbol: "Sc", mass: "44.956", row: 4, column: 3 },
  { number: 22, symbol: "Ti", mass: "47.867", row: 4, column: 4 },
  { number: 23, symbol: "V", mass: "50.942", row: 4, column: 5 },
  { number: 24, symbol: "Cr", mass: "51.996", row: 4, column: 6 },
  { number: 25, symbol: "Mn", mass: "54.938", row: 4, column: 7 },
  { number: 26, symbol: "Fe", mass: "55.845", row: 4, column: 8 },
  { number: 27, symbol: "Co", mass: "58.933", row: 4, column: 9 },
  { number: 28, symbol: "Ni", mass: "58.693", row: 4, column: 10 },
  { number: 29, symbol: "Cu", mass: "63.546", row: 4, column: 11 },
  { number: 30, symbol: "Zn", mass: "65.38", row: 4, column: 12 },
  { number: 31, symbol: "Ga", mass: "69.723", row: 4, column: 13 },
  { number: 32, symbol: "Ge", mass: "72.630", row: 4, column: 14 },
  { number: 33, symbol: "As", mass: "74.922", row: 4, column: 15 },
  { number: 34, symbol: "Se", mass: "78.971", row: 4, column: 16 },
  { number: 35, symbol: "Br", mass: "79.904", row: 4, column: 17 },
  { number: 36, symbol: "Kr", mass: "83.798", row: 4, column: 18 },
  { number: 37, symbol: "Rb", mass: "85.468", row: 5, column: 1 },
  { number: 38, symbol: "Sr", mass: "87.62", row: 5, column: 2 },
  { number: 39, symbol: "Y", mass: "88.906", row: 5, column: 3 },
  { number: 40, symbol: "Zr", mass: "91.224", row: 5, column: 4 },
  { number: 41, symbol: "Nb", mass: "92.906", row: 5, column: 5 },
  { number: 42, symbol: "Mo", mass: "95.95", row: 5, column: 6 },
  { number: 43, symbol: "Tc", mass: "98", row: 5, column: 7 },
  { number: 44, symbol: "Ru", mass: "101.07", row: 5, column: 8 },
  { number: 45, symbol: "Rh", mass: "102.91", row: 5, column: 9 },
  { number: 46, symbol: "Pd", mass: "106.42", row: 5, column: 10 },
  { number: 47, symbol: "Ag", mass: "107.87", row: 5, column: 11 },
  { number: 48, symbol: "Cd", mass: "112.41", row: 5, column: 12 },
  { number: 49, symbol: "In", mass: "114.82", row: 5, column: 13 },
  { number: 50, symbol: "Sn", mass: "118.71", row: 5, column: 14 },
  { number: 51, symbol: "Sb", mass: "121.76", row: 5, column: 15 },
  { number: 52, symbol: "Te", mass: "127.60", row: 5, column: 16 },
  { number: 53, symbol: "I", mass: "126.90", row: 5, column: 17 },
  { number: 54, symbol: "Xe", mass: "131.29", row: 5, column: 18 },
  { number: 55, symbol: "Cs", mass: "132.91", row: 6, column: 1 },
  { number: 56, symbol: "Ba", mass: "137.33", row: 6, column: 2 },
  { number: 72, symbol: "Hf", mass: "178.49", row: 6, column: 4 },
  { number: 73, symbol: "Ta", mass: "180.95", row: 6, column: 5 },
  { number: 74, symbol: "W", mass: "183.84", row: 6, column: 6 },
  { number: 75, symbol: "Re", mass: "186.21", row: 6, column: 7 },
  { number: 76, symbol: "Os", mass: "190.23", row: 6, column: 8 },
  { number: 77, symbol: "Ir", mass: "192.22", row: 6, column: 9 },
  { number: 78, symbol: "Pt", mass: "195.08", row: 6, column: 10 },
  { number: 79, symbol: "Au", mass: "196.97", row: 6, column: 11 },
  { number: 80, symbol: "Hg", mass: "200.59", row: 6, column: 12 },
  { number: 81, symbol: "Tl", mass: "204.38", row: 6, column: 13 },
  { number: 82, symbol: "Pb", mass: "207.2", row: 6, column: 14 },
  { number: 83, symbol: "Bi", mass: "208.98", row: 6, column: 15 },
  { number: 84, symbol: "Po", mass: "209", row: 6, column: 16 },
  { number: 85, symbol: "At", mass: "210", row: 6, column: 17 },
  { number: 86, symbol: "Rn", mass: "222", row: 6, column: 18 },
  { number: 87, symbol: "Fr", mass: "223", row: 7, column: 1 },
  { number: 88, symbol: "Ra", mass: "226", row: 7, column: 2 },
  { number: 104, symbol: "Rf", mass: "267", row: 7, column: 4 },
  { number: 105, symbol: "Db", mass: "270", row: 7, column: 5 },
  { number: 106, symbol: "Sg", mass: "271", row: 7, column: 6 },
  { number: 107, symbol: "Bh", mass: "270", row: 7, column: 7 },
  { number: 108, symbol: "Hs", mass: "277", row: 7, column: 8 },
  { number: 109, symbol: "Mt", mass: "278", row: 7, column: 9 },
  { number: 110, symbol: "Ds", mass: "281", row: 7, column: 10 },
  { number: 111, symbol: "Rg", mass: "282", row: 7, column: 11 },
  { number: 112, symbol: "Cn", mass: "285", row: 7, column: 12 },
  { number: 113, symbol: "Nh", mass: "286", row: 7, column: 13 },
  { number: 114, symbol: "Fl", mass: "289", row: 7, column: 14 },
  { number: 115, symbol: "Mc", mass: "290", row: 7, column: 15 },
  { number: 116, symbol: "Lv", mass: "293", row: 7, column: 16 },
  { number: 117, symbol: "Ts", mass: "294", row: 7, column: 17 },
  { number: 118, symbol: "Og", mass: "294", row: 7, column: 18 },
  { number: 57, symbol: "La", mass: "138.91", row: 8, column: 4 },
  { number: 58, symbol: "Ce", mass: "140.12", row: 8, column: 5 },
  { number: 59, symbol: "Pr", mass: "140.91", row: 8, column: 6 },
  { number: 60, symbol: "Nd", mass: "144.24", row: 8, column: 7 },
  { number: 61, symbol: "Pm", mass: "145", row: 8, column: 8 },
  { number: 62, symbol: "Sm", mass: "150.36", row: 8, column: 9 },
  { number: 63, symbol: "Eu", mass: "151.96", row: 8, column: 10 },
  { number: 64, symbol: "Gd", mass: "157.25", row: 8, column: 11 },
  { number: 65, symbol: "Tb", mass: "158.93", row: 8, column: 12 },
  { number: 66, symbol: "Dy", mass: "162.50", row: 8, column: 13 },
  { number: 67, symbol: "Ho", mass: "164.93", row: 8, column: 14 },
  { number: 68, symbol: "Er", mass: "167.26", row: 8, column: 15 },
  { number: 69, symbol: "Tm", mass: "168.93", row: 8, column: 16 },
  { number: 70, symbol: "Yb", mass: "173.05", row: 8, column: 17 },
  { number: 71, symbol: "Lu", mass: "174.97", row: 8, column: 18 },
  { number: 89, symbol: "Ac", mass: "227", row: 9, column: 4 },
  { number: 90, symbol: "Th", mass: "232.04", row: 9, column: 5 },
  { number: 91, symbol: "Pa", mass: "231.04", row: 9, column: 6 },
  { number: 92, symbol: "U", mass: "238.03", row: 9, column: 7 },
  { number: 93, symbol: "Np", mass: "237", row: 9, column: 8 },
  { number: 94, symbol: "Pu", mass: "244", row: 9, column: 9 },
  { number: 95, symbol: "Am", mass: "243", row: 9, column: 10 },
  { number: 96, symbol: "Cm", mass: "247", row: 9, column: 11 },
  { number: 97, symbol: "Bk", mass: "247", row: 9, column: 12 },
  { number: 98, symbol: "Cf", mass: "251", row: 9, column: 13 },
  { number: 99, symbol: "Es", mass: "252", row: 9, column: 14 },
  { number: 100, symbol: "Fm", mass: "257", row: 9, column: 15 },
  { number: 101, symbol: "Md", mass: "258", row: 9, column: 16 },
  { number: 102, symbol: "No", mass: "259", row: 9, column: 17 },
  { number: 103, symbol: "Lr", mass: "266", row: 9, column: 18 }
];

const periodicBridges = [
  { label: "57-71", caption: "La-Lu", row: 6, column: 3 },
  { label: "89-103", caption: "Ac-Lr", row: 7, column: 3 }
];

const periodicRowLabels = [
  { text: "Lanthanides", row: 8, columnStart: 1, columnSpan: 3 },
  { text: "Actinides", row: 9, columnStart: 1, columnSpan: 3 }
];

class Calculator {
  constructor(display, memoryIndicator) {
    this.display = display;
    this.memoryIndicator = memoryIndicator;
    this.reset();
  }

  reset() {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.memory = 0;
    this.error = false;
    this.updateDisplay();
    this.updateMemoryIndicator();
  }

  clearEntry() {
    this.displayValue = "0";
    this.error = false;
    this.updateDisplay();
  }

  clearAll() {
    this.reset();
  }

  backspace() {
    if (this.error) {
      this.clearEntry();
      return;
    }
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = "0";
    }
    this.updateDisplay();
  }

  inputDigit(digit) {
    if (this.error) {
      this.displayValue = digit;
      this.error = false;
      this.updateDisplay();
      return;
    }

    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else if (this.displayValue === "0") {
      this.displayValue = digit;
    } else {
      this.displayValue += digit;
    }
    this.updateDisplay();
  }

  inputDecimal() {
    if (this.waitingForSecondOperand) {
      this.displayValue = "0.";
      this.waitingForSecondOperand = false;
      this.updateDisplay();
      return;
    }
    if (!this.displayValue.includes(".")) {
      this.displayValue += ".";
      this.updateDisplay();
    }
  }

  toggleSign() {
    if (this.displayValue === "0") return;
    this.displayValue = this.displayValue.startsWith("-")
      ? this.displayValue.slice(1)
      : `-${this.displayValue}`;
    this.updateDisplay();
  }

  applyPercent() {
    const value = parseFloat(this.displayValue);
    if (!Number.isFinite(value)) return;
    this.displayValue = (value / 100).toString();
    this.updateDisplay();
  }

  sqrt() {
    const value = parseFloat(this.displayValue);
    if (value < 0) {
      this.showError();
      return;
    }
    this.displayValue = Math.sqrt(value).toString();
    this.updateDisplay();
  }

  reciprocal() {
    const value = parseFloat(this.displayValue);
    if (value === 0) {
      this.showError();
      return;
    }
    this.displayValue = (1 / value).toString();
    this.updateDisplay();
  }

  handleOperator(nextOperator) {
    const inputValue = parseFloat(this.displayValue);
    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstOperand == null && Number.isFinite(inputValue)) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, inputValue, this.operator);
      if (this.error) {
        return;
      }
      this.displayValue = result.toString();
      this.firstOperand = result;
      this.updateDisplay();
    }

    this.waitingForSecondOperand = true;
    this.operator = nextOperator;
  }

  calculate(first, second, operator) {
    if (!Number.isFinite(first) || !Number.isFinite(second)) return 0;
    switch (operator) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        if (second === 0) {
          this.showError();
          return 0;
        }
        return first / second;
      default:
        return second;
    }
  }

  equals() {
    if (this.operator == null || this.waitingForSecondOperand) {
      return;
    }
    const inputValue = parseFloat(this.displayValue);
    const result = this.calculate(this.firstOperand, inputValue, this.operator);
    if (this.error) {
      return;
    }
    this.displayValue = result.toString();
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.updateDisplay();
  }

  memoryStore() {
    this.memory = parseFloat(this.displayValue) || 0;
    this.updateMemoryIndicator();
  }

  memoryRecall() {
    this.displayValue = this.memory.toString();
    this.error = false;
    this.waitingForSecondOperand = false;
    this.updateDisplay();
  }

  memoryClear() {
    this.memory = 0;
    this.updateMemoryIndicator();
  }

  memoryAdd() {
    this.memory += parseFloat(this.displayValue) || 0;
    this.updateMemoryIndicator();
  }

  memorySubtract() {
    this.memory -= parseFloat(this.displayValue) || 0;
    this.updateMemoryIndicator();
  }

  showError() {
    this.displayValue = "Error";
    this.error = true;
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.textContent = this.displayValue;
  }

  updateMemoryIndicator() {
    if (!this.memoryIndicator) return;
    this.memoryIndicator.textContent = this.memory !== 0 ? "M" : "";
  }
}

function createCalculatorKeys(container) {
  calculatorKeyLayout.forEach((key) => {
    const button = document.createElement("button");
    button.className = "calculator__key";
    button.type = "button";
    button.dataset.action = key.action;
    if (key.value) {
      button.dataset.value = key.value;
    }
    button.textContent = key.label;
    button.style.gridColumn = `${key.column}${key.columnSpan ? ` / span ${key.columnSpan}` : ""}`;
    button.style.gridRow = `${key.row}${key.rowSpan ? ` / span ${key.rowSpan}` : ""}`;
    if (key.columnSpan && key.columnSpan > 1) {
      button.classList.add("calculator__key--span-2");
    }
    if (key.rowSpan && key.rowSpan > 1) {
      button.classList.add("calculator__key--span-rows");
    }
    container.appendChild(button);
  });
}

function formatMass(mass) {
  return mass;
}

function buildPeriodicTable(container) {
  periodicElements.forEach((element) => {
    const cell = document.createElement("div");
    cell.className = "periodic-table__cell";
    cell.style.gridColumn = element.column;
    cell.style.gridRow = element.row;
    cell.setAttribute("role", "row");

    const number = document.createElement("span");
    number.className = "periodic-table__number";
    number.textContent = element.number;

    const symbol = document.createElement("span");
    symbol.className = "periodic-table__symbol";
    symbol.textContent = element.symbol;

    const mass = document.createElement("span");
    mass.className = "periodic-table__mass";
    mass.textContent = formatMass(element.mass);

    cell.append(number, symbol, mass);
    container.appendChild(cell);
  });

  periodicBridges.forEach((bridge) => {
    const cell = document.createElement("div");
    cell.className = "periodic-table__bridge";
    cell.style.gridColumn = bridge.column;
    cell.style.gridRow = bridge.row;
    cell.innerHTML = `<strong>${bridge.label}</strong><br />${bridge.caption}`;
    container.appendChild(cell);
  });

  periodicRowLabels.forEach((label) => {
    const cell = document.createElement("div");
    cell.className = "periodic-table__label";
    cell.style.gridColumn = `${label.columnStart} / span ${label.columnSpan}`;
    cell.style.gridRow = label.row;
    cell.textContent = label.text;
    container.appendChild(cell);
  });
}

function bindCalculator(calculator, container) {
  container.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.dataset.action) return;

    const action = target.dataset.action;
    switch (action) {
      case "digit":
        calculator.inputDigit(target.dataset.value || target.textContent || "");
        break;
      case "decimal":
        calculator.inputDecimal();
        break;
      case "operator":
        calculator.handleOperator(target.dataset.value || target.textContent || "");
        break;
      case "equals":
        calculator.equals();
        break;
      case "clear-entry":
        calculator.clearEntry();
        break;
      case "clear-all":
        calculator.clearAll();
        break;
      case "backspace":
        calculator.backspace();
        break;
      case "sign":
        calculator.toggleSign();
        break;
      case "percent":
        calculator.applyPercent();
        break;
      case "sqrt":
        calculator.sqrt();
        break;
      case "reciprocal":
        calculator.reciprocal();
        break;
      case "memory-clear":
        calculator.memoryClear();
        break;
      case "memory-recall":
        calculator.memoryRecall();
        break;
      case "memory-store":
        calculator.memoryStore();
        break;
      case "memory-add":
        calculator.memoryAdd();
        break;
      case "memory-subtract":
        calculator.memorySubtract();
        break;
      default:
        break;
    }
  });
}

function setupModal() {
  const triggers = document.querySelectorAll("[data-exhibit-trigger]");
  const dismissButtons = document.querySelectorAll("[data-exhibit-dismiss]");
  const modal = document.getElementById("periodic-table-modal");

  function openModal(trigger) {
    modal.setAttribute("aria-hidden", "false");
    modal.dataset.triggerId = trigger?.id || "";
    modal.focus();
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    const triggerId = modal.dataset.triggerId;
    if (triggerId) {
      const trigger = document.getElementById(triggerId);
      trigger?.focus();
    }
  }

  triggers.forEach((trigger, index) => {
    if (!trigger.id) {
      trigger.id = `exhibit-trigger-${index + 1}`;
    }
    trigger.addEventListener("click", () => openModal(trigger));
  });

  dismissButtons.forEach((button) => button.addEventListener("click", closeModal));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
}

function init() {
  const keypadContainer = document.querySelector("[data-calculator-keys]");
  const display = document.querySelector("[data-calculator-display]");
  const memoryIndicator = document.querySelector("[data-calculator-memory]");
  const periodicTableContainer = document.getElementById("periodic-table");

  if (!keypadContainer || !display || !periodicTableContainer) {
    return;
  }

  createCalculatorKeys(keypadContainer);
  const calculator = new Calculator(display, memoryIndicator);
  bindCalculator(calculator, keypadContainer);
  buildPeriodicTable(periodicTableContainer);
  setupModal();
}

document.addEventListener("DOMContentLoaded", init);
