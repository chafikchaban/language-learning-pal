import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from 'src/app/model/step.model';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonCard, IonCardHeader, IonCardTitle]
})
export class StepsPage {
  public language!: string;
  public level!: string;

  private dataService = inject(DataService);

  public steps: Step[] = []

  constructor(private route: ActivatedRoute) {
    const languageCode = this.route.snapshot.paramMap.get('languageCode') || '';
    const levelId = Number(this.route.snapshot.paramMap.get('id')) || 0;

    this.dataService.getStepsForLevel(languageCode, levelId)
      .then((steps) => {
        this.steps = steps
      })

  }

}
