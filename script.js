let operand = null;
let firstNum = null;
let secondNum = null;
let operateCalled = false;
let lastAns = null;

function add(a, b){
    console.log(`function add called with a: ${a} and b: ${b}`);
    ans = a + b;
    console.log("Ans is:",ans);
    return ans;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (a == 0){
        return 0;
    }
    else if (b == 0){
        return "infinity";
    }
    else{
        return a / b;
    }
}

function operate(operator, a, b){
    operateCalled = true;
    console.log(`OPERATE called with operator: ${operator}, a: ${a}, b: ${b}`);
    console.log(`typeof a: ${typeof(a)}, typeof b: ${typeof(b)}`);
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
let numberBtns = document.querySelectorAll('.number')
numberBtns.forEach(function(currentBtn){
  currentBtn.addEventListener('click', numberBtnClicked)
});

function numberBtnClicked(e){
    if (operateCalled == true){
        //clear recent stuff
        document.getElementById("temp-input").innerHTML = "";
        document.getElementById("input").innerHTML = ""

    }
    let numSelected = e.target.innerHTML;    
    document.getElementById("temp-input").innerHTML += numSelected; 
    document.getElementById("input").innerHTML += numSelected;
}


// adding our event listener once an 'operand' is clicked:
let operandBtns = document.querySelectorAll('.op')
operandBtns.forEach(function(currentBtn){
  currentBtn.addEventListener('click', operandBtnClicked)
});

function operandBtnClicked(e){
    let opSelected = e.target.id;    
    console.log(`OP: ${opSelected}`);
    operand = opSelected;
    //show the op:
    document.getElementById("op-selected").innerHTML = e.target.innerHTML;
    //save the temp number:
    let numA = +(document.getElementById("temp-input").innerHTML)
    firstNum = numA;
    console.log(`Num A: ${numA}`);
    //clear the screen
    document.getElementById("input").innerHTML = "";
    document.getElementById("temp-input").innerHTML = "";
}


//listen for equal sign being clicked
document.getElementById("result").addEventListener("click", resultRequested);
function resultRequested() {
  //check if the first number was entered:
  if (firstNum !== null) {
    numB = +(document.getElementById("temp-input").innerHTML);
    secondNum = numB;
  }
  else{
    //pass
  }
  computedResult = operate(operand, firstNum, secondNum);
  console.log(`Computed result: ${computedResult}`);
  document.getElementById("input").innerHTML = "";
  document.getElementById("input").innerHTML = computedResult;

  // firstNum is now computed result
  firstNum = computedResult;
  operand = null;
  secondNum = null;  
//   operateCalled = false;
}