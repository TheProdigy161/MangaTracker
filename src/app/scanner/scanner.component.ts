import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { BarcodeService } from 'src/services/barcode.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements AfterViewInit {
  supportedFormats = [BarcodeFormat.EAN_13];
  barcodeDetected: boolean = false;

  constructor(private router: Router, private barcodeService: BarcodeService, private snack: MatSnackBar) { }

  ngAfterViewInit(): void {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.snack.open('getUserMedia is not supported');
      return;
    }
  }

  onBarcodeScanned(code: string | null): void {
    if (code) {
      this.barcodeDetected = true;
      this.snack.open(code);
      this.barcodeService.addBarcode(code);
      this.router.navigateByUrl('');
    }
  }
}
