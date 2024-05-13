import { Injectable } from '@angular/core';
import { Language, LanguagesPayload } from 'src/app/model/language.model';
import { ImageLesson, Lesson, LetterLesson, MultiChoiceLesson } from 'src/app/model/lesson.model';
import { Level, LevelsPayload } from 'src/app/model/level.model';
import { SlideshowTemplate, SlideshowsPayload } from 'src/app/model/slideshow.model';
import { Step, StepsPayload } from 'src/app/model/step.model';

// mocked languages API data
const FAKE_LANG_DATA: LanguagesPayload = {
  languages: [
    {
      code: "de",
      name: "German"
    },
    {
      code: "en",
      name: "English"
    },
  ],
}

// mocked levels API data
const FAKE_LEVELS_DATA: LevelsPayload = {
  levels: [
    {
      id: 0,
      languageCode: "en",
      title: "A0"
    },
    {
      id: 1,
      languageCode: "en",
      title: "A1"
    },
  ],
}

// mocked steps API data
const FAKE_STEPS_DATA: StepsPayload = {
  id: 0,
  title: "A0",
  steps: [
    {
      id: 0,
      title: "1",
      slideshowId: 1
    },
    {
      id: 1,
      title: "2",
      slideshowId: 3
    },
  ],
}

// mocked slideshows API data
const FAKE_SLIDESHOWS_DATA: SlideshowsPayload = {
  id: 1,
  slides: [
    {
      id: 0,
      order: 1,
      template: "LETTER_PRESENTATION"
    },
    {
      id: 1,
      order: 0,
      template: "IMAGE_TITLE_SENTENCE"
    },
    {
      id: 2,
      order: 2,
      template: "MULTIPLE_CHOICE_TEXT"
    }
  ]
}

// mocked image lesson API data
const FAKE_IMAGE_LESSON_DATA: ImageLesson = {
  id: 0,
  template: "IMAGE_TITLE_SENTENCE",
  text: "potato",
  images: [
    {
      url: "https://p-media-static-language.azureedge.net/images/37452-ynlojhbcbg/previews/screen-6576.jpg"
    }
  ],
  imagesCount: 1,
  audioUrl: "https://p-media-static-language.azureedge.net/audios/1029-tnykarkvtf/file.mp3",
  backgroundColor: "#ffffff",
  isAnimated: false,
  requiresAnswer: false
}

// mocked letter lesson API data
const FAKE_LETTER_LESSON_DATA: LetterLesson = {
  id: 1,
  template: "LETTER_PRESENTATION",
  text: "p",
  isAnimated: true,
  audioUrl: "https://p-media-static-language.azureedge.net/audios/18873-upqyjfhqwj/file.mp3",
  backgroundColor: "#ffffff",
  requiresAnswer: false
}

// mocked multi choice lesson API data
const FAKE_MULTI_CHOICE_LESSON_DATA: MultiChoiceLesson = {
  id: 2,
  template: "MULTIPLE_CHOICE_TEXT",
  textOptions: [
    {
      id: 0,
      expectedSelection: true,
      text: "p"
    },
    {
      id: 1,
      expectedSelection: false,
      text: "a"
    }
  ],
  audioUrl: "https://p-media-static-language.azureedge.net/audios/942490-yvwyjeumgh/file.mp3",
  requiresAnswer: true
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

  public getLevelById(id: number): Level | undefined {
    return this.levels.find(l => l.id === id)
  }

  public getStepsForLevel(_languageCode: string, _levelId: number): Promise<Array<Step>> {
    return Promise.resolve(FAKE_STEPS_DATA.steps)
  }

  public getSlideshowsForStep(_languageCode: string, _stepId: number): Promise<Array<Lesson>> {
    const sortedSlideshows: Array<Lesson> = FAKE_SLIDESHOWS_DATA.slides.sort((a, b) => a.order - b.order)
      .map(el => {
        return this.getLessonById(el.id, el.template)
      }).filter(Boolean)

    return Promise.resolve(sortedSlideshows)
  }

  public getLessonById(_id: number, template: SlideshowTemplate): Lesson {
    switch (template) {
      case 'IMAGE_TITLE_SENTENCE': return FAKE_IMAGE_LESSON_DATA;
      case 'LETTER_PRESENTATION': return FAKE_LETTER_LESSON_DATA;
      default: return FAKE_MULTI_CHOICE_LESSON_DATA;
    }
  }
}
