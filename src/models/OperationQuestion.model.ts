import { NameOperation } from "../enums/NameOperation.enum";
import { Operation } from "./Operation.model";
import { Question } from "./Question.model";

export class OperationQuestion {

    createOperation(operation: Operation) {
      
      const numberA = Math.round(Math.floor(Math.random() * 10) + 1);
      const numberB = Math.round(Math.floor(Math.random() * 10) + 1);
      var asnwerQuestion = 0;
  
      switch (operation.name) {
        case NameOperation.multiplication:
          asnwerQuestion = numberA * numberB;
          break;
        
        case NameOperation.addition:
          asnwerQuestion = numberA + numberB;
          break;
        
        case NameOperation.subtraction:
          asnwerQuestion = numberA - numberB;   
          break;
      
        default:
          asnwerQuestion = numberA / numberB;
          break;
      }
  
      return new Question(numberA, numberB, asnwerQuestion);
    }
  }