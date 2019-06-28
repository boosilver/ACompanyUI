import { Component, OnInit } from '@angular/core';
import { Acceptinvoice } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Util } from '../../util/util'

@Component({
  selector: 'app-acceptinvoice',
  templateUrl: './acceptinvoice.component.html',
  styleUrls: ['./acceptinvoice.component.css']
})
export class AcceptinvoiceComponent implements OnInit {
  model: Acceptinvoice = Acceptinvoice.empty();
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
    that.model = Acceptinvoice.sampleSubmitSr();
  }

  openModal(template: AcceptinvoiceComponent) {
    if (this.model.KEY) {
      this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered modal-sm fade show' });

    }
    // this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }
  confirm(resulttemplate: any, errortemplate: any): void {
    this.model.KEY = this.model.KEY;

    console.log('Accept invoice DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitAcceptinvoice(this.model)
      .subscribe(
        sr => {
          this.loading = false;
          console.log('saving draft ' + JSON.stringify(sr));
          this.message = 'Accept Invoice Success';
          this.modalRef = this.modalService.show(resulttemplate, { class: 'modal-dialog-centered modal-md fade show' });

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
  Oknorefresh(): void {
    this.message = 'Ok!';
    this.modalRef.hide();
  }
}