import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import { ProductEditComponent } from './product-edit.component';
import { ProductDetailComponent } from './product-detail.component';

const productRoutes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', 
    canActivate:[ ProductDetailGuard ], 
    component: ProductDetailComponent 
  },
  { path: 'productEdit/:id', 
    canDeactivate:[ ProductEditGuard ], 
    component: ProductEditComponent
  }  
];

@NgModule ({
  imports: [ RouterModule.forChild(productRoutes) ],
  exports: [ RouterModule ]
})

export class ProductRoutingModule {}