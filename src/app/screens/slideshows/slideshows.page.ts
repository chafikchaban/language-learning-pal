import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonCard, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { Language } from 'src/app/model/language.model';
import { Level } from 'src/app/model/level.model';
import { Step } from 'src/app/model/step.model';
import { Slideshow, SlideshowTemplate } from 'src/app/model/slideshow.model';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { imagesOutline, textOutline, listCircleOutline, arrowBack, arrowForward } from 'ionicons/icons';
import Swiper from 'swiper';

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
  public slideshows: Slideshow[] = []

  constructor(private route: ActivatedRoute) {
    addIcons({ imagesOutline, textOutline, listCircleOutline, arrowBack, arrowForward })

    const languageCode = this.route.snapshot.paramMap.get('languageCode') || '';
    const levelId = Number(this.route.snapshot.paramMap.get('levelId')) || 0;
    const stepId = Number(this.route.snapshot.paramMap.get('id')) || 0;

    this.language = this.dataService.getLanguageById(languageCode)
    this.level = this.dataService.getLevelById(levelId)

    this.dataService.getSlideshowsForStep(languageCode, stepId)
      .then((slideshows) => {
        this.slideshows = slideshows.map(item => ({
          ...item,
          iconName: this.getIconName(item.template)
        }))
      })

  }


  public goPrev = () => {
    this.swiperRef?.nativeElement.swiper.slidePrev()

  }

  public goNext = () => {
    this.swiperRef?.nativeElement.swiper.slideNext()
  }

  private getIconName = (template: SlideshowTemplate): string => {
    switch (template) {
      case 'IMAGE_TITLE_SENTENCE': return 'images-outline';
      case 'LETTER_PRESENTATION': return 'text-outline';
      case 'MULTIPLE_CHOICE_TEXT': return 'list-circle-outline';
      default: return '';
    }

  }

}
