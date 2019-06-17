export class Question {
    numberA: number;
    numberB: number;
    answer: number;
  
    constructor(_numberA: number, _numberB: number, _answer: number) {
      this.numberA = _numberA;
      this.numberB = _numberB;
      this.answer = _answer;
    }
  }