import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Step } from 'src/app/model/step.model';
import { Language } from 'src/app/model/language.model';
import { Level } from 'src/app/model/level.model';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
  standalone: true,
  imports: [RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonButton,
    BackButtonComponent
  ]
})
export class StepsPage {
  private dataService = inject(DataService);

  public selectedStep: number = -1;

  public language?: Language;
  public level?: Level;
  public steps: Step[] = []

  constructor(private route: ActivatedRoute) {
    const languageCode = this.route.snapshot.paramMap.get('languageCode') || '';
    const levelId = Number(this.route.snapshot.paramMap.get('id')) || 0;

    this.language = this.dataService.getLanguageById(languageCode)
    this.level = this.dataService.getLevelById(levelId)

    this.dataService.getStepsForLevel(levelId).subscribe(data => {
      this.steps = data.steps
    });
  }

  public select = (id: number): void => {
    this.selectedStep = id;
  }

}
