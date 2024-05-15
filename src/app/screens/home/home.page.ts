import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg } from '@ionic/angular/standalone';
import { BarcodeScannerComponent } from 'src/app/components/barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg, BarcodeScannerComponent],
})
export class HomePage {

  constructor() {

  }

}
