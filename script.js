const calculatorKeyLayout = [
  { label: "MC", action: "memory-clear", row: 1, column: 1 },
  { label: "MR", action: "memory-recall", row: 1, column: 2 },
  { label: "MS", action: "memory-store", row: 1, column: 3 },
  { label: "M+", action: "memory-add", row: 1, column: 4 },
  { label: "Backspace", action: "backspace", row: 2, column: 1 },
  { label: "CE", action: "clear-entry", row: 2, column: 2 },
  { label: "CA", action: "clear-all", row: 2, column: 3 },
  { label: "/", action: "operator", value: "/", row: 2, column: 4 },
  { label: "sqrt", action: "sqrt", row: 2, column: 5 },
  { label: "7", action: "digit", value: "7", row: 3, column: 1 },
  { label: "8", action: "digit", value: "8", row: 3, column: 2 },
  { label: "9", action: "digit", value: "9", row: 3, column: 3 },
  { label: "*", action: "operator", value: "*", row: 3, column: 4 },
  { label: "%", action: "percent", row: 3, column: 5 },
  { label: "4", action: "digit", value: "4", row: 4, column: 1 },
  { label: "5", action: "digit", value: "5", row: 4, column: 2 },
  { label: "6", action: "digit", value: "6", row: 4, column: 3 },
  { label: "-", action: "operator", value: "-", row: 4, column: 4 },
  { label: "1/x", action: "reciprocal", row: 4, column: 5 },
  { label: "1", action: "digit", value: "1", row: 5, column: 1 },
  { label: "2", action: "digit", value: "2", row: 5, column: 2 },
  { label: "3", action: "digit", value: "3", row: 5, column: 3 },
  { label: "+", action: "operator", value: "+", row: 5, column: 4 },
  { label: "=", action: "equals", row: 5, column: 5, rowSpan: 2 },
  { label: "0", action: "digit", value: "0", row: 6, column: 1, columnSpan: 2 },
  { label: "+/-", action: "sign", row: 6, column: 3 },
  { label: ".", action: "decimal", row: 6, column: 4 }
];

