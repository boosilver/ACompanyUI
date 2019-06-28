import { Component, OnInit } from '@angular/core';
import { Acceptendorse } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Util } from '../../util/util'

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css'],
})
export class AcceptComponent implements OnInit {
  model: Acceptendorse = Acceptendorse.empty();
  public loading = false;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  message: string;

  constructor(
    private svc: PROCURETOPAYService,
    private modalService: BsModalService,

  ) { }

  ngOnInit() {
    var that = this;
    // setTimeout(function(){
    that.model = Acceptendorse.sampleSubmitSr();
  }

  openModal(template: AcceptComponent) {
    if (this.model.BANK.trim() && this.model.LOAN_KEY && this.model.DOC_LOAN.trim()) {
      this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered modal-sm fade show' });

    }
    // this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }
  confirm(resulttempalte : any,errortemplate: any): void {
    this.model.BANK = this.model.BANK.trim();
    this.model.DOC_LOAN = this.model.DOC_LOAN.trim();
    this.model.LOAN_KEY = this.model.LOAN_KEY;

    console.log('Endorse DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitAcceptendorse(this.model)
      .subscribe(
        sr => {
          this.loading = false;
          console.log('saving draft ' + JSON.stringify(sr));
          this.message = 'Accept Loan Success';
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
