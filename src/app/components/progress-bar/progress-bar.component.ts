import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  standalone: true,
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  @Input() progress: number = 0;

  constructor() { }

  ngOnInit() {
    document.documentElement.style.setProperty('--progress-width', this.progress + '%');
  }

}
