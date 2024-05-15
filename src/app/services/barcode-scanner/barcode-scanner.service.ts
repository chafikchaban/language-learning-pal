import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
  public isSupported: boolean = false;

  constructor(private alertController: AlertController) {
    this.checkSupport();
  }

  async scan(): Promise<string | null> {
    const granted: boolean = await this.requestPermissions();

    if (!granted) {
      this.presentAlert();
      return null;
    }

    const { barcodes } = await BarcodeScanner.scan();
    return barcodes[0].rawValue
  }

  checkSupport = async (): Promise<void> => {
    await BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
