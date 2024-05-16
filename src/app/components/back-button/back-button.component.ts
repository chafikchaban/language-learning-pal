import { Component } from '@angular/core';
import { IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  standalone: true,
  styleUrls: ['./back-button.component.scss'],
  imports: [IonButtons, IonBackButton ]
})
export class BackButtonComponent {

  constructor() { }

}
