import { Component } from '@angular/core';

/**
 * W tej klasie umieszczamy wszystkie komponenty naszego projektu
 *
 * @class AppComponent
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'JustInTimeUI';
}
