import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Moduł do testowania żądań HTTP
        RouterTestingModule,    // Moduł do testowania nawigacji
      ],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Weryfikacja, czy wszystkie żądania zostały zakończone
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store tokens in localStorage', () => {
    spyOn(localStorage, 'setItem'); // Szpieguj `localStorage.setItem`
    service.saveTokens('access-token', 'refresh-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'access-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh-token');
  });

  it('should sign out and clear localStorage', () => {
    spyOn(localStorage, 'clear'); // Szpieguj `localStorage.clear`
    spyOn(service['router'], 'navigate'); // Szpieguj `router.navigate`
    service.signOut();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(service['router'].navigate).toHaveBeenCalledWith(['login']);
  });

  it('should call signIn and save tokens', () => {
    const mockResponse = {
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
      userId: 1,
    };

    service.signIn({ username: 'test', password: 'password' }).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://localhost:7148/api/Auth/authenticate');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse); // Symulacja odpowiedzi serwera
  });
});
