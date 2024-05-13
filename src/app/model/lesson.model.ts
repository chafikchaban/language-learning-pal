import { SlideshowTemplate } from "./slideshow.model"

export type Lesson =
  | ImageLesson
  | LetterLesson
  | MultiChoiceLesson

export interface ImageLesson {
  id: number;
  template: SlideshowTemplate;
  text: string;
  images: Array<{ url: string }>;
  imagesCount: number;
  audioUrl: string;
  backgroundColor: string;
  isAnimated: false;
  requiresAnswer: false;
}

export interface LetterLesson {
  id: number;
  template: SlideshowTemplate;
  text: string;
  isAnimated: true;
  audioUrl: string;
  backgroundColor: string;
  requiresAnswer: false
}

export interface MultiChoiceLesson {
  id: number;
  template: SlideshowTemplate;
  textOptions: Array<MultiChoiceOption>;
  audioUrl: string;
  requiresAnswer: boolean;
}

export interface MultiChoiceOption {
  id: number;
  expectedSelection: boolean;
  text: string
}
