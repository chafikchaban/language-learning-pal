export interface SlideshowsPayload {
  id: number;
  slides: Array<Slideshow>
}

export interface Slideshow {
  id: number;
  order: number;
  template: SlideshowTemplate;
}

export type SlideshowTemplate =
| 'LETTER_PRESENTATION'
| 'IMAGE_TITLE_SENTENCE'
| 'MULTIPLE_CHOICE_TEXT'
