import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';


/**
 * @class DrawerService
 */

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private drawer!: MatDrawer;

  constructor() { }

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  toggleDrawer() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

}
