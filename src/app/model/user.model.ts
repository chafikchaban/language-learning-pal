export interface User {
  id: number;
  name: string;
  image: string;
  weeklyProgress: number;
  languages: Array<UserLanguage>;
}

export interface UserLanguage {
  name: string;
  progress: number;
}
