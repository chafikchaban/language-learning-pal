import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./screens/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'language/:languageCode',
    loadComponent: () => import('./screens/levels/levels.page').then(m => m.LevelsPage)
  },
  {
    path: 'level/:languageCode/:id',
    loadComponent: () => import('./screens/steps/steps.page').then( m => m.StepsPage)
  },
];
