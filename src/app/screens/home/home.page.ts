import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { Language } from 'src/app/model/language.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonCardHeader, IonCardTitle],
})
export class HomePage {
  private dataService = inject(DataService);

  public languages: Language[] = []

  constructor() {
    this.dataService.getLanguages()
      .then(() => {
        this.languages = this.dataService.languages
      })
  }
}