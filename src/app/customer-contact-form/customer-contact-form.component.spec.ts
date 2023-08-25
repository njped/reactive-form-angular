import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactFormComponent } from './customer-contact-form.component';

describe('CustomerContactFormComponent', () => {
  let component: CustomerContactFormComponent;
  let fixture: ComponentFixture<CustomerContactFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerContactFormComponent]
    });
    fixture = TestBed.createComponent(CustomerContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
