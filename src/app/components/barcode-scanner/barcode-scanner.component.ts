import { Component, inject } from '@angular/core';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { scan } from 'ionicons/icons';
import { BarcodeScannerService } from 'src/app/services/barcode-scanner/barcode-scanner.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  standalone: true,
  styleUrls: ['./barcode-scanner.component.scss'],
  imports: [IonFab, IonFabButton, IonIcon]
})
export class BarcodeScannerComponent {
  private barcodeScanner = inject(BarcodeScannerService);

  constructor(private router: Router) {
    addIcons({ scan });
  }

  public scan = async (): Promise<void> => {
    this.barcodeScanner.scan()
    .then(res => {
      const route = `step/en/1/${res}`;
      this.router.navigate([route])
    })
  }

}
