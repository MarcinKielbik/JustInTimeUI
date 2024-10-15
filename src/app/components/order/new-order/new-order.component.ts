import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { SuppliersService } from '../../../services/suppliers.service';
import { Router } from '@angular/router';
import { Order } from '../../../models/order.model';
import { Supplier } from '../../../models/supplier.model';
import { AuthService } from '../../../services/auth.service';

/**
 * @class NewOrderComponent 
*/

interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  orderForm: FormGroup;
  suppliers: Supplier[] = [];
  currencies: Currency[] = [
    { value: 'PLN', viewValue: 'PLN' },
    { value: 'EUR', viewValue: 'EUR' },
    { value: 'USD', viewValue: 'USD' },
    { value: 'CZK', viewValue: 'CZK' },
    { value: 'DKK', viewValue: 'DKK' },
    { value: 'GBP', viewValue: 'GBP' },
    { value: 'RUB', viewValue: 'RUB' }
  ];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private suppliersService: SuppliersService,
    private router: Router,
    private authService: AuthService
  ) {
    this.orderForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      pricePerUnit: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      destination: ['', Validators.required],
      orderDate: ['', Validators.required],
      orderTime: ['', Validators.required],
      dueDate: ['', Validators.required],
      dueTime: ['', Validators.required],
      supplierId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  getUserId(): number | null{
    const id = this.authService.getUserId();
    return id;
  }

  loadSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.suppliers = response;
        } else if (response && response.$values) {
          this.suppliers = response.$values;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.error('Error loading suppliers:', error);
      }
    );
  }

  createNewOrder(): void {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;

      // Łączenie daty i godziny zamówienia w lokalnej strefie czasowej
      const orderDate = new Date(formValue.orderDate);
      const [orderHours, orderMinutes] = formValue.orderTime.split(':').map(Number);
      orderDate.setHours(orderHours, orderMinutes, 0, 0);

      // Łączenie daty i godziny terminu w lokalnej strefie czasowej
      const dueDate = new Date(formValue.dueDate);
      const [dueHours, dueMinutes] = formValue.dueTime.split(':').map(Number);
      dueDate.setHours(dueHours, dueMinutes, 0, 0);

      // Konwersja na ISO string w lokalnej strefie czasowej
      const orderDateTimeLocal = new Date(orderDate.getTime() - orderDate.getTimezoneOffset() * 60000);
      const dueDateTimeLocal = new Date(dueDate.getTime() - dueDate.getTimezoneOffset() * 60000);

      const newOrder: Order = {
        ...formValue,
        orderDate: orderDateTimeLocal.toISOString(),
        dueDate: dueDateTimeLocal.toISOString(),
        status: 'Czeka na odbiór',
        userId: this.getUserId()
      };

      this.orderService.addOrder(newOrder).subscribe(
        (createdOrder: Order) => {
          console.log('Order created successfully:', createdOrder);
          this.router.navigate(['dashboard/orders/order-created-successfully']);
        },
        (error) => {
          console.error('Error creating order:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
