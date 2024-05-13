export interface Level {
  id: number;
  languageCode: string;
  title: string;
}

export interface LevelsPayload {
  levels: Array<Level>
}
