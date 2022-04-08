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
        // Do not allow starting with . (dot) as it messes the logic in calculation
        if (num === "." ) {
            const regex = /[\.]/gm;
            const operatorRegex = /[\+\-\*\/]+/gm;
            const found = this.input.match(regex);// is there another .
            const operatorsFound = this.input.match(operatorRegex);
            
            if(found != undefined && found.length > 0 && operatorsFound == undefined ){
                return;
            }
            
            const lastSymbol = this.input[this.input.length - 1];
            if (lastSymbol === undefined) {
                num = "0.";
            }
        }

        if (this.justCalculated)
            this.input = num;
        else
            this.input += num;
        this.justCalculated = false;
    }

    pressOperator(operator: string) {
        if (this.operatorPressed) {
            //calculate the input if there is already another operator
            this.calculate();
        }
        //First check if the last symbol of input is not an operator
        const lastSymbol = this.input[this.input.length - 1];
        if (!this.isItOperator(lastSymbol)) {
            this.input += operator;
            this.justCalculated = false;
            this.operatorPressed = true;
        }
    }

    clearInputs() {
        this.input = "";
        this.result = "";
        this.operatorPressed = false;
    }

    calculate() {
        //check if we have only one number
        const regex = /[0-9]+[\.]?[0-9]*/gm;
        const found = this.input.match(regex);

        if (found?.length === 1 && found[0] !== this.input) {
            // add it again
            this.input += found;
            
        }
        
        this.input = eval(this.input);
        this.result = this.input;
        this.justCalculated = true;
        this.operatorPressed = false;
    }

    deleteLastCharacter(){
        this.input = this.input.slice(0, -1);
    }

    isItOperator(character: string){
        return character === "+"
            || character === "-"
            || character === "*"
            || character === "/";
    }

    isItANumber(character: string) {
        const numberValue: number = Number(character);
        return numberValue !== NaN;
    }
}
