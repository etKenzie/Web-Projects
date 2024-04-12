function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(a,b,operator) {
    switch(operator) {
        case '+':
            buttonAdd.classList.remove('active');
            return add(a,b);
        case '-':
            buttonSubtract.classList.remove('active');
            return subtract(a,b);
        case '*':
            buttonMultiply.classList.remove('active');
            return multiply(a,b);
        case '/':
            buttonDivide.classList.remove('active');
            return divide(a,b);
        default:
            return 0;
    }
}

function resetOperator() {
    buttonAdd.classList.remove('active');
    buttonSubtract.classList.remove('active');
    buttonMultiply.classList.remove('active');
    buttonDivide.classList.remove('active');
}


let firstNumber = null, secondNumber = null;
let operator;
let resetDisplay = false;
let repeat = false;

const display = document.querySelector('#calc-display');
const numbers = document.querySelectorAll('.number');

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (resetDisplay == true) {
            display.textContent = '';
            resetDisplay = false;
        }
        display.textContent += number.textContent;
    });
});

// Operator Buttons
const buttonClear = document.querySelector('#calc-operator-clear');
const buttonAdd = document.querySelector('#calc-operator-add');
const buttonSubtract = document.querySelector('#calc-operator-subtract');
const buttonMultiply = document.querySelector('#calc-operator-multiply');
const buttonDivide = document.querySelector('#calc-operator-divide');
const buttonEqual = document.querySelector('#calc-operator-equal');

buttonClear.addEventListener('click', (e) => {
    resetOperator();
    display.textContent = '';
    firstNumber = null, secondNumber = null;
    repeat = false;
});

buttonAdd.addEventListener('click', (e) => {
    resetOperator();
    firstNumber = parseInt(display.textContent);
    operator = '+';
    resetDisplay = true;
    buttonAdd.classList.add('active');
    repeat = false;
});

buttonSubtract.addEventListener('click', (e) => {
    resetOperator();
    firstNumber = parseInt(display.textContent);
    operator = '-';
    resetDisplay = true;
    buttonSubtract.classList.add('active');
    repeat = false;
});

buttonMultiply.addEventListener('click', (e) => {
    resetOperator();
    firstNumber = parseInt(display.textContent);
    operator = '*';
    resetDisplay = true;
    buttonMultiply.classList.add('active');
    repeat = false;
});

buttonDivide.addEventListener('click', (e) => {
    resetOperator();
    firstNumber = parseInt(display.textContent);
    operator = '/';
    resetDisplay = true;
    buttonDivide.classList.add('active');
    repeat = false;
});

buttonEqual.addEventListener('click', (e) => {
    if (repeat == false) {
        secondNumber = parseInt(display.textContent);
    }
    display.textContent = operate(parseInt(firstNumber), parseInt(secondNumber), operator);
    resetDisplay = true;
    console.log(firstNumber, secondNumber, operator);

    firstNumber = display.textContent
    repeat = true;
   
    resetOperator();
});

