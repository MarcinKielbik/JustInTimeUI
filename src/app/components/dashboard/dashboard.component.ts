import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '../../services/drawer.service';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';

/**
 * @class DashboardComponent
*/
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  public email: string = "";
  public role: string = "";

  constructor(private drawerService: DrawerService, private auth: AuthService, private userStore: UserStoreService) {
  }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        const fullNameFromToken = this.auth.getFullNameFromToken();
        this.email = val || fullNameFromToken || ""; // Obsłuż 'null' jako pusty string
      });

    this.userStore.getRoleFromStore()
      .subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken || ""; // Obsłuż 'null' jako pusty string
      });
  }

  ngAfterViewInit() {
    this.drawerService.setDrawer(this.drawer);
  }
}
