import { TestBed } from '@angular/core/testing';
import { UserStoreService } from './user-store.service';
import { BehaviorSubject } from 'rxjs';

describe('UserStoreService', () => {
  let service: UserStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get role from store', (done) => {
    const testRole = 'admin';

    service.setRoleForStore(testRole); // Ustawiamy rolę

    service.getRoleFromStore().subscribe(role => {
      expect(role).toBe(testRole); // Sprawdzamy, czy rola jest poprawnie ustawiona
      done(); // Zakończymy test po otrzymaniu wartości
    });
  });

  it('should set and get full name from store', (done) => {
    const testFullName = 'John Doe';

    service.setFullNameForStore(testFullName); // Ustawiamy pełne imię

    service.getFullNameFromStore().subscribe(fullname => {
      expect(fullname).toBe(testFullName); // Sprawdzamy, czy pełne imię jest poprawnie ustawione
      done(); // Zakończymy test po otrzymaniu wartości
    });
  });
});
