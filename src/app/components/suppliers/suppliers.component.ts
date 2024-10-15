import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';
import { Supplier } from '../../models/supplier.model';
import { MatTableDataSource } from '@angular/material/table';
/**
 * @class SuppliersComponent 
*/

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  // suppliers: Supplier[] = [];
  dataSource = new MatTableDataSource<Supplier>();

  displayedColumns: string[] = [
    'email', 
    'firstName', 
    'lastName', 
    // 'password', 
    'companyName', 
    'phoneNumber', 
    'actions'
  ];

  supplierToEdit?: Supplier;

  columnLabels: { [key: string]: string } = {
    email: 'Email',
    firstName: 'Imię',
    lastName: 'Nazwisko',
    // password: 'Hasło',
    companyName: 'Nazwa firmy',
    phoneNumber: 'Telefon komórkowy',
    actions: 'Akcje'
  };

  constructor(private suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }
/*
  loadSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe(
      (suppliers: Supplier[]) => {
        this.suppliers = suppliers;
        console.log('Suppliers loaded:', this.suppliers);
      },
      error => {
        console.error('Error fetching suppliers', error);
      }
    );
  }*/

    loadSuppliers(): void {
      this.suppliersService.getSuppliers().subscribe((response: any) => {
        // Check if the response contains the $values property and extract the suppliers array from it
        const suppliers: Supplier[] = response?.$values ? response.$values : response;
        this.dataSource.data = suppliers;
      });
    }

  initNewSupplier(): void {
    this.supplierToEdit = new Supplier();
  }

  editSupplier(supplier: Supplier): void {
    this.supplierToEdit = supplier;
  }

  updateSupplier(): void {
    this.loadSuppliers();
  }

  
}
