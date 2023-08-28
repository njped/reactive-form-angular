## How to Understand the Phone Number Section inside the Customer Contact Component

1. formArrayName="phoneNumbers" - This code declares by name which FormArray object we're going to use inside this tag. phoneNumbers is this context does not refer to our getter method. Rather, it refers to the name of the property we gave to our FormArray object when declaring our form model.

2. <section *ngFor="let phone of phoneNumbers.controls; let i=index"> will iterate through all of the phoneNumbers. phoneNumbers is this context refers to our getter method. We need the index as well for the next line.

3. <div [formGroupName]="i"> declares by name which FormGroup object we're referring to. The "name" here happens to be just the index number.

4. <input matInput type="text" placeholder="Alias" formControlName="alias"> - here we're linking this input field to the alias form control by name. This helps both displaying what the form model has as well as updating the form model value through the UI.

5. This is similar to #4 above but for the number form control.

6. This is our add number button. It event binds click to the addPhone() method. It also displays on the last iteration by using the *ngIf structural directive.
