const input = document.querySelector("input");
input.value = 0;

let num1 = 0;
let num2 = undefined;
let opt = undefined;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".reset");
const answerButton = document.querySelector(".answer");

numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        const number = numberButton.innerText;

        if(input.value === "0" || input.value === "+" || input.value === "-" || input.value === "×" || input.value === "÷"){
            input.value = "";
        }
        input.value += number;

        if(opt === undefined){
            num1 = input.value;
        }else{
            num2 = input.value;
        }
    })
})

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {
        const operator = operatorButton.innerText;
        opt = operator;
        input.value = opt;
    })
})

clearButton.addEventListener("click", () => {
    input.value = "0";
    num1 = 0;
    num2 = undefined;
    opt = undefined;
})

answerButton.addEventListener("click", () => {
    if(opt === undefined && num2 === undefined){
        input.value = num1;
    }else if(num2 === undefined){
        input.value = "ERROR!";
    }else{
        let val1 = Number(num1);
        let val2 = Number(num2);

        let answer = 0;
        if(opt === "+"){
            answer = val1 + val2;
        }else if(opt === "-"){
            answer = val1 - val2;
        }else if(opt === "×"){
            answer = val1 * val2;
        }else{
            if(val2 === 0){
                answer = "ERROR!"
            }else{
                answer = val1 / val2;
            }
        }
        input.value = answer;
    }
    hasAnswered = true;
    num1 = 0;
    num2 = undefined;
    opt = undefined;
})