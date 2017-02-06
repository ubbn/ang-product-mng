import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from './product'

@Component({
  moduleId: module.id,  // it allows to use relative path to access resources in app root dir
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})

export class ProductListCompnent implements OnInit {
  pageTitle: string = 'All Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  listFilter: string;
  products: IProduct[];
  errorMessage: string;

  // On constructor, we resolve the service from provider
  constructor(private _productService: ProductService){
  }

  // implmenented member of OnInit interface
  ngOnInit(): void {
    this._productService.getProducts()
      .subscribe(products => this.products = products, error => this.errorMessage = <any>error);
  }

  toggleImage() : void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product list: ' + message;
  }

  onPriceClicked(price: number): void {
      this.pageTitle = 'Price: ' + price + ' clicked';
  }

  onNameClicked(name: string): void {
      this.pageTitle = 'Product name: ' + name + ' clicked';
  }
}