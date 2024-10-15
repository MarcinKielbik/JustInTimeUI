import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';
import { User } from '../../models/user.model';

/**
 * @class UserSettingsComponent 
*/

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent implements OnInit{
   
  user: User = new User();  // Nowy obiekt użytkownika
  isEditing = {
    firstName: false,
    lastName: false,
    password: false
  };
  hidePassword = true;
  password: string = '';

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
      this.userSettingsService.getUserById().subscribe(
      (res: User) => {
        this.user = res;
      },
      (error) => {
        console.error('Błąd ładowania danych użytkownika', error);
      }
    );
  }
/*
  toggleEdit(field: 'firstName' | 'lastName' | 'password'): void {
    this.isEditing[field] = !this.isEditing[field];
  }

  saveChanges(): void {
    if (this.user) {
      this.userSettingsService.updateUser(this.user).subscribe(
        (updatedUser: User) => {
          this.user = updatedUser;
          this.isEditing = {
            firstName: false,
            lastName: false,
            password: false
          };
        },
        (error) => {
          console.error('Błąd zapisywania danych użytkownika', error);
        }
      );
    }
  }*/


    toggleEdit(field: keyof typeof this.isEditing): void {
      this.isEditing[field] = !this.isEditing[field];
    }
  
    saveChanges(): void {
      if (this.user) {
        this.userSettingsService.updateUser(this.user).subscribe(
          (updatedUser: User) => {
            this.user = updatedUser;
            this.isEditing = {
              firstName: false,
              lastName: false,
              password: false
            };
          },
          (error) => {
            console.error('Błąd zapisywania danych użytkownika', error);
          }
        );
      }
    }
  }
