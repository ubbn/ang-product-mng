import { WelcomeComponent } from './home/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ProductService } from './products/product.service';
import { StarComponent } from './shared/star.component';
import { ProductFilterPipe } from './products/product-filter.pipe';
import { FormsModule } from '@angular/forms';
import { ProductListCompnent } from './products/product-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

const appRoutes: Routes = [
  { path: 'products', component: ProductListCompnent },
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
    ProductListCompnent,
    ProductFilterPipe,
    StarComponent, 
    WelcomeComponent ],
  bootstrap: [ AppComponent ],
  providers: [ ProductService ]   // Injecting/registering service as provider
})
export class AppModule { }
