import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { GenericValidator } from '../shared/generic.valdiator';
import { NumberValidator } from '../shared/number.validator';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  templateUrl: 'product-edit.component.html',
  styleUrls: ['../app.component.css']
})

export class ProductEditComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Edit Product';
  errorMessage: string;
  productForm: FormGroup;
  product: IProduct;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form, 
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidator.range(1, 5)],
      tags: this.formBuilder.array([]),
      description: ''
    });

    // It subscribes to any change in parameter value in url
    // basically reads product id value from route parameter
    console.log('param goes here ' + JSON.stringify(this.route.params));
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.getProduct(id);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.productForm);
    });
  }

  private getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe(
      (product: IProduct) => this.onProductRetrieved(product),
      (error: any) => this.errorMessage = <any>error);
  }

  onProductRetrieved(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;
    console.log('jsonify2 ' + JSON.stringify(this.product));

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.formBuilder.array(this.product.tags || []));
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
    else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.dirty && this.productForm.valid) {
      // Copy the form values over the product object values
      let p = Object.assign({}, this.product, this.productForm.value);

      this.productService.saveProduct(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
        );
    } else if (!this.productForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}