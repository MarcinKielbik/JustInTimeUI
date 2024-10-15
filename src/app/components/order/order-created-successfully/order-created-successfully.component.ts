import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @class OrderCreatedSuccessfullyComponent 
*/


@Component({
  selector: 'app-order-created-successfully',
  templateUrl: './order-created-successfully.component.html',
  styleUrl: './order-created-successfully.component.scss'
})
export class OrderCreatedSuccessfullyComponent {
  delivery = "../assets/img/delivery-track.png"

  constructor(private router: Router) {}

  backToOrderList(): void {
    this.router.navigate(['/dashboard/orders']);
  }

}
