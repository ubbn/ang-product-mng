import { IProduct } from './product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // name of our custom pipe filter
  name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform {

  // Filtering logic goes in this implementation
  transform(value: IProduct[], filterBy: string) : IProduct[] {
    filterBy = filterBy ? filterBy.toLowerCase() : null;
    return filterBy ? value.filter((product: IProduct) =>
      product.productName.toLowerCase().indexOf(filterBy) !== -1) : value;
  }

} 