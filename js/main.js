let displayCalculator = "" , displayNumber = "" ;
let result = 0 ;
let numbers = new Array() ;
let operand = new Array() ;
let number = '' ;
let counter = 0 ;
let checkedDisplay ;
let isOperand;
let lengthResult = 0;
document.addEventListener('keydown',function (entry) {
  if( ( entry.code === 'Enter' ) || ( entry.code === 'NumpadEnter' ) || ( entry.code === 'Equal' ) ) {
      calculatePhrase();
  } else if ( ( entry.key === 'Backspace' ) || ( entry.code == 'Delete' ) ) {
      clearOneNumber() ;
  } else if( entry.code === 'NumpadDivide' ) {
      inPutPhrase ( "÷" )
  } else if ( (entry.key <10 ) || ( entry.key == '.' ) || ( entry.code === "NumpadAdd" ) || ( entry.code === "NumpadSubtract" ) || ( entry.code === "NumpadMultiply" ) ) {
      inPutPhrase ( entry.key ) ;
  }
})
function inPutPhrase ( selectedButton ) {
    document.getElementById('outPut').innerText  = "";
    if(displayCalculator.length>1) {
        checkedDisplay = displayCalculator.slice(-1);
        if (((checkedDisplay < 10) || (checkedDisplay === ".")) && ((selectedButton < 10) || (selectedButton === '.'))) {
            let number = displayNumber;
            allClear();
            displayCalculator = number;
            document.getElementById('inPut').innerText = displayCalculator;
        }
    }

    if( ( result != 0 ) && ( result === result) ){
        displayCalculator = result ;
        document.getElementById('outPut').innerText  = "" ;
        numbers.push(result);
        lengthResult = result.toString().length;
        result = 0 ;

    }

    if( ( selectedButton < 10 ) || ( selectedButton === '.' ) ){

        displayNumber += selectedButton ;
        document.getElementById('displayNumber').innerText  = displayNumber ;
    } else {
        displayCalculator +=  displayNumber + selectedButton ;
        document.getElementById('inPut').innerText  = displayCalculator ;
        displayNumber = '' ;
    }

}
const clearOneNumber = () => {
    displayNumber = displayNumber.slice( 0 , -1 ) ;
    document.getElementById('displayNumber').innerText = displayNumber ;
}
function allClear () {
    document.getElementById('inPut').innerText = "" ;
    document.getElementById('outPut').innerText = "" ;
    document.getElementById('displayNumber').innerText = "" ;
    displayNumber = "" ;
    displayCalculator = "" ;
    number = "" ;
    counter = 0 ;
    result = 0 ;
    isOperand = "" ;
    numbers=[];
    operand=[];
}
function calculatePhrase () {
     checkedDisplay = displayCalculator.slice(-1) ;
    if ( ( checkedDisplay < 10 ) || ( checkedDisplay === "." ) ) {
        displayCalculator = displayNumber ;
        document.getElementById('inPut').innerText  = displayCalculator ;
        return ;
    }
    displayCalculator += displayNumber ;
    displayNumber = "" ;
    document.getElementById('inPut').innerText  = displayCalculator ;
    document.getElementById('displayNumber').innerText  = "" ;
    if( lengthResult != 0 ){
        counter = lengthResult ;
        lengthResult =0 ;
    } else {
        counter = 0;
    }
    for ( counter ; counter <= displayCalculator.length ; ++counter ) {
        if ( ( displayCalculator[ counter ] < 10 ) || ( displayCalculator[ counter ] === '.' ) ) {
            number += displayCalculator[ counter ];
        } else {
            insertNumberToArray() ;
            insertOperandToArray() ;
            while ( operatorPriority() ) {
                let operandExit = operand.pop () ;
                let isOperand = operand.pop () ;
                operand.push( operandExit ) ;
                calculations(isOperand);

            }
        }
    }
    if ( ( counter > displayCalculator.length ) && ( ( operand.length ) != 0 )  ) {
        for ( let count = 0; count < operand.length ; count++ ) {
            isOperand = operand.pop() ;
            calculations( isOperand ) ;
        }
    }
    if ( (numbers.length != 1 ) && ( operand.length === 0) ) {
        isOperand = "*" ;
        calculations( isOperand ) ;
    }
        result = numbers.pop() ;
    if( result != result ){
        document.getElementById('outPut').innerText  = "invalid input" ;
        displayCalculator = "" ;
    }else{
        document.getElementById('outPut').innerText  = result ;
        operand=[];

    }
}
const insertNumberToArray = () => {
    if ( ( number != '' ) && ( number != "-" ) ) {
        numbers.push( number ) ;
        number = '' ;
    }
}
function  operatorPriority () {
    let isOperand = operand [operand.length - 1];
    let lastOperand = operand [operand.length - 2];
    if ( (isOperand === "^") && ( lastOperand === "√" ) ) {
        return true;
    }
    if ( (isOperand === "√") && ( lastOperand === "^" ) ) {
        return true;
    }
    if ((isOperand === "*") || (isOperand === "÷")) {
        if ((lastOperand === "^") || (lastOperand === "√") || (lastOperand === "*") || (lastOperand === "÷")) {
            return true;
        }
    }
    if (isOperand === "%") {
        if ((lastOperand === "^") || (lastOperand === "√") || (lastOperand === "*") || (lastOperand === "÷") || (lastOperand === "%")) {
            return true;
        }
    }
    if ((isOperand === "+") || (isOperand === "-")) {
        if ((lastOperand === "^") || (lastOperand === "√") || (lastOperand === "*") || (lastOperand === "÷") || (lastOperand === "%") || (lastOperand === "+") || (lastOperand === "-")) {
                return true;
        }
    }

}
function insertOperandToArray () {
    if ( ( displayCalculator[ counter ] != undefined ) && ( ( displayCalculator[ counter -1 ] < 10  ) || ( displayCalculator[ counter -1 ] ==undefined  ) ) ) {
        operand.push( displayCalculator[ counter ] ) ;
    } else if ( ( displayCalculator[ counter ] === '-' ) && ( number == '' ) ) {
        number = displayCalculator[ counter ] ;
    }else if ( ( ( displayCalculator[ counter ] != undefined ) && ( displayCalculator [counter] != "√" ) ) || ( ( displayCalculator [ counter - 1] === "√" ) && ( displayCalculator [ counter ] === "√" ) ) ){
        let operandExit = displayCalculator[ counter ];
        let beforeCounter = displayCalculator.slice( 0 , counter -1 );
        let afterCounter = displayCalculator.slice( counter , );
        displayCalculator = beforeCounter + afterCounter;
        operand.pop();
        operand.push(operandExit);
        document.getElementById('inPut').innerText = displayCalculator ;
        counter -= 1;
    }
}
function calculations ( isOperand ) {
    if( isOperand === "√" ) {
        let number = parseFloat( numbers.pop() ) ;
        result = Math.sqrt ( number ) ;
    } else {
        let number2 =  parseFloat( numbers.pop () ) ;
        let number1 = parseFloat( numbers.pop () ) ;
        if ( ( number1 === undefined ) || ( number1 != number1) ) { number1 = number2 ;}
        if ( isOperand === "^" ) {
            result = Math.pow( number1 , number2 ).toFixed(2);
        }
        if ( isOperand === "*" ) {
            result = number1 * number2 ;
        }
        if ( isOperand === "÷" ) {
            result = ( number1 / number2 ).toFixed(2);
        }
        if ( isOperand === "%" ) {
            result = number1 % number2;
        }
        if ( isOperand === "+" ) {
            result = number1 + number2;
        }
        if ( isOperand === "-" ) {
            result = ( number1 - number2 ).toFixed(2);
        }
    }
    numbers.push( result );
}
