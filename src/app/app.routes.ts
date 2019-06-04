import { Routes } from '@angular/router';
import {InvoiceComponent} from './invoice/invoice.component';
import {IndexComponent} from './index/index.component';
import {PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { CheckpoComponent } from './checkpo/checkpo.component';
import { LoanbyinvComponent } from './loanbyinv/loanbyinv.component';
import { AcceptComponent } from './accept/accept.component';
import { RejectComponent } from './reject/reject.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const AppRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'checkinvoice', component: IndexComponent },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'purchaseorder', component: PurchaseOrderComponent},
    { path: 'checkpo', component: CheckpoComponent},
    { path: 'loanbyinv', component: LoanbyinvComponent},
    { path: 'accept', component: AcceptComponent},
    { path: 'reject', component: RejectComponent},
    { path: 'dashboard', component: DashboardComponent},

    
];
