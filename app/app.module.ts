import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductDetailGuard } from './products/product-guard.service';
import { ProductFilterPipe } from './products/product-filter.pipe';
import { ProductListCompnent } from './products/product-list.component';
import { ProductService } from './products/product.service';
import { StarComponent } from './shared/star.component';
import { WelcomeComponent } from './home/welcome.component';

const appRoutes: Routes = [
  { path: 'products', component: ProductListCompnent },
  { path: 'product/:id', canActivate:[ ProductDetailGuard ], component: ProductDetailComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes) 
  ],
  declarations: [ 
    AppComponent,
    ProductDetailComponent,
    ProductFilterPipe,
    ProductListCompnent,
    StarComponent, 
    WelcomeComponent ],
  bootstrap: [ AppComponent ],
  providers: [ ProductService, ProductDetailGuard ]   // Injecting/registering service as provider
})
export class AppModule { }
