import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { Level } from 'src/app/model/level.model';
import { Language } from 'src/app/model/language.model';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
  standalone: true,
  imports: [RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonCard, IonCardHeader, IonCardTitle]
})
export class LevelsPage {
  private dataService = inject(DataService);

  public language?: Language;
  public levels: Level[] = []

  constructor(private route: ActivatedRoute) {
    const languageCode = this.route.snapshot.paramMap.get('languageCode') || '';

    this.language = this.dataService.getLanguageById(languageCode)
    this.dataService.getLevels()
      .then(() => {
        this.levels = this.dataService.levels
      })
  }

}
