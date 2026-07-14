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
        }

        const number = numberButton.innerText;
        input.value += number;
    })
})

//2. operator buttons
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => {

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
})

//4. backspace button
backspaceButton.addEventListener("click", () => {
    input.value = input.value.slice(0, -1);
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
    
    //if an operator is already selected
    const opt = document.querySelector(".selected");
    if(opt !== null){
        opt.classList.remove("selected")
    }
})

//operational logic
function calculateAnswer(number1, number2, operator){
    if(number2 === undefined || operator === undefined){
        input.value = "ERROR!";
    }else{
        const val1 = Number(number1);
        const val2 = Number(number2);

        if(operator === "+"){
            return val1 + val2;
        }else if(operator === "-"){
            return val1 - val2;
        }else if(operator === "×"){
            return val1 * val2;
        }else{
            if(num2 == 0){
                return "ERROR!"
            }else{
                const result = num1 / num2;
                return result.toFixed(4);
            }
        }
    }
}