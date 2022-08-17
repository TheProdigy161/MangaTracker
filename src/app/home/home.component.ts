import { Component, OnInit } from '@angular/core';
import { BarcodeService } from 'src/services/barcode.service';
import { UuidGenerator } from 'src/services/uuid-generator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'portal';

  deviceUuid: string = '';
  mangas: string[] = [];

  constructor(public barcodeService: BarcodeService) {
    this.deviceUuid = UuidGenerator.getDeviceId();

    this.barcodeService.barcodes.subscribe(barcodes => {
      this.mangas = barcodes;
    });

    this.barcodeService.setupBarcodes();
  }
}
