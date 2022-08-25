import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) {
    if (!this.swUpdate.isEnabled) {
      console.warn("SwUpdate is not enabled.");
      return;
    }

    console.log("Constructing UpdateService.");

    swUpdate.versionUpdates.subscribe(evt => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });

    const updatesAvailable = swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })));

    updatesAvailable.subscribe(event => {
      console.log(`Event: ${event}`);
      if (window.confirm(`A new update is available. Would you like to load the latest version?`)) {
        this.swUpdate.activateUpdate().then(() => document.location.reload());
      }
    });
  }

  checkForUpdates(): void {
    if (!this.swUpdate.isEnabled)
      return;

    console.log("Checking for updates.");
    this.swUpdate.checkForUpdate().then(() => {
      console.log("Finished checking for updates.");
    });
  }
}
