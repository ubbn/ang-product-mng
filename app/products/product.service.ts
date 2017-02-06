import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IProduct } from './product';

// Services can be injected in angular module or angular Component
// and are resolved through constructor of the class which will use the service
@Injectable()
export class ProductService {
  private productUrl: string = 'api/products/products.json';

  constructor(private _http: Http){
  }

  getProducts(): Observable<IProduct[]> {
    return this._http.get(this.productUrl) // get returns Response object
      .map((response: Response) => <IProduct[]>response.json()) // map Response into Product array
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);   // Any error ocurred will be handled in this method
  }

  getProduct(id: number): Observable<IProduct> {
    return this.getProducts()
      .map((products: IProduct[]) => products.find(p => p.productId === id));
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}