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
    setTimeout(() => { // check for updates after 5 seconds
      this.updateService.checkForUpdates();
    }, 5000);
  }
}
