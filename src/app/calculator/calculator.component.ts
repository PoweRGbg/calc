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

    pressNum(num: string) {
        if(this.justCalculated)
            this.input = num;
        else 
            this.input += num;
        this.justCalculated = false;
    }

    pressOperator(operator: string) {
        //First check if the last symbol of input is not an operator
        const lastSymbol = this.input[this.input.length -1];
        if( lastSymbol !== "+" 
            && lastSymbol !== "-"
            && lastSymbol !== "*"
            && lastSymbol !== "/"){
                this.input += operator;
                this.justCalculated = false;
            }
    }

    clearInputs() {
        this.input = "";
        this.result = "";
    }

    calculate() {
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
    }

    isItANumber(character: string){
        const numberValue: number = Number(character);
        return numberValue === NaN; 
    }
}
