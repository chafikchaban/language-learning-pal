import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle'
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { CachingService } from './services/caching/caching.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(private cache: CachingService) {
    this.cache.init();
    ScreenOrientation.lock({ orientation: 'portrait' })
  }

}
