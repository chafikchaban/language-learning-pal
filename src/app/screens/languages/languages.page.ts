import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonButton } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { Language } from 'src/app/model/language.model';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonButton,
    BackButtonComponent
  ],
})
export class LanguagesPage {

  private dataService = inject(DataService);

  public selectedLanguage?: string;

  public languages: Language[] = []

  constructor() {
    this.dataService.getLanguages().subscribe(data => {
      this.languages = data.languages
    });
  }

  public select = (languageCode: string): void => {
    this.selectedLanguage = languageCode
  }
}