const periodicMainElements = [
  { number: 1, symbol: "H", name: "Hydrogen", row: 1, column: 1 },
  { number: 2, symbol: "He", name: "Helium", row: 1, column: 18 },
  { number: 3, symbol: "Li", name: "Lithium", row: 2, column: 1 },
  { number: 4, symbol: "Be", name: "Beryllium", row: 2, column: 2 },
  { number: 5, symbol: "B", name: "Boron", row: 2, column: 13 },
  { number: 6, symbol: "C", name: "Carbon", row: 2, column: 14 },
  { number: 7, symbol: "N", name: "Nitrogen", row: 2, column: 15 },
  { number: 8, symbol: "O", name: "Oxygen", row: 2, column: 16 },
  { number: 9, symbol: "F", name: "Fluorine", row: 2, column: 17 },
  { number: 10, symbol: "Ne", name: "Neon", row: 2, column: 18 },
  { number: 11, symbol: "Na", name: "Sodium", row: 3, column: 1 },
  { number: 12, symbol: "Mg", name: "Magnesium", row: 3, column: 2 },
  { number: 13, symbol: "Al", name: "Aluminum", row: 3, column: 13 },
  { number: 14, symbol: "Si", name: "Silicon", row: 3, column: 14 },
  { number: 15, symbol: "P", name: "Phosphorus", row: 3, column: 15 },
  { number: 16, symbol: "S", name: "Sulfur", row: 3, column: 16 },
  { number: 17, symbol: "Cl", name: "Chlorine", row: 3, column: 17 },
  { number: 18, symbol: "Ar", name: "Argon", row: 3, column: 18 },
  { number: 19, symbol: "K", name: "Potassium", row: 4, column: 1 },
  { number: 20, symbol: "Ca", name: "Calcium", row: 4, column: 2 },
  { number: 21, symbol: "Sc", name: "Scandium", row: 4, column: 3 },
  { number: 22, symbol: "Ti", name: "Titanium", row: 4, column: 4 },
  { number: 23, symbol: "V", name: "Vanadium", row: 4, column: 5 },
  { number: 24, symbol: "Cr", name: "Chromium", row: 4, column: 6 },
  { number: 25, symbol: "Mn", name: "Manganese", row: 4, column: 7 },
  { number: 26, symbol: "Fe", name: "Iron", row: 4, column: 8 },
  { number: 27, symbol: "Co", name: "Cobalt", row: 4, column: 9 },
  { number: 28, symbol: "Ni", name: "Nickel", row: 4, column: 10 },
  { number: 29, symbol: "Cu", name: "Copper", row: 4, column: 11 },
  { number: 30, symbol: "Zn", name: "Zinc", row: 4, column: 12 },
  { number: 31, symbol: "Ga", name: "Gallium", row: 4, column: 13 },
  { number: 32, symbol: "Ge", name: "Germanium", row: 4, column: 14 },
  { number: 33, symbol: "As", name: "Arsenic", row: 4, column: 15 },
  { number: 34, symbol: "Se", name: "Selenium", row: 4, column: 16 },
  { number: 35, symbol: "Br", name: "Bromine", row: 4, column: 17 },
  { number: 36, symbol: "Kr", name: "Krypton", row: 4, column: 18 },
  { number: 37, symbol: "Rb", name: "Rubidium", row: 5, column: 1 },
  { number: 38, symbol: "Sr", name: "Strontium", row: 5, column: 2 },
  { number: 39, symbol: "Y", name: "Yttrium", row: 5, column: 3 },
  { number: 40, symbol: "Zr", name: "Zirconium", row: 5, column: 4 },
  { number: 41, symbol: "Nb", name: "Niobium", row: 5, column: 5 },
  { number: 42, symbol: "Mo", name: "Molybdenum", row: 5, column: 6 },
  { number: 43, symbol: "Tc", name: "Technetium", row: 5, column: 7 },
  { number: 44, symbol: "Ru", name: "Ruthenium", row: 5, column: 8 },
  { number: 45, symbol: "Rh", name: "Rhodium", row: 5, column: 9 },
  { number: 46, symbol: "Pd", name: "Palladium", row: 5, column: 10 },
  { number: 47, symbol: "Ag", name: "Silver", row: 5, column: 11 },
  { number: 48, symbol: "Cd", name: "Cadmium", row: 5, column: 12 },
  { number: 49, symbol: "In", name: "Indium", row: 5, column: 13 },
  { number: 50, symbol: "Sn", name: "Tin", row: 5, column: 14 },
  { number: 51, symbol: "Sb", name: "Antimony", row: 5, column: 15 },
  { number: 52, symbol: "Te", name: "Tellurium", row: 5, column: 16 },
  { number: 53, symbol: "I", name: "Iodine", row: 5, column: 17 },
  { number: 54, symbol: "Xe", name: "Xenon", row: 5, column: 18 },
  { number: 55, symbol: "Cs", name: "Cesium", row: 6, column: 1 },
  { number: 56, symbol: "Ba", name: "Barium", row: 6, column: 2 },
  { number: 72, symbol: "Hf", name: "Hafnium", row: 6, column: 4 },
  { number: 73, symbol: "Ta", name: "Tantalum", row: 6, column: 5 },
  { number: 74, symbol: "W", name: "Tungsten", row: 6, column: 6 },
  { number: 75, symbol: "Re", name: "Rhenium", row: 6, column: 7 },
  { number: 76, symbol: "Os", name: "Osmium", row: 6, column: 8 },
  { number: 77, symbol: "Ir", name: "Iridium", row: 6, column: 9 },
  { number: 78, symbol: "Pt", name: "Platinum", row: 6, column: 10 },
  { number: 79, symbol: "Au", name: "Gold", row: 6, column: 11 },
  { number: 80, symbol: "Hg", name: "Mercury", row: 6, column: 12 },
  { number: 81, symbol: "Tl", name: "Thallium", row: 6, column: 13 },
  { number: 82, symbol: "Pb", name: "Lead", row: 6, column: 14 },
  { number: 83, symbol: "Bi", name: "Bismuth", row: 6, column: 15 },
  { number: 84, symbol: "Po", name: "Polonium", row: 6, column: 16 },
  { number: 85, symbol: "At", name: "Astatine", row: 6, column: 17 },
  { number: 86, symbol: "Rn", name: "Radon", row: 6, column: 18 },
  { number: 87, symbol: "Fr", name: "Francium", row: 7, column: 1 },
  { number: 88, symbol: "Ra", name: "Radium", row: 7, column: 2 },
  { number: 104, symbol: "Rf", name: "Rutherfordium", row: 7, column: 4 },
  { number: 105, symbol: "Db", name: "Dubnium", row: 7, column: 5 },
  { number: 106, symbol: "Sg", name: "Seaborgium", row: 7, column: 6 },
  { number: 107, symbol: "Bh", name: "Bohrium", row: 7, column: 7 },
  { number: 108, symbol: "Hs", name: "Hassium", row: 7, column: 8 },
  { number: 109, symbol: "Mt", name: "Meitnerium", row: 7, column: 9 },
  { number: 110, symbol: "Ds", name: "Darmstadtium", row: 7, column: 10 },
  { number: 111, symbol: "Rg", name: "Roentgenium", row: 7, column: 11 },
  { number: 112, symbol: "Cn", name: "Copernicium", row: 7, column: 12 },
  { number: 113, symbol: "Nh", name: "Nihonium", row: 7, column: 13 },
  { number: 114, symbol: "Fl", name: "Flerovium", row: 7, column: 14 },
  { number: 115, symbol: "Mc", name: "Moscovium", row: 7, column: 15 },
  { number: 116, symbol: "Lv", name: "Livermorium", row: 7, column: 16 },
  { number: 117, symbol: "Ts", name: "Tennessine", row: 7, column: 17 },
  { number: 118, symbol: "Og", name: "Oganesson", row: 7, column: 18 }
];

