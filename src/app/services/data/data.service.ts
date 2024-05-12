import { Injectable } from '@angular/core';
import { Language, LanguagesPayload } from 'src/app/model/language.model';
import { Level, LevelsPayload } from 'src/app/model/level.model';
import { Step, StepsPayload } from 'src/app/model/step.model';

// mocked languages API data
const FAKE_LANG_DATA: LanguagesPayload = {
  languages: [
    {
      "code": "de",
      "name": "German"
    },
    {
      "code": "en",
      "name": "English"
    },
  ],
}

// mocked levels API data
const FAKE_LEVELS_DATA: LevelsPayload = {
  levels: [
    {
      "id": 0,
      "languageCode": "en",
      "title": "A0"
    },
    {
      "id": 1,
      "languageCode": "en",
      "title": "A1"
    },
  ],
}

// mocked steps API data
const FAKE_STEPS_DATA: StepsPayload = {
  id: 0,
  title: "A0",
  steps: [
    {
      "id": 0,
      "title": "1",
      "slideshowId": 1
    },
    {
      "id": 1,
      "title": "2",
      "slideshowId": 3
    },
  ],
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public languages: Language[] = [];
  public levels: Level[] = [];

  constructor() { }

  public getLanguages(): Promise<void> {
    this.languages = FAKE_LANG_DATA.languages;

    return Promise.resolve()
  }

  public getLanguageById(languageCode: string): Language | undefined {

    return this.languages.find(l => l.code === languageCode)
  }

  public getLevels(): Promise<void> {
    this.levels = FAKE_LEVELS_DATA.levels;

    return Promise.resolve()
  }

  public getStepsForLevel(_languageCode: string, _levelId: number): Promise<Array<Step>> {
    return Promise.resolve(FAKE_STEPS_DATA.steps)
  }
}
