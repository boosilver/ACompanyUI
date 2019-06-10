import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionCreatePurchaseOrder } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Util } from '../../util/util'
// import { TransactionCreatePurchaseOrder, FieldsReceipt, ListTreatment } from '.././model';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  model: TransactionCreatePurchaseOrder = TransactionCreatePurchaseOrder.empty();
  public loading = false;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: string;
  // receipt: FieldsReceipt = FieldsReceipt.empty();


  constructor(
    private svc: PROCURETOPAYService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    var that = this;
    // setTimeout(function(){
    that.model = TransactionCreatePurchaseOrder.sampleSubmitSr();
    // that.receipt = FieldsReceipt.sample();
    // this.receipt.treatment = [];
    // const numRecords = this.receipt.treatment.length;
    // const newRecord = ListTreatment.sample();
    // const newRecord2 = ListTreatment.sample2();
    // newRecord.listNo = numRecords.toString();

    // this.receipt.treatment.push(newRecord);
    // this.receipt.treatment.push(newRecord2);

  }

  openModal(template: PurchaseOrderComponent) {
    if (this.model.TO.trim() && this.model.TEL_NUMBER.trim()  && this.model.PRODUCT.trim() 
      && this.model.NUM_PRODUCT && this.model.VALUE && this.model.EMAIL.trim() && this.model.TAX_ID.trim()
      && this.model.PAYMENT && this.model.DELIVERY_DATE) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

    }
    // this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }

  confirm(): void {
    this.model.TO = this.model.TO.trim();
    this.model.EMAIL = this.model.EMAIL.trim();
    this.model.NUM_PRODUCT = this.model.NUM_PRODUCT;
    this.model.TEL_NUMBER = this.model.TEL_NUMBER;
    this.model.TAX_ID = this.model.TAX_ID;
    this.model.DELIVERY_ADDRESS = this.model.DELIVERY_ADDRESS.trim();
    this.model.PRODUCT = this.model.PRODUCT.trim();
    this.model.VALUE = this.model.VALUE;
    this.model.DELIVERY_DATE = new Date(this.model.DELIVERY_DATE);
    this.model.PAYMENT = new Date(this.model.PAYMENT);
    // this.model.receipt = FieldsReceipt.empty();
    this.model.DETAIL = this.model.DETAIL.trim();


    // this.model.VALUE = this.model.VALUE.trim();
    //this.model.NUM_PRODUCT = Util.pad(Number(this.model.NUM_PRODUCT)); ตัวอย่างเสริม 001
    // this.model.PO_KEY = this.model.PO_KEY.trim(); เป็น number ไม่ต้องใช้ trim

    console.log('PO DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitCreatePurchaseOrder(this.model)
      .subscribe(
        sr => {
          this.loading = false;
          let message = 'Success';
          (<HTMLInputElement>document.getElementById('status')).value = message;
          console.log('reply:' + JSON.stringify(sr));
          document.getElementById("statusfield").style.display = "block";

        },
        error => {
          this.loading = false;

          let header = 'Error';
          // this.progressDialog.close();
          let message = error;
          (<HTMLInputElement>document.getElementById('status')).value = message;
          console.log('Error:' + message);
          document.getElementById("statusfield").style.display = "block";

        });
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  // addReceiptTreatment() {

  //   if (this.receipt.treatment === null) {
  //     this.receipt.treatment = [];
  //   }

  //   const numRecords = this.receipt.treatment.length;
  //   const newRecord = ListTreatment.SubmitSr();
  //   newRecord.listNo = numRecords.toString();
  //   this.receipt.treatment.push(newRecord);
  // }


}
