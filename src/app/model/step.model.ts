export interface Step {
  id: number;
  title: string;
  slideshowId: number;
}

export interface StepsPayload {
  id: number;
  title: string;
  steps: Array<Step>
}
