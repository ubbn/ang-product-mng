import { ProductEditComponent } from './product-edit.component';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Route, Router } from '@angular/router';

@Injectable()
export class ProductDetailGuard implements CanActivate {
  
  constructor(private _router: Router){
  }

  // Validates if url string
  // Only allows the route if parameter is numeric value
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let id = +route.url[1].path;  // + operator converts string to number
    if (isNaN(id) || id <= 0){
      alert("Invalid product");
      this._router.navigate(['/products']);
      return false;
    }
    return true;
  }
}

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent): boolean {
    // true - deactivate route
    // false - cancel route deactivation
    if (component.productForm.dirty){
      let productName = component.productForm.get('productName').value || "New Product";
      return confirm(`Navigate away and lose all changes made to ${productName}?`);
    }
    return true;
  }
}