import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserSettingsService } from './user-settings.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let httpMock: HttpTestingController;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Tworzymy mock AuthService
    authServiceMock = jasmine.createSpyObj('AuthService', ['getUserId']);
    authServiceMock.getUserId.and.returnValue(1); // Mockujemy getUserId na zwrócenie ID 1

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importujemy moduł do testów HTTP
      providers: [
        UserSettingsService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(UserSettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Weryfikacja, czy wszystkie żądania zostały zakończone
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user by id from the API', () => {
    const mockUser: User = {
      id: 1,
      email: 'user@example.com',
      phoneNumber: '123456789',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123'
    };

    service.getUserById().subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/User/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser); // Zwracamy dane użytkownika
  });

  it('should update user settings', () => {
    const updatedUser: User = {
      id: 1,
      email: 'updateduser@example.com',
      phoneNumber: '987654321',
      firstName: 'John',
      lastName: 'Doe',
      password: 'newpassword123'
    };

    service.updateUser(updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/User/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(updatedUser); // Zwracamy zaktualizowane dane
  });
});
