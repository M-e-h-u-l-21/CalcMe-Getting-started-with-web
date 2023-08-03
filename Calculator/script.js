class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand=""
        this.previousOperand=""
        this.operation=undefined
        this.updateDisplay()
    }

    delete(){
        this.currentOperand=this.currentOperand.slice(0,-1);
        this.updateDisplay()
    }
    
    appendNumber(number){
        // console.log(number);
        if(number==='.' && this.currentOperand.includes('.')) return 
        if(number==='.' && this.currentOperand==="")
        this.currentOperand="0"
        this.currentOperand=this.currentOperand.toString()+number.toString()
        // console.log(this.currentOperand)
    }

    chooseOperation(operation){

        if(this.currentOperand===""){

            return 
        }
        
        if(this.previousOperand!==""){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand+this.operation
        this.currentOperand=""
    }

    compute(){
        if(this.currentOperand===""){
            if(this.previousOperand!==""){
                this.currentOperand=this.previousOperand.slice(0,-1)
                this.previousOperand=""
                this.operation=undefined
                return 
            }
            return 
        }
        let computation
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(current)) return
        switch(this.operation){
            case '+':
                computation=prev+current
                break
            case '-':
                computation=prev-current
                break
            case '*':
                computation=prev*current
                break
            case '/':
                computation=prev/current
                break
            default:
                return 
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand
        this.previousOperandTextElement.innerText=this.previousOperand
    }
}


const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const deleteButton=document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-allclear]')
const previousOperandTextElement=document.querySelector('[data-previous-operand]')
const currentOperandTextElement=document.querySelector('[data-current-operand]')

const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement) 

numberButtons.forEach(buttons =>{
    buttons.addEventListener('click',()=>{
        // console.log(buttons.innerText );
        calculator.appendNumber(buttons.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(buttons =>{
    buttons.addEventListener('click',()=>{
        // console.log(buttons.innerText );
        calculator.chooseOperation(buttons.innerText);
        calculator.updateDisplay();
    })
})


allClearButton.addEventListener('click',()=>{
    calculator.clear();
})

deleteButton.addEventListener('click',()=>{
    calculator.delete();
})

equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})