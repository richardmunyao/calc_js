let operand = null;
let firstNum = null;
let secondNum = null;
let lastAns = null;
let operating = false;
let screenCleared = false;

function add(a, b) {
    console.log(`function add called with a: ${a} and b: ${b}`);
    ans = a + b;
    console.log("Ans is:", ans);
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

function operate(operator, a, b) {
    console.log(`OPERATE called with operator: ${operator}, a: ${a}, b: ${b}`);
    console.log(`typeof a: ${typeof (a)}, typeof b: ${typeof (b)}`);
    switch (operator) {
        case "plus":
            console.log("doing plus things");
            ans = add(a, b);

            return ans;


        case "minus":
            ans = subtract(a, b);

            return ans;

        case "times":
            ans = multiply(a, b);

            return ans;

        case "divide":
            ans = divide(a, b);

            return ans;

        default:
            break;
    }
}


// adding our event listener for 'number' buttons:
let numberBtns = document.querySelectorAll('.number');
numberBtns.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', numberBtnClicked)
});

function numberBtnClicked(e) {
    let numSelected = e.target.innerHTML;
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
    currentBtn.addEventListener('click', operandBtnClicked)
});

function operandBtnClicked(e) {
    operating = true;
    let opSelected = e.target.id;
    console.log(`OP: ${opSelected}`);
    operand = opSelected;
    //show the op:
    document.getElementById("op-selected").innerHTML = e.target.innerHTML;
    screenCleared = false;
}


//listen for equal sign being clicked
document.getElementById("result").addEventListener("click", resultRequested);
function resultRequested() {

    computedResult = operate(operand, firstNum, secondNum);
    console.log(`Computed result: ${computedResult}`);
    document.getElementById("input").innerHTML = "";
    document.getElementById("input").innerHTML = computedResult;

    // firstNum is now computed result
    firstNum = computedResult;
    operand = null;
    secondNum = null;
    operating = false;
    screenCleared = false;

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
}