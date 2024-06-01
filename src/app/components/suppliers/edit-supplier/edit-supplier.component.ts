import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '../../../models/supplier.model';
import { SuppliersService } from '../../../services/suppliers.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.scss'
})
export class EditSupplierComponent {
  @Input() supplier?: Supplier;
  @Output() supplierUpdated = new EventEmitter<Supplier[]>();

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'password', 'companyName', 'phoneNumber'];

  columnLabels: { [key: string]: string } = {
    email: 'Email',
    firstName: 'Imię',
    lastName: 'Nazwisko',
    password: 'Hasło',
    companyName: 'Nazwa firmy',
    phoneNumber: 'Telefon komórkowy'
  };

  constructor(private suppliersService: SuppliersService) {}

  addSupplier(supplier: Supplier): void {
    console.log(supplier);
    this.suppliersService.addSupplier(supplier);
  }

  updateSupplier(supplier: Supplier): void {
    this.suppliersService.updateSupplier(supplier)
    .subscribe((suppliers: Supplier[]) => this.supplierUpdated.emit(suppliers));
  }

  deleteSupplier(supplier: Supplier): void {
    this.suppliersService.deleteSupplier(supplier)
    .subscribe((suppliers: Supplier[]) => this.supplierUpdated.emit(suppliers));
  }
}
