import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { PhonesComponent } from './phones/phones.component';
import { DealsComponent } from './deals/deals.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FormsModule } from '@angular/forms';
import { SettlementComponent } from './settlement/settlement.component';
import { SupportComponent } from './support/support.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes = [
  { 
    path: '', component: HomeComponent, 
    canActivate: [AuthGuard]
    
  },
  { 
    path: 'laptops', component: PhonesComponent,
    canActivate: [AuthGuard]
 
  },
  { 
    path: 'deals', component: DealsComponent, 
    canActivate: [AuthGuard]

  },
  { 
    path: 'cart', component: CartComponent, 
    canActivate: [AuthGuard]

  },
  { 
    path: 'details', component: DetailsComponent, 
    canActivate: [AuthGuard]

  },
  { 
    path: 'orders', component: MyOrdersComponent, 
    canActivate: [AuthGuard]

  },
  { 
    path: 'settlement', component: SettlementComponent, 
    canActivate: [AuthGuard]

  },
  {
    path: 'support', component: SupportComponent,
    canActivate: [AuthGuard]

  }
]

@NgModule({
  declarations: [
    HomeComponent,
    PhonesComponent,
    DealsComponent,
    CartComponent,
    DetailsComponent,
    MyOrdersComponent,
    SettlementComponent,
    SupportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class HomeModule { }
