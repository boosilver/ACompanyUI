import { Component, OnInit } from '@angular/core';
import { Acceptinvoice } from '.././model';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Util} from '../../util/util'

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
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

    }
    // this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }
  confirm(): void {
    this.model.KEY = this.model.KEY;
   
    console.log('Endorse DATA');
    console.log('saving draft ' + JSON.stringify(this.model));
    this.loading = true;
    this.svc.submitAcceptinvoice(this.model)
            .subscribe(
              sr =>{ 
                this.loading = false;
                let message = 'Success';
                (<HTMLInputElement>document.getElementById('status')).value = message;
                console.log('reply:' + JSON.stringify(sr));
                document.getElementById("statusfield").style.display = "block";
                 
              },
              error => {
                  this.loading = false;
                  let header = 'Error';
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