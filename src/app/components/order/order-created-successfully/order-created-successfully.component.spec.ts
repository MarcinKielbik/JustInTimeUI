import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreatedSuccessfullyComponent } from './order-created-successfully.component';

describe('OrderCreatedSuccessfullyComponent', () => {
  let component: OrderCreatedSuccessfullyComponent;
  let fixture: ComponentFixture<OrderCreatedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderCreatedSuccessfullyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderCreatedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
