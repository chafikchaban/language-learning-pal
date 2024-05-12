export interface Language {
  code: string;
  name: string;
}

export interface LanguagesPayload {
  languages: Array<Language>
}
