import { Component, OnInit } from '@angular/core';
import { UuidGenerator } from 'src/services/uuid-generator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'portal';

  deviceUuid: string = '';
  mangas: string[] = [
    "JJK",
    "OPM",
    "Naruto"
  ]

  constructor() {
    this.deviceUuid = UuidGenerator.getDeviceId();
  }
}
