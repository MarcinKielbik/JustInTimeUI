import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { Order } from '../models/order.model';

describe('OrderService', () => {
  let service: OrderService;
  let httpTestingController: HttpTestingController;

  const mockOrders: Order[] = [
    {
      id: 1,
      productName: 'Produkt 1',
      quantity: 10,
      pricePerUnit: 20,
      currency: 'PLN',
      pickupLocation: 'Warszawa',
      destination: 'Kraków',
      orderDate: new Date('2024-12-01'),
      dueDate: new Date('2024-12-10'),
      status: 'Czeka na odbiór',
      supplierId: 5,
      userId: 2,
    },
    {
      id: 2,
      productName: 'Produkt 2',
      quantity: 5,
      pricePerUnit: 50,
      currency: 'EUR',
      pickupLocation: 'Berlin',
      destination: 'Hamburg',
      orderDate: new Date('2024-11-20'),
      dueDate: new Date('2024-11-25'),
      status: 'Czeka na odbiór',
      supplierId: 3,
      userId: 1,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Upewnij się, że żadne nieoczekiwane żądania nie zostały wysłane
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all orders', () => {
    service.getOrders().subscribe((orders) => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpTestingController.expectOne('https://localhost:7148/api/Order');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders); // Symuluje odpowiedź serwera z mockowymi danymi
  });

  it('should fetch a specific order by ID', () => {
    const mockOrder = mockOrders[0];
    service.getOrder(mockOrder.id!).subscribe((order) => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpTestingController.expectOne(`https://localhost:7148/api/Order/${mockOrder.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrder);
  });

  it('should add a new order', () => {
    const newOrder: Order = {
      productName: 'Produkt 3',
      quantity: 15,
      pricePerUnit: 100,
      currency: 'USD',
      pickupLocation: 'Nowy Jork',
      destination: 'Los Angeles',
      orderDate: new Date('2024-12-15'),
      dueDate: new Date('2024-12-20'),
      status: 'Czeka na odbiór',
      supplierId: 8,
      userId: 4,
    };

    service.addOrder(newOrder).subscribe((order) => {
      expect(order).toEqual({ ...newOrder, id: 3 }); // Symulacja odpowiedzi serwera z przypisanym ID
    });

    const req = httpTestingController.expectOne('https://localhost:7148/api/Order');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newOrder); // Sprawdzenie, czy wysyłane dane są poprawne
    req.flush({ ...newOrder, id: 3 }); // Symulacja odpowiedzi serwera
  });
});