const periodicLanthanides = [
  { number: 57, symbol: "La", name: "Lanthanum", row: 8, column: 4 },
  { number: 58, symbol: "Ce", name: "Cerium", row: 8, column: 5 },
  { number: 59, symbol: "Pr", name: "Praseodymium", row: 8, column: 6 },
  { number: 60, symbol: "Nd", name: "Neodymium", row: 8, column: 7 },
  { number: 61, symbol: "Pm", name: "Promethium", row: 8, column: 8 },
  { number: 62, symbol: "Sm", name: "Samarium", row: 8, column: 9 },
  { number: 63, symbol: "Eu", name: "Europium", row: 8, column: 10 },
  { number: 64, symbol: "Gd", name: "Gadolinium", row: 8, column: 11 },
  { number: 65, symbol: "Tb", name: "Terbium", row: 8, column: 12 },
  { number: 66, symbol: "Dy", name: "Dysprosium", row: 8, column: 13 },
  { number: 67, symbol: "Ho", name: "Holmium", row: 8, column: 14 },
  { number: 68, symbol: "Er", name: "Erbium", row: 8, column: 15 },
  { number: 69, symbol: "Tm", name: "Thulium", row: 8, column: 16 },
  { number: 70, symbol: "Yb", name: "Ytterbium", row: 8, column: 17 },
  { number: 71, symbol: "Lu", name: "Lutetium", row: 8, column: 18 }
];

const periodicActinides = [
  { number: 89, symbol: "Ac", name: "Actinium", row: 9, column: 4 },
  { number: 90, symbol: "Th", name: "Thorium", row: 9, column: 5 },
  { number: 91, symbol: "Pa", name: "Protactinium", row: 9, column: 6 },
  { number: 92, symbol: "U", name: "Uranium", row: 9, column: 7 },
  { number: 93, symbol: "Np", name: "Neptunium", row: 9, column: 8 },
  { number: 94, symbol: "Pu", name: "Plutonium", row: 9, column: 9 },
  { number: 95, symbol: "Am", name: "Americium", row: 9, column: 10 },
  { number: 96, symbol: "Cm", name: "Curium", row: 9, column: 11 },
  { number: 97, symbol: "Bk", name: "Berkelium", row: 9, column: 12 },
  { number: 98, symbol: "Cf", name: "Californium", row: 9, column: 13 },
  { number: 99, symbol: "Es", name: "Einsteinium", row: 9, column: 14 },
  { number: 100, symbol: "Fm", name: "Fermium", row: 9, column: 15 },
  { number: 101, symbol: "Md", name: "Mendelevium", row: 9, column: 16 },
  { number: 102, symbol: "No", name: "Nobelium", row: 9, column: 17 },
  { number: 103, symbol: "Lr", name: "Lawrencium", row: 9, column: 18 }
];

const periodicBridgeCells = [
  { label: "57-71", caption: "La-Lu", row: 6, column: 3 },
  { label: "89-103", caption: "Ac-Lr", row: 7, column: 3 }
];

const periodicRowLabels = [
  { text: "Lanthanides", row: 8, columnStart: 1, columnSpan: 3 },
  { text: "Actinides", row: 9, columnStart: 1, columnSpan: 3 }
];

class Calculator {
  constructor(display) {
    this.display = display;
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
  }

  clearEntry() {
    this.displayValue = "0";
    this.error = false;
    this.updateDisplay();
  }

  clearAll() {
    this.reset();
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
    } else {
      if (this.displayValue === "0") {
        this.displayValue = digit;
      } else if (this.displayValue === "-0") {
        this.displayValue = `-${digit}`;
      } else {
        this.displayValue += digit;
      }
    }

