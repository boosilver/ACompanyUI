
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Http, Headers, Request, RequestMethod, Response, ResponseContentType } from '@angular/http';
import {
  TransactionCreateInvoice,
  TransactionCreatePurchaseOrder,
  InquireInvoiceByKeyFields, InquirePOByKeyFields, Loanbyinv, Acceptendorse, Reject, Myinterfacedata
} from '../model';

import { HttpClient } from '@angular/common/http'

@Injectable()
export class PROCURETOPAYService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    // headers.append('X-krungsri-api-orgid', localStorage.getItem('orgid'));
    // headers.append('X-krungsri-api-appid', localStorage.getItem('appid'));
    // headers.append('X-krungsri-api-secret', localStorage.getItem('secret'));
  }


  private handleError(error: any) {
    let errorBody = JSON.parse(error._body);
    let errorMsg = errorBody.message;
    console.log('Error message: ', errorMsg);
    return throwError(errorMsg);
  };

  //  ----------------------------------- Submit Create PO --------------------------------------------------------
  submitCreatePurchaseOrder(model: TransactionCreatePurchaseOrder): Observable<any> {
    const url = environment.backendlotus + 'CreatePO'; // transaction.submit.service.request 
    let headers = new Headers();      //http://localhost:7002/api/v1/CreatePO
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  //  ----------------------------------- Submit Create INVOICE --------------------------------------------------------
  submitCreateInvoice(model: TransactionCreateInvoice): Observable<any> {
    const url = environment.backendlotus + 'CreateInvoice'; // transaction.submit.service.request
    let headers = new Headers();        // http://localhost:7002/api/v1/CreateInvoice
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  //  ----------------------------------- Submit Loan by INVOICE --------------------------------------------------------
  submitLoanbyInvoice(model: Loanbyinv): Observable<any> {
    const url = environment.backendlotus + 'Loan'; // transaction.submit.service.request
    let headers = new Headers();        // http://localhost:7002/api/v1/Loan
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------

  //  ----------------------------------- Accept Endorse --------------------------------------------------------
  submitAcceptendorse(model: Acceptendorse): Observable<any> {
    const url = environment.backendlotus + 'Accept'; // transaction.submit.service.request
    let headers = new Headers();       //http://localhost:7002/api/v1/Accept
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
    })
      .catch(this.handleError);
  }
  //  ----------------------------------- ------------------ --------------------------------------------------------


  // --------------------------------------------- Check Invoice key -----------------------------------------------------------
  InquireInvoiceByKeyFields(model: InquireInvoiceByKeyFields): Observable<any> {
    const url = environment.backendBaseUrl + 'CheckInvoice';//asset.service.request
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }
  // -------------------------------------------------- End key -----------------------------------------------------------


  // --------------------------------------------- Check Data key -----------------------------------------------------------
  InquirePOByKeyFields(model: InquirePOByKeyFields): Observable<any> {
    const url = environment.backendlotus + 'Get';//asset.service.request
    let headers = new Headers();      //http://localhost:7002/api/v1/Get
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }
  // -------------------------------------------------- End key -----------------------------------------------------------


  // --------------------------------------------- Reject -----------------------------------------------------------
  Reject(model: Reject): Observable<any> {
    const url = environment.backendlotus + 'Reject';//asset.service.request
    let headers = new Headers();      // http://localhost:7002/api/v1/Reject
    this.createAuthorizationHeader(headers);
    return this.http.post(url, model, {
      headers: headers
    }).map((res: Response) => {
      return res.json();
      // return res.json()[0];
    })
      .catch(this.handleError);
  }
  // -------------------------------------------------- End key -----------------------------------------------------------

  // dashboard() {
  //   const url = environment.backendlotus + 'GetList';
  //   // const url = 'assets/config.json';
  //   let headers = new Headers();
  //   this.createAuthorizationHeader(headers);
  //   console.log(this.httpClient.get(url))
  //   return this.httpClient.get<any>(url).toPromise().then(res => <Myinterfacedata>res.DASHBOARD_DATA).then(DASHBOARD_DATA => { return DASHBOARD_DATA; })
  // }

  // dashboardlist() {
  //   const url = environment.backendlotus + 'GetList';
  //   // const url = 'assets/config.json';
  //   let headers = new Headers();
  //   this.createAuthorizationHeader(headers);
  //   console.log(this.httpClient.get(url))
  //   return this.httpClient.get<any>(url).toPromise().then(res => <Myinterfacedata[]>res.DASHBOARD_LIST).then(DASHBOARD_LIST => { return DASHBOARD_LIST; })
  // }

  dashboard(): Observable<Myinterfacedata> {
    const url = environment.backendlotus + 'GetList';
    // const url = 'assets/config.json';
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    console.log(this.httpClient.get(url))
    return this.httpClient.get<Myinterfacedata>(url)
  }

  dashboardlist(): Observable<Myinterfacedata> {
    const url = environment.backendlotus + 'GetList';
    // const url = 'assets/config.json';
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    console.log(this.httpClient.get(url))
    return this.httpClient.get<Myinterfacedata>(url)
  }

}
