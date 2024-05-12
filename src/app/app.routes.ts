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
    title: 'levels',
    path: 'language/:languageCode',
    loadComponent: () => import('./screens/levels/levels.page').then(m => m.LevelsPage)
  },
  {
    title: 'steps',
    path: 'level/:languageCode/:id',
    loadComponent: () => import('./screens/steps/steps.page').then( m => m.StepsPage)
  },
  {
    title: 'slideshows',
    path: 'step/:languageCode/:levelId/:id',
    loadComponent: () => import('./screens/slideshows/slideshows.page').then( m => m.SlideshowsPage)
  },
];
