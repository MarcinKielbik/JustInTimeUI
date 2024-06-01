import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private email$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.email$.asObservable();
  }

  public setFullNameForStore(fullname: string){
    this.email$.next(fullname)
  }
}
