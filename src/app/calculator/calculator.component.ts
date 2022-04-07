import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    input: string = "";
    result: string = "";
    justCalculated: boolean = false;
    operatorPressed: boolean = false; //Allow only 1 operator in input ( like Windows Calc )

    pressNum(num: string) {
        if(this.justCalculated)
            this.input = num;
        else 
            this.input += num;
        this.justCalculated = false;
    }

    pressOperator(operator: string) {
        if(this.operatorPressed){
            
            //calculate the input
            this.calculate();
        }
        //First check if the last symbol of input is not an operator
        const lastSymbol = this.input[this.input.length -1];
        if( lastSymbol !== "+" 
            && lastSymbol !== "-"
            && lastSymbol !== "*"
            && lastSymbol !== "/"){
                this.input += operator;
                this.justCalculated = false;
                this.operatorPressed = true;
            }
    }

    clearInputs() {
        this.input = "";
        this.result = "";
    }

    calculate() {
        //check if we have only one number
        const regex = /[0-9]+[\.]?[0-9]*/gm;
        const found = this.input.match(regex);
        
        if(found?.length === 1){
            // add it again
            this.input += found;
        }

        const lastSymbol = this.input[this.input.length -1];
        if( lastSymbol === "+" 
            || lastSymbol === "-"
            || lastSymbol === "*"
            || lastSymbol === "/"){

        }
        let formula = this.input.trim();
        console.log(`Evaluating: ${formula}`);
        this.input = eval(formula);
        this.result = this.input;
        this.justCalculated = true;
        this.operatorPressed = false;
    }

    isItANumber(character: string){
        const numberValue: number = Number(character);
        return numberValue === NaN; 
    }
}
