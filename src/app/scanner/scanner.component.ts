import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Quagga from '@ericblade/quagga2';
import { BarcodeService } from 'src/services/barcode.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements AfterViewInit, OnDestroy {
  barcodeDetected: boolean = false;

  constructor(private router: Router, private barcodeService: BarcodeService, private snack: MatSnackBar) { }

  ngAfterViewInit(): void {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.snack.open('getUserMedia is not supported');
      return;
    }

    Quagga.init({
        inputStream: {
          constraints: {
            facingMode: 'environment'
          },
          area: { // defines rectangle of the detection/localization area
            top: '0%',    // top offset
            right: '0%',  // right offset
            left: '0%',   // left offset
            bottom: '0%'  // bottom offset
          },
        },
        decoder: {
          readers: ['ean_reader']
        },
      },
      (err) => {
        if (err) {
          this.snack.open(`QuaggaJS could not be initialized, err: ${err}`);
        } else {
          Quagga.start();
          Quagga.onDetected((res) => {
            if (!this.barcodeDetected)
              this.onBarcodeScanned(res.codeResult.code);
          });
        }
      });
  }

  ngOnDestroy(): void {
    Quagga.stop();
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
