import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { PROCURETOPAYService } from '../service/procuretopay.service';
import { Myinterfacedata } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  DASHBOARD_DATA: Myinterfacedata
  DASHBOARD_LIST: Myinterfacedata[]
  constructor(
    private svc: PROCURETOPAYService,

  ) { }

  ngOnInit() {
    this.svc.dashboard()
    .then(DASHBOARD_DATA => {
      this.DASHBOARD_DATA = DASHBOARD_DATA
    })

    this.svc.dashboardlist()
    .then(DASHBOARD_LIST => {
      this.DASHBOARD_LIST = DASHBOARD_LIST
    })
  }

  // ngOnInit() {
  //   this.svc.dashboard()
  //   .subscirb(STATUS => {
  //     this.STATUS = STATUS
  //   })

  // this.svc.dashboardlist()
  //   .subscirb(INFO => {
  //     this.INFO = INFO
  //   })
  //   console.log(JSON.stringify(this.STATUS))
  //   console.log(JSON.stringify(this.INFO))
  // }

  
}
