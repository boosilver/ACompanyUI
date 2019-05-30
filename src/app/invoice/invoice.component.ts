import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionCreateInvoice } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Util} from '../../util/util'


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  model: TransactionCreateInvoice = TransactionCreateInvoice.empty();
  public loading = false;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: string;
  
  constructor(
    private modalService: BsModalService,
    private svc: PROCURETOPAYService,
  ) { }

  ngOnInit() {
    var that = this;
        // setTimeout(function(){
            that.model = TransactionCreateInvoice.sampleSubmitSr();
  }

  openModal(template: InvoiceComponent) {
    if (this.model.TO.trim() && this.model.PO_KEY && this.model.PRODUCT.trim() && this.model.NUM_PRODUCT && this.model.VALUE && this.model.EMAIL) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

    }
  }

  confirm(): void {
    this.model.TO=this.model.TO.trim();
    this.model.PO_KEY = this.model.PO_KEY;
    this.model.EMAIL = this.model.EMAIL.trim();
    this.model.TEL_NUMBER = this.model.TEL_NUMBER;
    this.model.PRODUCT=this.model.PRODUCT.trim();
    this.model.DELIVERY_ADDRESS = this.model.DELIVERY_ADDRESS.trim();
    this.model.NUM_PRODUCT = this.model.NUM_PRODUCT;
    this.model.VALUE = this.model.VALUE;
    this.model.DETAIL = this.model.DETAIL.trim();

    
    console.log('INVOICE DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitCreateInvoice(this.model)
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
}
