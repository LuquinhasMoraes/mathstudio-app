import { NameOperation } from "../enums/NameOperation.enum";

export class Operation {
    symbol: string;
    name: NameOperation
  
    constructor(_symbol: string, _nameOperation: NameOperation) {
      this.symbol = _symbol;
      this.name = _nameOperation;
    }
  }