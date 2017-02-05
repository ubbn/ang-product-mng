import { ProductFilterPipe } from './products/product-filter.pipe';
import { FormsModule } from '@angular/forms';
import { ProductListCompnent } from './products/product-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule ],
  declarations: [ 
    AppComponent,
    ProductListCompnent,
    ProductFilterPipe ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
