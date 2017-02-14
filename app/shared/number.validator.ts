import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidator {
  // validates if value on the control is in the given range
  static range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
      if (c.value && isNaN(c.value) || c.value < min || c.value > max)
        return { 'range': true };
      return null;
    };
  }
}