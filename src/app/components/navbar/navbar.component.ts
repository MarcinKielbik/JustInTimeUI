import { Component } from '@angular/core';
import { DrawerService } from '../../services/drawer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private drawerService: DrawerService, private authService: AuthService) { }

  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }

  logout(){
    this.authService.signOut();
  }
}