    this.updateDisplay();
  }

  inputDecimal() {
    if (this.error) {
      this.displayValue = "0.";
      this.error = false;
      this.updateDisplay();
      return;
    }

    if (this.waitingForSecondOperand) {
      this.displayValue = "0.";
      this.waitingForSecondOperand = false;
    } else if (!this.displayValue.includes(".")) {
      this.displayValue += ".";
    }

    this.updateDisplay();
  }

  toggleSign() {
    if (this.error) {
      return;
    }

    if (this.displayValue.startsWith("-")) {
      this.displayValue = this.displayValue.slice(1);
    } else if (this.displayValue !== "0") {
      this.displayValue = `-${this.displayValue}`;
    }

    this.updateDisplay();
  }

  setOperator(nextOperator) {
    if (this.error) {
      this.error = false;
      this.operator = nextOperator;
      this.firstOperand = 0;
      this.waitingForSecondOperand = true;
      return;
    }

    const inputValue = parseFloat(this.displayValue);

    if (Number.isNaN(inputValue)) {
      return;
    }

    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performCalculation(this.operator, this.firstOperand, inputValue);
      if (result === null) {
        this.signalError();
        return;
      }
      this.firstOperand = result;
      this.displayValue = this.formatNumber(result);
    }

    this.operator = nextOperator;
    this.waitingForSecondOperand = true;
    this.updateDisplay();
  }

  calculateResult() {
    if (this.operator === null || this.waitingForSecondOperand) {
      return;
    }

    const secondOperand = parseFloat(this.displayValue);

    const result = this.performCalculation(this.operator, this.firstOperand, secondOperand);
    if (result === null) {
      this.signalError();
      return;
    }

    this.displayValue = this.formatNumber(result);
    this.firstOperand = result;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.updateDisplay();
  }

  performCalculation(operator, firstOperand, secondOperand) {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        if (secondOperand === 0) {
          return null;
        }
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  percent() {
    if (this.error) {
      return;
    }

    const current = parseFloat(this.displayValue);
    if (Number.isNaN(current)) {
      return;
    }

    let value = current / 100;
    if (this.firstOperand !== null && !this.waitingForSecondOperand) {
      value = (this.firstOperand * current) / 100;
    }

    this.displayValue = this.formatNumber(value);
    this.updateDisplay();
  }

  squareRoot() {
    if (this.error) {
      return;
    }

    const current = parseFloat(this.displayValue);
    if (current < 0) {
      this.signalError();
      return;
    }

    const value = Math.sqrt(current);
    this.displayValue = this.formatNumber(value);
    this.waitingForSecondOperand = false;
    this.updateDisplay();
  }

  reciprocal() {
    if (this.error) {
      return;
    }

    const current = parseFloat(this.displayValue);
    if (current === 0) {
      this.signalError();
      return;
    }

    const value = 1 / current;
    this.displayValue = this.formatNumber(value);
    this.waitingForSecondOperand = false;
    this.updateDisplay();
  }

  backspace() {
    if (this.error) {
      this.displayValue = "0";
      this.error = false;
      this.updateDisplay();
      return;
    }

    if (this.waitingForSecondOperand) {
      this.displayValue = "0";
      this.waitingForSecondOperand = false;
    } else {
      if (this.displayValue.length > 1) {
        this.displayValue = this.displayValue.slice(0, -1);
        if (this.displayValue === "-") {
          this.displayValue = "0";
        }
      } else {
        this.displayValue = "0";
      }
    }

    this.updateDisplay();
  }

  memoryStore() {
    if (this.error) {
      return;
    }

    const value = parseFloat(this.displayValue);
    if (!Number.isNaN(value)) {
      this.memory = value;
    }
  }

  memoryRecall() {
    this.displayValue = this.formatNumber(this.memory);
    this.waitingForSecondOperand = false;
    this.error = false;
    this.updateDisplay();
  }

  memoryClear() {
    this.memory = 0;
  }

  memoryAdd() {
    if (this.error) {
      return;
    }

    const value = parseFloat(this.displayValue);
    if (!Number.isNaN(value)) {
      this.memory += value;
    }
  }

  signalError() {
    this.displayValue = "Error";
    this.error = true;
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.updateDisplay();
  }

  formatNumber(value) {
    if (!Number.isFinite(value)) {
      return "Error";
    }

    const absValue = Math.abs(value);
    if ((absValue !== 0 && (absValue >= 1e10 || absValue < 1e-6))) {
      return value.toExponential(6).replace(/\+/, "");
    }

    const formatted = parseFloat(value.toFixed(10)).toString();
    return formatted.length > 14 ? value.toExponential(6).replace(/\+/, "") : formatted;
  }

  updateDisplay() {
    this.display.textContent = this.displayValue;
  }
}

