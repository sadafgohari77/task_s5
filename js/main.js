let displayCalculator = "" , displayNumber = "" ;
let result = 0 ;
let numbers = new Array() ;
let operand = new Array() ;
let number = '' ;
let counter = 0 ;
let checkedDisplay ;
let currentOperator ;
let lengthResult = 0 ;
let counterRepetition = 1 ;
document.addEventListener ('keydown' ,function ( entry) {
  if ( ( entry.code === 'Enter' ) || ( entry.code === 'NumpadEnter' ) || ( entry.code === 'Equal' ) ) {
      calculatePhrase () ;

  } else if ( ( entry.code === 'Backspace' ) || ( entry.code == 'Delete' ) ) {
      clearOneNumber () ;

  } else if ( entry.code === 'NumpadDivide' ) {
      inPutPhrase ( "÷" )

  } else if ( ( entry.key <10 ) || ( entry.key == '.' ) || ( entry.code === "NumpadAdd" ) || ( entry.code === "NumpadSubtract" ) || ( entry.code === "NumpadMultiply" ) ) {
      inPutPhrase ( entry.key ) ;
  }
})
function inPutPhrase ( selectedButton ) {
    document.getElementById('outPut' ).innerText  = "" ;
    if ( displayCalculator.length > 1 ) {
        checkedDisplay = displayCalculator.slice( -1 ) ;
        if ( ( ( checkedDisplay < 10 ) || ( checkedDisplay === "." ) ) && ( ( selectedButton < 10 ) || ( selectedButton === '.' ) ) ) {
            let number = displayNumber ;
            allClear () ;
            displayCalculator = number ;
            document.getElementById ('inPut' ).innerText = displayCalculator ;
        }
    }
    if ( ( result != 0 ) && ( result === result ) ) {
        displayCalculator = result ;
        document.getElementById ('outPut' ).innerText  = "" ;
        numbers.push( result );
        lengthResult = result.toString().length;
        result = 0 ;
    }
    if ( ( selectedButton < 10 ) || ( selectedButton === '.' ) ) {
        displayNumber += selectedButton ;
        document.getElementById('displayNumber' ).innerText  = displayNumber ;
    } else {
        displayCalculator +=  displayNumber + selectedButton ;
        document.getElementById ('inPut' ).innerText  = displayCalculator ;
        displayNumber = '' ;
    }
}
const clearOneNumber = () => {
    displayNumber = displayNumber.slice ( 0 , -1 ) ;
    document.getElementById ('displayNumber').innerText = displayNumber ;
}
function allClear () {
    document.getElementById ('inPut' ).innerText = "" ;
    document.getElementById ('outPut' ).innerText = "" ;
    document.getElementById ('displayNumber' ).innerText = "" ;
    displayNumber = "" ;
    displayCalculator = "" ;
    number = "" ;
    counter = 0 ;
    result = 0 ;
    currentOperator = "" ;
    numbers = [] ;
    operand = [] ;
}
function calculatePhrase () {
    checkedDisplay = displayCalculator.slice( -1 ) ;
    if ( ( checkedDisplay < 10 ) || ( checkedDisplay === "." ) ) {
        displayCalculator = displayNumber ;
        document.getElementById ('inPut' ).innerText  = displayCalculator ;
        return ;
    }
    displayCalculator += displayNumber ;
    displayNumber = "" ;
    document.getElementById ('inPut' ).innerText  = displayCalculator ;
    document.getElementById ('displayNumber' ).innerText  = "" ;
    if( lengthResult != 0 ){
        counter = lengthResult ;
        lengthResult =0 ;
    } else {
        counter = 0 ;
    }
    for ( counter ; counter <= displayCalculator.length ; ++counter ) {
        if ( ( displayCalculator [ counter ] < 10 ) || ( displayCalculator [ counter ] === '.' ) ) {
            if ( counterRepetition % 2 == 0 ) {
                let beforeCounter = displayCalculator.slice ( 0 , counter -1 );
                let afterCounter = displayCalculator.slice ( counter , ) ;
                displayCalculator = beforeCounter + afterCounter ;
                document.getElementById ('inPut' ).innerText = displayCalculator ;
                counter -= 1 ;
                number = "" ;
                counterRepetition = 1 ;
            }
            number += displayCalculator [ counter ] ;
        } else {
            insertNumberToArray () ;
            insertOperandToArray () ;
            while ( operatorPriority () ) {
                let operandExit = operand.pop () ;
                let currentOperatorT = operand.pop () ;
                operand.push ( operandExit ) ;
                calculations ( currentOperatorT );
            }
        }
    }
    if ( ( counter > displayCalculator.length ) && ( ( operand.length ) != 0 )  ) {
        for ( let count = 0; count < operand.length ; count++ ) {
            currentOperator = operand.pop() ;
            calculations( currentOperator ) ;
        }
    }
    if ( ( numbers.length != 1 ) && ( operand.length === 0 ) ) {
        currentOperator = "*" ;
        calculations( currentOperator ) ;
    }
        result = numbers.pop() ;
    if( result != result ){
        document.getElementById('outPut' ).innerText  = "invalid input" ;
        displayCalculator = "" ;
    }else{
        document.getElementById('outPut' ).innerText  = result ;
        operand = [];
    }
}
const insertNumberToArray = () => {
    if ( ( number != '' ) && ( number != "-" ) ) {
        numbers.push( number ) ;
        number = '' ;
    } else if ( number == "-" ) {
        number = "" ;
        counterRepetition++ ;
        let beforeCounter = displayCalculator.slice( 0 , counter -1 ) ;
        let afterCounter = displayCalculator.slice( counter , ) ;
        displayCalculator = beforeCounter + afterCounter ;
        document.getElementById('inPut').innerText = displayCalculator ;
        counter -= 1;
    }
}
function  operatorPriority () {
    let currentOperatorT = operand [ operand.length - 1 ] ;
    let lastOperand = operand [ operand.length - 2 ] ;
    if ( ( currentOperatorT === "^" ) && ( lastOperand === "√" ) ) {
        return true ;

    } else if ( ( currentOperatorT === "√" ) && ( lastOperand === "^" ) ) {
        return true ;

    } else if ( ( currentOperatorT === "*" ) || (currentOperatorT === "÷" ) ) {
        if ( ( lastOperand === "^" ) || ( lastOperand === "√" ) || ( lastOperand === "*" ) || ( lastOperand === "÷" ) ) {
            return true ;
        }

    } else if ( currentOperatorT === "%" ) {
        if ( ( lastOperand === "^" ) || ( lastOperand === "√" ) || ( lastOperand === "*" ) || ( lastOperand === "÷" ) || ( lastOperand === "%" ) ) {
            return true ;
        }

    } else if ( ( currentOperatorT === "+" ) || ( currentOperatorT === "-" ) ) {
        if ( ( lastOperand === "^" ) || ( lastOperand === "√" ) || ( lastOperand === "*" ) || ( lastOperand === "÷" ) || ( lastOperand === "%" ) || ( lastOperand === "+" ) || ( lastOperand === "-" ) ) {
                return true ;
        }

    } else {
        return false ;
    }
}
function insertOperandToArray () {
    if ( ( displayCalculator [ counter ] != undefined ) && ( ( displayCalculator [ counter -1 ] < 10  ) || ( displayCalculator [ counter -1 ] == undefined  ) ) ) {
        operand.push( displayCalculator [ counter ] ) ;
        counterRepetition = 1 ;

    } else if (  ( displayCalculator [ counter ] === '-' ) && ( number == '' ) ) {
        number = displayCalculator [ counter ] ;

    } else if ( ( ( displayCalculator [ counter ] != undefined ) && ( displayCalculator [ counter ] != "√" ) ) || ( ( displayCalculator [ counter - 1 ] === "√" ) && ( displayCalculator [ counter ] === "√" ) ) ) {
        let operandExit = displayCalculator [ counter ];
        let beforeCounter = displayCalculator.slice ( 0 , counter -1 );
        let afterCounter = displayCalculator.slice ( counter , );
        displayCalculator = beforeCounter + afterCounter;
        operand.pop();
        operand.push( operandExit );
        counterRepetition = 1 ;
        document.getElementById('inPut' ).innerText = displayCalculator ;
        counter -= 1 ;
    }
}
function calculations ( currentOperator ) {
    if( currentOperator === "√" ) {
        let number = parseFloat( numbers.pop() ) ;
        result = Math.sqrt ( number ).toFixed(2) ;
    } else {
        let number2 =  parseFloat( numbers.pop () ) ;
        let number1 = parseFloat( numbers.pop () ) ;
        if ( ( number1 === undefined ) || ( number1 != number1) ) { number1 = number2 ; }
        if ( currentOperator === "^" ) {
            result = Math.pow( number1 , number2 ).toFixed(2 ) ;
        }
        if ( currentOperator === "*" ) {
            result = number1 * number2 ;
        }
        if ( currentOperator === "÷" ) {
            result = ( number1 / number2 ).toFixed(2 ) ;
        }
        if ( currentOperator === "%" ) {
            result = ( number1 % number2 ).toFixed(2 ) ;
        }
        if ( currentOperator === "+" ) {
            result = number1 + number2;
        }
        if ( currentOperator === "-" ) {
            result = ( number1 - number2 ).toFixed(2 ) ;
        }
    }
    numbers.push( result );
}
