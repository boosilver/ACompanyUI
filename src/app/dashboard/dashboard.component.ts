import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { Myinterfacedata, InquirePOByKeyFields, Reject,Acceptinvoice } from '../model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private updateSubscription: Subscription;
  DASHBOARD$: Myinterfacedata
  // DASHBOARD_LIST: Myinterfacedata[]
  showUI = false;
  loading = false;
  responseValue: InquirePOByKeyFields;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  body: any;
  key: any;
  message: any;
  showAccept: any;
  showAcceptLoan: any;
  constructor(
    private svc: PROCURETOPAYService,
    private modalService: BsModalService,

  ) { }

  // ngOnInit() {
  //   this.svc.dashboard()
  //   .then(DASHBOARD_DATA => {
  //     this.DASHBOARD_DATA = DASHBOARD_DATA
  //   })

  //   this.svc.dashboardlist()
  //   .then(DASHBOARD_LIST => {
  //     this.DASHBOARD_LIST = DASHBOARD_LIST
  //   })
  // }

  async ngOnInit() {

    await this.svc.dashboardlist()
      .subscribe((DASHBOARD: Myinterfacedata) => {
        // console.log('5555555555555555555555555555' + (JSON.stringify(DASHBOARD)))
        this.DASHBOARD$ = DASHBOARD
        // console.log('----------------------------' + (JSON.stringify(this.DASHBOARD$)))
        if (this.DASHBOARD$) this.showUI = true;

        // setTimeout(function () {
        //   location.reload();
        // }, 5000); // 5000 milliseconds means 5 seconds.
      })

  }

  async view(key: any) {
    console.log('saving draft ' + JSON.stringify(key));
  }


  async openModal(template: any, key: any) {
    this.loading = true;
    await this.svc.InquirePOByKeyFields(key)
      .subscribe(result => {
        this.loading = false;
        console.log('result : ' + JSON.stringify(result));
        // this.responseValue = []; //new Array(result[0].INVOICE)
        this.body = {
          "DATE": result.INFO.DATE,
          "TO": result.INFO.TO,
          "FROM": (result.INFO.FROM),
          "TYPE": (result.INFO.TYPE),
          "PO_KEY": result.INFO.PO_KEY,
          "ADDRESS": result.INFO.ADDRESS,
          "EMAIL": result.INFO.EMAIL,
          "TEL_NUMBER": result.INFO.TEL_NUMBER,
          "DELIVERY_ADDRESS": result.INFO.DELIVERY_ADDRESS,
          "PRODUCT": result.INFO.PRODUCT,
          "NUM_PRODUCT": result.INFO.NUM_PRODUCT,
          "VALUE": result.INFO.VALUE,
          "PRICE": result.INFO.PRICE,
          "VAT": result.INFO.VAT,
          "TAX_ID": result.INFO.TAX_ID,
          "TOTAL_PRICE": result.INFO.TOTAL_PRICE,
          "DELIVERY_DATE": result.INFO.DELIVERY_DATE,
          "PAYMENT": result.INFO.PAYMENT,
          "DETAIL": result.INFO.DETAIL,
          "KEY": result.KEY,
          "BANK": result.INFO.BANK,
          "LOAN_AMOUNT": result.INFO.LOAN_AMOUNT,
          "INSTALLMENT": result.INFO.INSTALLMENT,
          "TOTAL_AMOUNT": result.INFO.TOTAL_AMOUNT,
          "LOAN_KEY": result.INFO.LOAN_KEY,
          "INVOICE_KEY": result.INFO.INVOICE_KEY,
          "PRICE_LOAN": result.INFO.PRICE_LOAN,
          "DOC_LOAN": result.INFO.DOC_LOAN,

        }
        if (result.INFO.TYPE == "INVOICE") {
          this.showAccept = "showAccept"
        }
        else { this.showAccept = "" }

        if (result.INFO.TYPE == "ENDORSE_LOAN") {
          this.showAcceptLoan = "showAcceptLoan"
        }
        else { this.showAcceptLoan = "" }
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });

      },
        (err) => {
          this.loading = false;
          document.getElementById("result").style.display = "none";
          (<HTMLInputElement>document.getElementById("erMass")).value = err;
          document.getElementById("error").style.display = "block";
          // กรณี error
          if (err.error instanceof Error) {
            // กรณี error ฝั่งผู้ใช้งาน หรือ การเชื่อมต่อเกิด error ขึ้น
            console.log('An error occurred:', err.error.message);
          } else { // กรณี error ฝั่ง server ไม่พบไฟล์ ,server error
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        });
  }

  async confirm(rejecttemplate: any) { //click reject
    this.modalRef.hide();
    console.log('reject DATA');
    this.modalRef = this.modalService.show(rejecttemplate, { class: 'modal-dialog-centered modal-lg fade show' });

  }

  async confirmreject(successtemplate: any,errortemplate: any) { //click ok to reject
    console.log('saving draft ' + JSON.stringify(this.body));
    this.loading = true;
    this.modalRef.hide();
    await this.svc.Reject(this.body)
      .subscribe(
        sr => {
          this.loading = false;
          console.log('saving draft ' + JSON.stringify(sr));
          this.message = 'Reject Success';
          this.modalRef = this.modalService.show(successtemplate, { class: 'modal-dialog-centered modal-md fade show' });

        },
        error => {
          this.loading = false;
          let header = 'Error';
          this.message = error;
          console.log('Error:' + error);
          this.modalRef = this.modalService.show(errortemplate, { class: 'modal-dialog-centered modal-lg fade show' });

        });
  }

  async acceptbutton(accepttemplate: any) { //click reject
    this.modalRef.hide();
    console.log('Accept DATA');
    this.modalRef = this.modalService.show(accepttemplate, { class: 'modal-dialog-centered modal-md fade show' });

  }
  
  async confirmaccept(successtemplate: any,errortemplate: any) { //click ok to accept
    console.log('saving draft ' + JSON.stringify(this.body));
    this.loading = true;
    this.modalRef.hide();
    await this.svc.submitAcceptinvoice(this.body)
      .subscribe(
        sr => {
          this.loading = false;
          console.log('saving draft ' + JSON.stringify(sr));
          this.message = 'Accept Invoice Success';
          this.modalRef = this.modalService.show(successtemplate, { class: 'modal-dialog-centered modal-md fade show' });

        },
        error => {
          this.loading = false;
          let header = 'Error';
          this.message = error;
          console.log('Error:' + error);
          this.modalRef = this.modalService.show(errortemplate, { class: 'modal-dialog-centered modal-lg fade show' });

        });
  }

  
  async acceptloanbutton(acceptLoantemplate: any) { //click reject
    this.modalRef.hide();
    console.log('Accept Loan DATA');
    this.modalRef = this.modalService.show(acceptLoantemplate, { class: 'modal-dialog-centered modal-md fade show' });

  }
  
  async confirmacceptLoan(successtemplate: any,errortemplate: any) { //click ok to accept
    console.log('saving draft ' + JSON.stringify(this.body));
    this.loading = true;
    this.modalRef.hide();
    await this.svc.submitAcceptendorse(this.body)
      .subscribe(
        sr => {
          this.loading = false;
          console.log('saving draft ' + JSON.stringify(sr));
          this.message = 'Accept Loan Success';
          this.modalRef = this.modalService.show(successtemplate, { class: 'modal-dialog-centered modal-md fade show' });

        },
        error => {
          this.loading = false;
          let header = 'Error';
          this.message = error;
          console.log('Error:' + error);
          this.modalRef = this.modalService.show(errortemplate, { class: 'modal-dialog-centered modal-lg fade show' });

        });
  }

  decline(template: any): void {
    this.message = 'Declined!';
    this.modalRef.hide();
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered modal-md fade show' }); //back to template

  }

  Ok(): void {
    this.message = 'Ok!';
    this.modalRef.hide();
    setTimeout(function () {
      location.reload();
    }, 1500); // 5000 milliseconds means 5 seconds.
  }

  // mouseEnter(div: string) {
  //   console.log("mouse enter : " + div);
  // }

  // mouseLeave(div: string) {
  //   console.log('mouse leave :' + div);
  // }
}


