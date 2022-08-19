import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, interval, map } from 'rxjs';

const UPDATE_INTERAL_HOURS: number = 1;

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) {
    const updatesAvailable = swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })));
      
    updatesAvailable.subscribe(event => {
      if (window.confirm(`A new update is available. Would you like to load the latest version?`)) {
        swUpdate.activateUpdate().then(() => document.location.reload());
      }
    });

    this.checkForUpdatesInterval();
  }
  
  checkForUpdates(): void {
    this.swUpdate.checkForUpdate();
  }
  
  checkForUpdatesInterval(): void {
    this.appRef.isStable.subscribe((isStable: boolean) => {
      if (isStable) {
        const timeInterval = interval(UPDATE_INTERAL_HOURS * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.swUpdate.checkForUpdate();
        });
      }
    });
  }
}