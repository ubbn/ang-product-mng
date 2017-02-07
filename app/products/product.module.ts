import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';
import { ProductListComponent } from './product-list.component';
import { ProductDetailGuard } from './product-guard.service';
import { ProductDetailComponent } from './product-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule ({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  declarations : [
    ProductDetailComponent,
    ProductFilterPipe,
    ProductListComponent
  ],
  providers: [ ProductService, ProductDetailGuard ]   // Injecting/registering service as provider
})

export class ProductModule {}