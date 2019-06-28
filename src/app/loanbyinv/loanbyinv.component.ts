import { Component, OnInit } from '@angular/core';
import { Loanbyinv } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Util } from '../../util/util'


@Component({
  selector: 'app-loanbyinv',
  templateUrl: './loanbyinv.component.html',
  styleUrls: ['./loanbyinv.component.css']
})
export class LoanbyinvComponent implements OnInit {
  model: Loanbyinv = Loanbyinv.empty();
  public loading = false;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: string;


  constructor(
    private modalService: BsModalService,
    private svc: PROCURETOPAYService
  ) { }

  ngOnInit() {
    var that = this;
    // setTimeout(function(){
    that.model = Loanbyinv.sampleSubmitSr();
  }
  openModal(template: LoanbyinvComponent) {
    if (this.model.BANK.trim() && this.model.DOC_LOAN.trim() && this.model.KEY) {
      this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered modal-md fade show' });

    }
  }

  confirm(resulttempalte: any, errortemplate: any): void {
    this.model.BANK = this.model.BANK.trim();
    this.model.DOC_LOAN = this.model.DOC_LOAN.trim();
    this.model.KEY = this.model.KEY;
    this.model.EMAIL = this.model.EMAIL.trim();
    this.model.TEL_NUMBER = this.model.TEL_NUMBER;
    this.model.BUSINESS_TYPE = this.model.BUSINESS_TYPE.trim();
    this.model.INCOME = this.model.INCOME;
    this.model.GUARANTEE = this.model.GUARANTEE;
    this.model.LOAN_AMOUNT = this.model.LOAN_AMOUNT;
    this.model.INSTALLMENT = this.model.INSTALLMENT;


    console.log('Loanbyinv DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitLoanbyInvoice(this.model)
      .subscribe(
        sr => {
          this.loading = false;
          console.log('saving draft ' + JSON.stringify(sr));
          this.message = 'Create Loan Success';
          this.modalRef = this.modalService.show(resulttempalte, { class: 'modal-dialog-centered modal-md fade show' });

        },
        error => {
          this.loading = false;
          // let header = 'Error';
          // let message = error;
          // (<HTMLInputElement>document.getElementById('status')).value = message;
          // document.getElementById("statusfield").style.display = "block";
          this.message = error;
          console.log('Error:' + error);
          this.modalRef = this.modalService.show(errortemplate, { class: 'modal-dialog-centered modal-lg fade show' });

        });
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  Ok(): void {
    this.message = 'Ok!';
    this.modalRef.hide();
  }
}