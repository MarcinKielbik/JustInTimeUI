import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '../../../models/supplier.model';
import { SuppliersService } from '../../../services/suppliers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @class EditSupplierComponent 
*/


@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
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
  password: string = '';
  hidePassword: boolean = true;

  constructor(
    private suppliersService: SuppliersService,    
    private snackBar: MatSnackBar
  ) {}
  
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Zamknij', {
      duration: 5000,
    });
  }

  addSupplier(supplier: Supplier): void {
    // Dodajemy hasło tylko jeśli jest ustawione
    if (this.password) {
      supplier.password = this.password;
    }

    this.suppliersService.addSupplier(supplier).subscribe({
      next: () => {
        this.supplierUpdated.emit();
      },
      error: (err) => {
        this.showError(err.error.message || 'Nie udało się dodać dostawcy.');
      }
    });
  }

  updateSupplier(supplier: Supplier): void {
    // Aktualizujemy hasło tylko jeśli jest ustawione
    if (!this.password) {
      delete supplier.password;
    } else {
      supplier.password = this.password;
    }

    this.suppliersService.updateSupplier(supplier).subscribe({
      next: () => {
        this.supplierUpdated.emit();
      },
      error: (err) => {
        this.showError(err.error.message || 'Nie udało się zaktualizować dostawcy.');
      }
    });
  }

  deleteSupplier(supplier: Supplier): void {
    if (supplier.id !== undefined) {
      this.suppliersService.deleteSupplier(supplier).subscribe({
        next: () => {
          this.supplierUpdated.emit();
        },
        error: (err) => {
          this.showError(err.error.message || 'Nie udało się usunąć dostawcy.');
        }
      });
    }
  }
}
