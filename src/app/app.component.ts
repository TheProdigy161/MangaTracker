import { Component } from '@angular/core';
import { UuidGenerator } from 'src/services/uuid-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portal';

  deviceUuid: string = '';

  constructor() {
    this.deviceUuid = UuidGenerator.getDeviceId();
  }
}
