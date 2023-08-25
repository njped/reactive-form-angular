import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-customer-contact-form',
  templateUrl: './customer-contact-form.component.html',
  styleUrls: ['./customer-contact-form.component.css']
})
export class CustomerContactFormComponent {
  form: FormGroup;
  fb: FormBuilder = new FormBuilder;  // we'll want to be able to access this later outside of the controller

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstName: [ 'John' ],
      lastName: [ 'Doe' ],
      // new FormArray object:
      phoneNumbers: fb.array([fb.group({
        alias: ['Home'],
        number: ['555-555-5555']
      })]),
      // ^^^ new FormArray object ^^^
      address: fb.group({
        street: ['123 Main St.'],
        city: ['Salt Lake City'],
        state: ['UT'],
        zip: ['84001']
      })
    });
  }

  reset(): void {
    this.form.controls['firstName'].setValue('');
    this.form.controls['lastName'].setValue('');
  }

  fillDefaultAddress(): void {
    this.form.patchValue({
      address: {
        street: '456 Default St',
        city: 'Defaultolopolis',
        state: 'CA',
        zip: '90000',
      }
    });
  }

  get phoneNumbers(): FormArray {
    return this.form.get('phoneNumbers') as FormArray;
  }

  addPhone(): void {
    this.phoneNumbers.push(this.fb.group({
      alias: [''],
      number: ['']
    }));
  }
}
