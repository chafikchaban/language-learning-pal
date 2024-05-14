import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, mergeMap, switchMap } from 'rxjs';
import { Language, LanguagesPayload } from 'src/app/model/language.model';
import { Lesson } from 'src/app/model/lesson.model';
import { Level, LevelsPayload } from 'src/app/model/level.model';
import { SlideshowsPayload } from 'src/app/model/slideshow.model';
import { StepsPayload } from 'src/app/model/step.model';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpService);

  public languages: Language[] = [];
  public levels: Level[] = [];

  constructor() { }

  public getLanguages(): Observable<LanguagesPayload> {
    return this.http.get('languages')
  }

  public getLanguageById(languageCode: string): Language | undefined {

    return this.languages.find(l => l.code === languageCode)
  }

  public getLevels(): Observable<LevelsPayload> {
    return this.http.get('levels');
  }

  public getLevelById(id: number): Level | undefined {
    return this.levels.find(l => l.id === id)
  }

  public getStepsForLevel(levelId: number): Observable<StepsPayload> {
    return this.http.get(`levels/${levelId}`)
  }

  public getSlideshowsForStep(stepId: number): Observable<Array<Lesson>> {

    return this.http.get(`slideshows/${stepId}`)
      .pipe(
        mergeMap((result: SlideshowsPayload) => {
          const secondRequests: Observable<any>[] = [];

          for (const slide of result.slides) {
            secondRequests.push(this.getLessonById(slide.id));
          }

          return forkJoin(secondRequests);
        })
      )
  }

  public getLessonById(id: number): Observable<Lesson> {
    return this.http.get(`slides/${id}`)
  }
}
