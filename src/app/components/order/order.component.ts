import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SuppliersService } from '../../services/suppliers.service';
import { Supplier } from '../../models/supplier.model';

/**
 * @class OrderComponent 
*/

interface ExtendedOrder extends Order {
  supplierName?: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  dataSource = new MatTableDataSource<ExtendedOrder>([]);
  suppliers: Supplier[] = [];

  displayedColumns: string[] = ['id', 'productName', 'quantity', 'pricePerUnit', 'currency', 'pickupLocation', 'destination', 'orderDate', 'dueDate', 'supplierName', 'status'];

  constructor(private orderService: OrderService, private router: Router, private suppliersService: SuppliersService) { }

  ngOnInit(): void {
    this.loadSuppliers();
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
        this.loadOrders();
      },
      (error: any) => {
        console.error('Error loading suppliers:', error);
      }
    );
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (response: Order[]) => {
        console.log('API response:', response);
        this.dataSource.data = response.map(order => {
          const extendedOrder: ExtendedOrder = { ...order };
          const supplier = this.suppliers.find(s => s.id === order.supplierId);
          if (supplier) {
            extendedOrder.supplierName = `${supplier.firstName} ${supplier.lastName}`;
          }
          return extendedOrder;
        });
      },
      (error) => {
        console.error('Order loading error:', error);
      }
    );
  }
  
  newOrder(): void {
    this.router.navigate(['dashboard/orders/new-order']);
  }
}