function renderCalculatorKeys(container) {
  const fragment = document.createDocumentFragment();

  calculatorKeyLayout.forEach((config) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calculator__key";
    button.textContent = config.label;
    button.dataset.action = config.action;
    if (config.value !== undefined) {
      button.dataset.value = config.value;
    }

    const columnSpan = config.columnSpan || 1;
    const rowSpan = config.rowSpan || 1;
    button.style.gridColumn = `${config.column} / span ${columnSpan}`;
    button.style.gridRow = `${config.row} / span ${rowSpan}`;
    fragment.appendChild(button);
  });

  container.appendChild(fragment);
}

function renderPeriodicTable(container) {
  const fragment = document.createDocumentFragment();

  periodicRowLabels.forEach((label) => {
    const labelEl = document.createElement("div");
    labelEl.className = "periodic-table__label";
    labelEl.textContent = label.text;
    labelEl.style.gridColumn = `${label.columnStart} / span ${label.columnSpan}`;
    labelEl.style.gridRow = label.row;
    fragment.appendChild(labelEl);
  });

  periodicBridgeCells.forEach((bridge) => {
    const bridgeEl = document.createElement("div");
    bridgeEl.className = "periodic-table__bridge";
    bridgeEl.innerHTML = `<span>${bridge.label}</span><span>${bridge.caption}</span>`;
    bridgeEl.style.gridColumn = bridge.column;
    bridgeEl.style.gridRow = bridge.row;
    fragment.appendChild(bridgeEl);
  });

  const createElementCell = (element) => {
    const cell = document.createElement("div");
    cell.className = "periodic-table__element";
    cell.style.gridColumn = element.column;
    cell.style.gridRow = element.row;
    cell.innerHTML = `
      <span class="periodic-table__number">${element.number}</span>
      <span class="periodic-table__symbol">${element.symbol}</span>
      <span class="periodic-table__name">${element.name}</span>
    `;
    return cell;
  };

  periodicMainElements
    .concat(periodicLanthanides)
    .concat(periodicActinides)
    .sort((a, b) => a.row - b.row || a.column - b.column)
    .forEach((element) => {
      fragment.appendChild(createElementCell(element));
    });

  container.appendChild(fragment);
}

function setupCalculator() {
  const display = document.querySelector("[data-calculator-display]");
  const keys = document.querySelector("[data-calculator-keys]");

  if (!display || !keys) {
    return;
  }

  renderCalculatorKeys(keys);
  const calculator = new Calculator(display);

  keys.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case "digit":
        calculator.inputDigit(value);
        break;
      case "decimal":
        calculator.inputDecimal();
        break;
      case "operator":
        calculator.setOperator(value);
        break;
      case "equals":
        calculator.calculateResult();
        break;
      case "sign":
        calculator.toggleSign();
        break;
      case "percent":
        calculator.percent();
        break;
      case "sqrt":
        calculator.squareRoot();
        break;
      case "reciprocal":
        calculator.reciprocal();
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
      case "memory-store":
        calculator.memoryStore();
        break;
      case "memory-recall":
        calculator.memoryRecall();
        break;
      case "memory-clear":
        calculator.memoryClear();
        break;
      case "memory-add":
        calculator.memoryAdd();
        break;
      default:
        break;
    }
  });
}

function setupExhibitModal() {
  const modal = document.getElementById("periodic-table-modal");
  const triggers = document.querySelectorAll("[data-exhibit-trigger]");
  const dismiss = modal?.querySelector("[data-exhibit-dismiss]");
  let lastActiveElement = null;

  if (!modal) {
    return;
  }

  const periodicTableContainer = modal.querySelector("#periodic-table");
  if (periodicTableContainer && periodicTableContainer.childElementCount === 0) {
    renderPeriodicTable(periodicTableContainer);
  }

  const openModal = () => {
    lastActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.setAttribute("aria-hidden", "false");
    const focusTarget = dismiss || modal;
    focusTarget.focus({ preventScroll: true });
  };

  const closeModal = () => {
    modal.setAttribute("aria-hidden", "true");
    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus({ preventScroll: true });
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openModal());
  });

  dismiss?.addEventListener("click", () => closeModal());

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

document.addEventListener("DOMContentLoaded", () => {
  setupCalculator();
  setupExhibitModal();
});
