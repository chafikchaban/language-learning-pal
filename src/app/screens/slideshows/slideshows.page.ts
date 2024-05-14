import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { Language } from 'src/app/model/language.model';
import { Level } from 'src/app/model/level.model';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/model/lesson.model';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { addIcons } from 'ionicons';
import { volumeMediumOutline } from 'ionicons/icons'

import { FileSystemService } from 'src/app/services/file-system/file-system.service';

@Component({
  selector: 'app-slideshows',
  templateUrl: './slideshows.page.html',
  styleUrls: ['./slideshows.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonCard, IonCardHeader, IonCardTitle, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SlideshowsPage implements OnDestroy {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;


  private dataService = inject(DataService);

  public language?: Language;
  public level?: Level;
  public stepId: number = 0;
  public lessons: Array<Lesson> = [];
  public correctAnswerSelected?: boolean;

  constructor(private activeRoute: ActivatedRoute, private router: LocationStrategy, private fs: FileSystemService) {
    ScreenOrientation.lock({ orientation: 'landscape' });
    addIcons({ volumeMediumOutline });

    const languageCode = this.activeRoute.snapshot.paramMap.get('languageCode') || '';
    const levelId = Number(this.activeRoute.snapshot.paramMap.get('levelId')) || 0;
    this.stepId = Number(this.activeRoute.snapshot.paramMap.get('id')) || 0;

    this.language = this.dataService.getLanguageById(languageCode)
    this.level = this.dataService.getLevelById(levelId)

    this.dataService.getSlideshowsForStep(this.stepId).subscribe(data => {
      this.lessons = data;
    });
  }

  ngOnDestroy() {
    ScreenOrientation.lock({ orientation: 'portrait' });
  }

  public playAudio = async (lessonId: number): Promise<void> => {
    const selectedLesson = this.lessons.find(l => {
      return l.id === lessonId
    }) as Lesson

    const base64Sound = await this.fs.readFile(selectedLesson.localAudioFileName as string);
    const audioRef = new Audio(`data:audio/mp3;base64,${base64Sound}`)

    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }

  public goPrev = (): void => {
    this.swiperRef?.nativeElement.swiper.slidePrev()
  }

  public goNext = (): void => {
    this.correctAnswerSelected = undefined;

    if (this.swiperRef?.nativeElement.swiper.activeIndex === this.lessons.length - 1) {
      this.router.back();

      return;
    }
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  public onMultiChoiceSelect = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const { value } = input;
    // @ts-ignore
    this.correctAnswerSelected = value.expectedSelection;
  }

}
