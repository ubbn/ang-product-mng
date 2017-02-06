import { Subscription } from 'rxjs/Rx';
import { ProductService } from './product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
  moduleId: module.id,
  templateUrl: 'product-detail.component.html'
})

export class ProductDetailComponent implements OnInit, OnDestroy {
  product: IProduct;
  errorMessage: string;
  pageTitle: string = 'Product detail';
  private sub: Subscription;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService){
  }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getProduct(id)
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }
}