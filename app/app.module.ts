import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductModule } from './products/product.module';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    ProductModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent,
    WelcomeComponent 
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
