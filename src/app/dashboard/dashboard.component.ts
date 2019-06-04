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

  data: Myinterfacedata
  list: Myinterfacedata[]
  constructor(
    private svc: PROCURETOPAYService,

  ) { }

  ngOnInit() {
    this.svc.dashboard()
    .then(data => {
      this.data = data
    })

    this.svc.dashboardlist()
    .then(list => {
      this.list = list
    })
  }

  // ngOnInit() {
  //   this.svc.dashboard()
  //   .subscirb(data => {
  //     this.data = data
  //   })
  //   console.log(JSON.stringify(this.data))
  // }
}
