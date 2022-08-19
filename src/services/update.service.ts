import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate) {
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
  }
  checkForUpdates() {
    this.swUpdate.checkForUpdate();
  }
}