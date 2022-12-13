let operand = null;
let firstNum = null;
let secondNum = null;
let lastAns = null;
let operating = false;
let screenCleared = false;

function add(a, b) {
    console.log(`function add called with a: ${a} and b: ${b}`);
    ans = a + b;
    return ans;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a == 0) {
        return 0;
    }
    else if (b == 0) {
        return "To infinity and beyond...";
    }
    else {
        return a / b;
    }
}

// if answer is float, limit to 4dp and return
function isFloat(x) {
    if (!!(x % 1)) {
        return parseFloat(x).toFixed(4);
    }
    else { return x }
}

function operate(operator, a, b) {
    console.log(`OPERATE called with operator: ${operator}, a: ${a}, b: ${b}`);
    console.log(`typeof a: ${typeof (a)}, typeof b: ${typeof (b)}`);
    switch (operator) {
        case "plus":
        case "+":
            ans = add(a, b);
            result = isFloat(ans)
            return result;


        case "minus":
        case "-":
            ans = subtract(a, b);
            result = isFloat(ans)
            return result;

        case "times":
        case "*":
            ans = multiply(a, b);
            result = isFloat(ans)
            return result;

        case "divide":
        case "/":
            ans = divide(a, b);
            result = isFloat(ans)
            return result;
        default:
            break;
    }
}


// adding our event listener for 'number' buttons:
let numberBtns = document.querySelectorAll('.number');
numberBtns.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', inputEntered)
});

function numberSelected(someDigit) {
    let numSelected = someDigit;
    console.log("Number selected: ", numSelected);
    if (operating && screenCleared) {
        document.getElementById("input").innerHTML += numSelected;
        numB = +(document.getElementById("input").innerHTML);
        secondNum = numB;
        console.log(`Num B: ${numB}`);
    }

    else if (operating && !screenCleared) {
        document.getElementById("input").innerHTML = "";
        document.getElementById("input").innerHTML += numSelected;
        numB = +(document.getElementById("input").innerHTML);
        secondNum = numB;
        console.log(`Num B: ${numB}`);
        screenCleared = true;
    }

    else {
        if (!screenCleared) {
            document.getElementById("input").innerHTML = "";
            document.getElementById("input").innerHTML += numSelected;
            numA = +(document.getElementById("input").innerHTML);
            firstNum = numA;
            console.log(`Num A: ${numA}`);
            screenCleared = true;
        }
        else {
            // document.getElementById("temp-input").innerHTML += numSelected;
            document.getElementById("input").innerHTML += numSelected;
            numA = +(document.getElementById("input").innerHTML);
            firstNum = numA;
            console.log(`Num A: ${numA}`);
        }
    }

}


// adding our event listener once an 'operand' is clicked:
let operandBtns = document.querySelectorAll('.op')
operandBtns.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', operandEntered)
});

function operandEntered(e) {
    console.log("screenCleared status is: ", screenCleared);
    console.log("operating status is: ", operating);
    document.getElementById("dot").disabled = false;
    if (operating) {
        //do something

        numB = +(document.getElementById("input").innerHTML);
        secondNum = numB;
        console.log(`Num B: ${numB}`);
        computedResult = operate(operand, firstNum, secondNum);
        document.getElementById("input").innerHTML = computedResult;
        firstNum = computedResult;
    }

    operating = true;
    let opSelected = null;
    //is operand clicked or typed?
    if (e.type == 'click') { opSelected = e.target.id }
    if (e.type == 'keydown') { opSelected = e.key }
    console.log(`OP: ${opSelected}`);
    operand = opSelected;
    screenCleared = false;
}


//listen for equal sign being clicked
document.getElementById("result").addEventListener("click", resultRequested);
function resultRequested() {

    computedResult = operate(operand, firstNum, secondNum);
    console.log(`Computed result: ${computedResult}`);
    document.getElementById("input").innerHTML = "";
    document.getElementById("input").innerHTML = computedResult;
    console.log("Done compute, screenCleared: ", screenCleared);

    // firstNum is now computed result
    firstNum = computedResult;
    operand = null;
    secondNum = null;
    operating = false;
    screenCleared = false;
    // document.getElementById("dot").disabled = false;

}

// adding our event listener once an 'All Clear' is clicked:
let clearBtns = document.querySelectorAll('.clear')
clearBtns.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', clearBtnClicked)
});

function clearBtnClicked(e) {
    //reset everything to initial state:
    document.getElementById("input").innerHTML = "";
    document.getElementById("temp-input").innerHTML = "";
    document.getElementById("op-selected").innerHTML = "";
    operand = null;
    firstNum = null;
    secondNum = null;
    lastAns = null;
    operating = false;
    document.getElementById("dot").disabled = false;

}

//listen for dot (.) sign being clicked
document.getElementById("dot").addEventListener("click", decimalPoint);
function decimalPoint(e) {
    //prevent entering decimal twice:
    if (document.getElementById("input").innerHTML.includes('.')) {
        document.getElementById("dot").disabled = true;
    }
    else {
        document.getElementById("dot").disabled = false;
    }

}

//keyboard input:
document.addEventListener('keydown', inputEntered);

function inputEntered(e) {
    // console.log("Key pressed: ", e);
    if (e.type == 'click') {
        numberSelected(e.target.innerHTML);
    }

    else if (e.type == 'keydown') {
        //no operators for now
        if ((e.code).startsWith("Digit") || (e.code).startsWith("Numpad")) {

            //special case for operators
            let operators = ['+', '-', '/', '*']
            if (operators.includes(e.key)) { operandEntered(e) }
            else if (e.key == "Enter") { resultRequested() }
            else { numberSelected(e.key) }

        }
        
    }

}