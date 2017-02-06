import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router } from '@angular/router';

@Injectable()
export class ProductDetailGuard implements CanActivate {
  
  constructor(private _router: Router){
  }

  // Validates if url string
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