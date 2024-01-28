var currentBuffer = 0;
var currentUpperString = '';
var operands = [];
var actions = [];
var errorState = false;

const buttonHandlerNaN = () => {
    updateAndError('Not Implemented');
}

const buttonHandlerNumber = (button) => {
    const buttonNumberValue = button.textContent.valueOf();
    var displayValue = 0;
    displayValue = Number(buttonNumberValue) + Number(currentBuffer) * 10;
    currentBuffer = displayValue;
    updateDisplayLower(displayValue.valueOf());
}

const buttonHandlerValueSpecial = (button, valueString) => {
    switch(valueString){
        case 'pi':
            currentBuffer = Math.PI;
            updateDisplayLower(currentBuffer);
            break;
        case 'e':
            currentBuffer = Math.E;
            updateDisplayLower(currentBuffer);
            break;
    }
}

const buttonHandlerActionBasic = (button, actionString) => {
    if (currentBuffer != 0){
        operands.push(currentBuffer)
        actions.push(actionString)
        currentUpperString = currentUpperString + currentBuffer.toString() + ' ' + button.textContent + ' ';
        currentBuffer = 0;
        updateDisplayLower('')
        updateDisplayUpper(currentUpperString)
    } else {
        return;
    }
}

const buttonHandlerActionSpecial = (button, actionString) => {
    switch(actionString){
        case 'equals':
            operands.push(currentBuffer);
            updateAndSolve();
            break;
        case 'clear':
            updateAndClear();
            break;
        case 'backspace':
            if(currentBuffer > 0){
                currentBuffer = Math.floor(currentBuffer/10);
                updateDisplayLower(currentBuffer);
            } else if (errorState){
                updateAndClear();
            }
            break;
    }
}

const updateDisplayLower = (value) => {
    const display = document.getElementById("display-lower");
    display.textContent = value;
}

const updateDisplayUpper = (value) => {
    const display = document.getElementById("display-upper");
    display.textContent = value;
}


const updateAndSolve = () => {
    var leftOperand = operands[0];
    for (let index = 1; index < operands.length; ++index) {
        const element = operands[index];
        switch(actions[index - 1]){
            case 'addition':
                leftOperand = leftOperand + operands[index];
                break;
            case 'substraction':
                leftOperand = leftOperand - operands[index];
                break;
            case 'multiplication':
                leftOperand = leftOperand * operands[index];
                break;
            case 'division':
                leftOperand = leftOperand / operands[index];
                break;
        }
    }
    updateAndClear();
    updateDisplayLower(leftOperand);
}

const updateAndClear = () => {
    currentBuffer = 0;
    actionState = null;
    currentUpperString = '';
    operands = [];
    actions = [];
    updateDisplayUpper('');
    updateDisplayLower('');
    errorState = 0;
}

const updateAndError = (errorMsg) => {
    updateAndClear();
    var msg = 'Error'
    if(errorMsg != null){
        msg = errorMsg
    }
    updateDisplayLower(msg);
    errorState = true;
}

// custom config for the MTW app 
const mtwAppConfig = {
    border: true // app border in the MTW page                    
}

///////////////////////////////////////////////////////
// implement this functions in order to use private API        
const sendPrivateApiRequest = async () => {
    // your code here:
    // sendRequestToParent({ cat: 'getAssets' })
}        

const acceptPrivateApiResponse = async (data) => {
    // process received data here:
    // console.log(data)
}

// use this in order to send on document load
document.addEventListener('DOMContentLoaded', () => {
    // your code here:
    //sendRequestToParent({ method: 'getAssets' })
})