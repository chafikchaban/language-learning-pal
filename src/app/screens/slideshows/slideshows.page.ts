import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonCard, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { Language } from 'src/app/model/language.model';
import { Level } from 'src/app/model/level.model';
import { Step } from 'src/app/model/step.model';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForward } from 'ionicons/icons';
import { Lesson } from 'src/app/model/lesson.model';

@Component({
  selector: 'app-slideshows',
  templateUrl: './slideshows.page.html',
  styleUrls: ['./slideshows.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonCard, IonCardHeader, IonCardTitle, IonIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlideshowsPage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  private dataService = inject(DataService);

  public language?: Language;
  public level?: Level;
  public step?: Step;
  public lessons: Array<Lesson> = []

  constructor(private route: ActivatedRoute) {
    addIcons({ arrowBack, arrowForward })

    const languageCode = this.route.snapshot.paramMap.get('languageCode') || '';
    const levelId = Number(this.route.snapshot.paramMap.get('levelId')) || 0;
    const stepId = Number(this.route.snapshot.paramMap.get('id')) || 0;

    this.language = this.dataService.getLanguageById(languageCode)
    this.level = this.dataService.getLevelById(levelId)

    this.dataService.getSlideshowsForStep(languageCode, stepId)
      .then((slideshows) => {
        this.lessons = slideshows
      })
  }

  public goPrev = () => {
    this.swiperRef?.nativeElement.swiper.slidePrev()
  }

  public goNext = () => {
    this.swiperRef?.nativeElement.swiper.slideNext()
  }

}
