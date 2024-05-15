import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonBackButton, IonButtons, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { ProgressBarComponent } from 'src/app/components/progress-bar/progress-bar.component';
import { User } from 'src/app/model/user.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonImg,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    ProgressBarComponent
  ]
})
export class ProfilePage {
  private dataService = inject(DataService);

  public user?: User;
  public friends?: Array<User>;

  constructor() {
    this.dataService.getCurrentuser().subscribe(data => {
      this.user = data
    });
    this.dataService.getFriendsList().subscribe(data => {
      this.friends = data
    });
  }

}
