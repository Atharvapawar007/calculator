//input
const input = document.querySelector("input");
input.value = "0";

//buttons
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalToButton = document.querySelector("#answer");
const backspaceButton = document.querySelector("#backspace");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#reset");

//variable
let num1 = 0;
let num2 = undefined;
let operator = undefined;

//flags
let hasEnteredOperator = false;

//operations
//1. number buttons
numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", () => {
        //if there's a 0 on the input screen
        if(input.value === "0"){
            input.value = "";
        }

        //if an operator is already selected
        const opt = document.querySelector(".selected");
        if(opt !== null){
            opt.classList.remove("selected");
            input.value = "";
            hasEnteredOperator = true;
        }

        const number = numberButton.innerText;
        input.value += number;

        if(hasEnteredOperator){
            num2 = input.value;
        }else{
            num1 = input.value;
        }
    })
})

//2. operator buttons
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {

        //if already entered the operator and the second number
        if(hasEnteredOperator && num2 !== undefined){
            num1 = calculateAnswer(num1, num2, operator);
            input.value = num1;
            hasEnteredOperator = false;
        }

        //If the same operator is already selected
        if(operatorButton.classList.contains("selected")){
            operatorButton.classList.remove("selected");
            operator = undefined;
        }else{
            //if an operator is already selected
            const opt = document.querySelector(".selected");
            if(opt !== null){
                opt.classList.remove("selected");
            }
            
            //select the operator
            operatorButton.classList.add("selected");
            operator = operatorButton.innerText;
        }
    })
})

//3. equalTo button
equalToButton.addEventListener("click", () => {
    input.value = calculateAnswer(num1, num2, operator);
    num1 = (input.value === "ERROR!" || input.value === "INFINITY") ? 0 : input.value;
    num2 = undefined;
    operator = undefined;
    hasEnteredOperator = false;
})

//4. backspace button
backspaceButton.addEventListener("click", () => {
    input.value = input.value.slice(0, -1);
    if(input.value === ""){
        input.value = "0";
    }
    if(hasEnteredOperator){
        num2 = input.value;
    }else{
        num1 = input.value;
    }
})

//5. dedcimal button
decimalButton.addEventListener("click", () => {
    let number = input.value;
    if(number !== "" && !number.includes(".")){
        number += ".";
        input.value = number;
    }
})

//6. clear button
clearButton.addEventListener("click", () => {
    //default state
    input.value = "0";
    num1 = 0;
    num2 = undefined;
    operator = undefined;
    hasEnteredOperator = false;
    
    //if an operator is already selected
    const opt = document.querySelector(".selected");
    if(opt !== null){
        opt.classList.remove("selected")
    }
})

//operational logic
function calculateAnswer(number1, number2, operator){
    if(number2 === undefined || operator === undefined){
        return "ERROR!";
    }else{
        const val1 = Number(number1);
        const val2 = Number(number2);
        let answer = 0;

        //addition
        if(operator === "+"){
            answer = val1 + val2;
        }
        //subtraction
        else if(operator === "-"){
            answer = val1 - val2;
        }
        //multiplication
        else if(operator === "×"){
            answer = val1 * val2;
        }
        //division
        else{
            if(val2 == 0){
                return "INFINITY";
            }else{
                answer = val1 / val2;
            }
        }

        //limit the digits to 7 post decimal point and truncate any ending zeroes
        answer = answer.toFixed(7);
        while(answer.includes(".") && (answer.endsWith("0") || answer.endsWith("."))){
            answer = answer.slice(0, -1);
        }
        return answer;
    }
}