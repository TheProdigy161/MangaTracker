import { AfterViewInit, Component } from '@angular/core';
import { UpdateService } from 'src/services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'portal';

  constructor(private updateService: UpdateService) {
  }

  ngAfterViewInit(): void {
    this.runUpdatesCheck();
  }

  runUpdatesCheck(): void {
    setTimeout(() => { // check for updates after 5 seconds
      this.updateService.checkForUpdates();
    }, 5000);

    setTimeout(() => {
      this.updateService.checkForUpdates();
      this.runUpdatesCheck();
    }, 60000);
  }
}
