import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      firstName: ['Nathan'],
      lastName: ['Pedigo']
    });
  }

  reset(): void {
    this.form.controls['firstName'].setValue('');
    this.form.controls['lastName'].setValue('');
  }
}
