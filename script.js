var currentState = 0;
var actionState = null;
var leftOperand = 0;
var rightOperand = 0;

const buttonHandlerNumber = (button) => {
    const buttonNumberValue = button.textContent.valueOf();
    var displayValue = 0;
    if(actionState == null) {
        displayValue = Number(buttonNumberValue) + Number(leftOperand) * 10;
        leftOperand = displayValue;
    } else {
        displayValue = Number(buttonNumberValue) + Number(rightOperand) * 10;
        rightOperand = displayValue;
        
    }
    updateDisplayLower(displayValue.valueOf());
}

const buttonHandlerBasicAction = (button, actionString) => {
    if (actionState == null){
        actionState = actionString;
        updateDisplayUpper(leftOperand, button)
        updateDisplayLower('')
    } else {
        return;
    }
}

const updateDisplayLower = (value) => {
    const display = document.getElementById("display-lower");
    display.textContent = value.toString();
}

const updateDisplayUpper = (value, button) => {
    const display = document.getElementById("display-upper");
    display.textContent = display.textContent + value + " " + button.textContent + " "
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