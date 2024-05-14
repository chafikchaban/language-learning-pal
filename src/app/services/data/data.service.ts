import { Injectable, inject } from '@angular/core';
import { Observable, delay, forkJoin, from, mergeMap, of, switchMap, tap } from 'rxjs';
import { Language, LanguagesPayload } from 'src/app/model/language.model';
import { Lesson } from 'src/app/model/lesson.model';
import { Level, LevelsPayload } from 'src/app/model/level.model';
import { SlideshowsPayload } from 'src/app/model/slideshow.model';
import { StepsPayload } from 'src/app/model/step.model';
import { HttpService } from '../http/http.service';
import { CachingService } from '../caching/caching.service';
import { FileSystemService } from '../file-system/file-system.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpService);
  private cache = inject(CachingService);

  public languages: Language[] = [];
  public levels: Level[] = [];

  constructor(private fileSystem: FileSystemService) { }

  public getLanguages(): Observable<LanguagesPayload> {
    return this.getData('languages')
  }

  public getLanguageById(languageCode: string): Language | undefined {

    return this.languages.find(l => l.code === languageCode)
  }

  public getLevels(): Observable<LevelsPayload> {
    return this.getData('levels');
  }

  public getLevelById(id: number): Level | undefined {
    return this.levels.find(l => l.id === id)
  }

  public getStepsForLevel(levelId: number): Observable<StepsPayload> {
    return this.getData(`levels/${levelId}`)
  }

  public getSlideshowsForStep(stepId: number): Observable<Array<Lesson>> {

    return this.getData(`slideshows/${stepId}`)
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
    const url: string = `slides/${id}`;

    return this.getData(url).pipe(
      tap(async res => {

        if (res.localAudioFileName) {
          return;
        }

        await this.fileSystem.downloadFile(res.audioUrl)
          .then((localFileName) => {
            if (localFileName) {
              const updatedObject = {
                ...res,
                localAudioFileName: localFileName
              }
              this.cache.removeRequestCache(url)
                .then(() => {
                  this.cache.cacheRequest(url, updatedObject);
                })
            }
          })
      })
    )
  }

  private getData(url: string): Observable<any> {
    const storedValue = from(this.cache.getCachedRequest(url));
    return storedValue.pipe(
      switchMap(result => {
        if (!result) {
          return this.callAndCache(url);
        } else {
          return of(result)
        }
      })
    )
  }

  private callAndCache(url: string): Observable<any> {
    return this.http.get(url).pipe(
      tap(res => {
        this.cache.cacheRequest(url, res)
      })
    )
  }
}
