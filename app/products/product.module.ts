import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './product-edit.component';
import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';

import { ProductData } from './product-data';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';
import { ProductListComponent } from './product-list.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import { ProductDetailComponent } from './product-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule ({
  imports: [
    SharedModule,
    InMemoryWebApiModule.forRoot(ProductData),
    ProductRoutingModule,
    ReactiveFormsModule
  ],
  declarations : [
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductListComponent
  ],
  providers: [ ProductService, ProductDetailGuard, ProductEditGuard ]   // Registering service as provider
})

export class ProductModule {}