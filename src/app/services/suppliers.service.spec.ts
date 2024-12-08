import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuppliersService } from './suppliers.service';
import { AuthService } from './auth.service';
import { Supplier } from '../models/supplier.model';

describe('SuppliersService', () => {
  let service: SuppliersService;
  let httpMock: HttpTestingController;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Tworzymy mock AuthService
    authServiceMock = jasmine.createSpyObj('AuthService', ['getUserId']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Symulowanie HTTP
      providers: [
        SuppliersService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(SuppliersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Weryfikacja, czy wszystkie żądania zostały zakończone
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of suppliers from the API', () => {
    const mockSuppliers: Supplier[] = [
      { id: 1, email: 'supplier1@example.com', firstName: 'John', lastName: 'Doe', companyName: 'Company 1', phoneNumber: '123456789' },
      { id: 2, email: 'supplier2@example.com', firstName: 'Jane', lastName: 'Smith', companyName: 'Company 2', phoneNumber: '987654321' }
    ];

    service.getSuppliers().subscribe(suppliers => {
      expect(suppliers.length).toBe(2);
      expect(suppliers).toEqual(mockSuppliers);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/Supplier');
    expect(req.request.method).toBe('GET');
    req.flush(mockSuppliers);
  });

  it('should retrieve a single supplier by id from the API', () => {
    const mockSupplier: Supplier = { id: 1, email: 'supplier1@example.com', firstName: 'John', lastName: 'Doe', companyName: 'Company 1', phoneNumber: '123456789' };

    service.getSupplier(1).subscribe(supplier => {
      expect(supplier).toEqual(mockSupplier);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/Supplier/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockSupplier);
  });

  it('should add a new supplier to the API', () => {
    const newSupplier: Supplier = { 
      email: 'supplier3@example.com', 
      firstName: 'Alice', 
      lastName: 'Johnson', 
      companyName: 'Company 3', 
      phoneNumber: '456123789' 
    };

    service.addSupplier(newSupplier).subscribe(supplier => {
      expect(supplier).toEqual(newSupplier);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/Supplier');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSupplier);
    req.flush(newSupplier);
  });

  it('should update an existing supplier in the API', () => {
    const updatedSupplier: Supplier = { 
      id: 1, 
      email: 'updated@example.com', 
      firstName: 'John', 
      lastName: 'Doe', 
      companyName: 'Updated Company', 
      phoneNumber: '123123123' 
    };

    service.updateSupplier(updatedSupplier).subscribe(suppliers => {
      expect(suppliers).toEqual([updatedSupplier]);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/Supplier/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSupplier);
    req.flush([updatedSupplier]);
  });

  it('should delete a supplier from the API', () => {
    const supplierToDelete: Supplier = { 
      id: 1, 
      email: 'supplier1@example.com', 
      firstName: 'John', 
      lastName: 'Doe', 
      companyName: 'Company 1', 
      phoneNumber: '123456789' 
    };

    service.deleteSupplier(supplierToDelete).subscribe(suppliers => {
      expect(suppliers).toEqual([supplierToDelete]);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/Supplier/1');
    expect(req.request.method).toBe('DELETE');
    req.flush([supplierToDelete]);
  });
});
