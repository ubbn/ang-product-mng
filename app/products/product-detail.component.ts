import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
  moduleId: module.id,
  templateUrl: 'product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {
  product: IProduct;
  pageTitle: string = 'Product detail';

  constructor(private _route: ActivatedRoute, private _router: Router){
  }

  ngOnInit(): void {
    let id = +this._route.snapshot.params['id'];
    this.pageTitle += `: ${id}`; 
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }
}