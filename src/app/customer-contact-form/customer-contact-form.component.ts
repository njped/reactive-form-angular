import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroupDirective, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-customer-contact-form',
  templateUrl: './customer-contact-form.component.html',
  styleUrls: ['./customer-contact-form.component.css']
})
export class CustomerContactFormComponent {
  form: FormGroup;
  fb: FormBuilder = new FormBuilder;  // we'll want to be able to access this later outside of the controller
  customErrorStateMatcher: ErrorStateMatcher = new CustomErrorStateMatcher();

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstName: ['John', Validators.compose([Validators.required, this.forbiddenFirstNameValidator()])],
      lastName: ['Doe', Validators.compose([Validators.required, this.forbiddenLastNameValidator()])],
      email: ['test@test.com', Validators.compose([Validators.email, Validators.required])],
      address: fb.group({
        street: ['123 Main St.'],
        city: ['Salt Lake City'],
        state: ['UT'],
        zip: ['84001']
      }),
      // new FormArray object:
      phoneNumbers: fb.array([
        fb.group({
          alias: ['Home'],
          number: ['385-523-1584']
        }),
        fb.group({
          alias: ['Mobile'],
          number: ['801-665-7865']
        }),
        fb.group({
          alias: ['Office'],
          number: ['425-275-9342']
        }),
      ]),
      // ^^^ new FormArray object ^^^
    }, { validator: this.forbiddenFullNameValidator })
  };

  forbiddenFullNameValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const firstName = control.get('firstName').value;
    const lastName = control.get('lastName').value;
    const fullName = `${firstName} ${lastName}`;
    const forbidden = new RegExp(/^[Mm]ickey [Mm]ouse$/).test(fullName);
    return forbidden ? { 'forbiddenFullName': { value: fullName } } : null;
  }

  forbiddenFirstNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = new RegExp(/[Mm]ickey/).test(control.value);
      return forbidden ? { 'forbiddenFirstName': { value: control.value } } : null;
    };
  }

  forbiddenLastNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = new RegExp(/[Mm]ouse/).test(control.value);
      return forbidden ? { 'forbiddenLastName': { value: control.value } } : null;
    };
  }

  reset(): void {
    this.form.controls['firstName'].setValue('');
    this.form.controls['lastName'].setValue('');
    this.form.controls['email'].setValue('');
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

class CustomErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl, form: FormGroupDirective): boolean {
    return form.getError('forbiddenFullName') || control.invalid;
  }
}