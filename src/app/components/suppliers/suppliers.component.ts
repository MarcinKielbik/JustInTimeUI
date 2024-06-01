import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'password', 'companyName', 'phoneNumber'];
  supplierToEdit?: Supplier;

  constructor(private suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe((suppliers: Supplier[]) => {
      this.suppliers = suppliers;
    });
  }

  initNewSupplier(): void {
    this.supplierToEdit = new Supplier();
  }

  editSupplier(supplier: Supplier): void {
    this.supplierToEdit = supplier;
  }

  updateSupplier(): void {
    // Aktualizuj listę dostawców po edycji
    this.loadSuppliers();
  }
}
