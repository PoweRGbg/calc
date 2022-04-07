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

    pressNum(num: string) {
        this.input += num;
    }

    pressOperator(operator: string) {
        //First check if the last symbol of input is not an operator
        const lastSymbol = this.input[this.input.length -1];
        if( lastSymbol !== "+" 
            && lastSymbol !== "-"
            && lastSymbol !== "*"
            && lastSymbol !== "/"){
                this.input += operator;
            }
    }

    clearInputs() {
        this.input = "";
        this.result = "";
    }

    calculate() {
        let formula = this.input.trim();
        console.log(`Evaluating: ${formula}`);
        this.input = eval(formula);
        this.result = this.input;

    }
}
