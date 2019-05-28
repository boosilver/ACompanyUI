import { Util } from '../util/util';
var todate;
import { Injectable } from '@angular/core';

const construct = function (constructor, argsArray) {


  function F(): void {
    constructor.apply(this, argsArray);
  }
  F.prototype = constructor.prototype;
  return new F();
}

const empty = function (constructor, numArgs: number) {
  todate = Util.todate();
  const nullArgs = new Array(numArgs).fill(null);
  return construct(constructor, nullArgs);
}



// ----------------------------------------- Create PO -------------------------------------------------------------------
export class TransactionCreatePurchaseOrder {
  static empty(): TransactionCreatePurchaseOrder {
    const emptyObj = empty(TransactionCreatePurchaseOrder, 4);
    return emptyObj;
  }

  static sampleSubmitSr(): TransactionCreatePurchaseOrder {
    const sample: TransactionCreatePurchaseOrder = TransactionCreatePurchaseOrder.empty();

    sample.TO = 'lotus';
    sample.PRODUCT = 'apple';
    sample.NUM_PRODUCT = '100';
    sample.VALUE = '250';

    return sample;
  }

  constructor(
    public TO: string,
    public PRODUCT: string,
    public NUM_PRODUCT: string,
    public VALUE: string,
  ) { }
}
// ------------------------------------------ END -------------------------------------------------------------------

// ----------------------------------------- CREATE INVOICE ---------------------------------------------------------
export class TransactionCreateInvoice {
  static empty(): TransactionCreateInvoice {
    const emptyObj = empty(TransactionCreateInvoice, 6);
    return emptyObj;
  }

  static sampleSubmitSr(): TransactionCreateInvoice {
    const sample: TransactionCreateInvoice = TransactionCreateInvoice.empty();

    sample.TO = 'themall';
    sample.PO_KEY = '100';
    sample.PRODUCT = 'apple';
    sample.NUM_PRODUCT = '100';
    sample.VALUE = '250';


    return sample;
  }

  constructor(
    public TO: string,
    public PO_KEY: string,
    public PRODUCT: string,
    public NUM_PRODUCT: string,
    public VALUE: string,

  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------


//  ---------------------------------------------- Check PO key ------------------------------------------------
export class InquirePOByKeyFields {
  static empty(): InquirePOByKeyFields {
    const emptyObj = empty(InquirePOByKeyFields, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): InquirePOByKeyFields {
    const sample: InquirePOByKeyFields = InquirePOByKeyFields.empty();

    sample.KEY = '123';
    sample.TYPE = 'PO';

    return sample;
  }

  constructor(
    public KEY: string,
    public TYPE: string,

  ) { }
}
//  ---------------------------------------------- END key -----------------------------------------------------------

//  ---------------------------------------------- Check Invoice key ------------------------------------------------
export class InquireInvoiceByKeyFields {
  static empty(): InquireInvoiceByKeyFields {
    const emptyObj = empty(InquireInvoiceByKeyFields, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): InquireInvoiceByKeyFields {
    const sample: InquireInvoiceByKeyFields = InquireInvoiceByKeyFields.empty();

    sample.INVOICE_ID = '';
    sample.KEY = '';
    sample.SELLER = '';

    return sample;
  }

  constructor(
    public INVOICE_ID: string,
    public KEY: string,
    public SELLER: string,
  ) { }
}
//  ---------------------------------------------- END key -----------------------------------------------------------

// ----------------------------------------- LOAN by INV ---------------------------------------------------------
export class Loanbyinv {
  static empty(): Loanbyinv {
    const emptyObj = empty(Loanbyinv, 5);
    return emptyObj;
  }

  static sampleSubmitSr(): Loanbyinv {
    const sample: Loanbyinv = Loanbyinv.empty();

    sample.BANK = 'bank';
    sample.DOC_LOAN = 'PO';
    sample.KEY = '1';

    return sample;
  }

  constructor(
    public BANK: string,
    public DOC_LOAN: string,
    public KEY: string,

  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------

// ----------------------------------------- Accept Endorse ---------------------------------------------------------
export class Acceptendorse {
  static empty(): Acceptendorse {
    const emptyObj = empty(Acceptendorse, 4);
    return emptyObj;
  }

  static sampleSubmitSr(): Acceptendorse {
    const sample: Acceptendorse = Acceptendorse.empty();

    sample.BANK = 'bank';
    sample.DOC_LOAN = 'PO';
    sample.LOAN_KEY = '1';

    return sample;
  }

  constructor(

    public BANK: string,
    public DOC_LOAN: string,
    public LOAN_KEY: string,

  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------

// ----------------------------------------- REJECT ---------------------------------------------------------
export class Reject {
  static empty(): Reject {
    const emptyObj = empty(Reject, 2);
    return emptyObj;
  }

  static sampleSubmitSr(): Reject {
    const sample: Reject = Reject.empty();

    sample.KEY = '123';
    sample.TYPE = 'PO';

    return sample;
  }

  constructor(

    public KEY: string,
    public TYPE: string,

  ) { }
}
// ------------------------------------------------- END ---------------------------------------------------------