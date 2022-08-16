import { AfterViewInit, Component, OnInit } from '@angular/core';
import Quagga from '@ericblade/quagga2';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      console.log('getUserMedia is not supported');
      return;
    }

    Quagga.init({
        inputStream: {
          constraints: {
            facingMode: 'environment'
          },
          size: 1,
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
          console.log(`QuaggaJS could not be initialized, err: ${err}`);
        } else {
          Quagga.start();
          Quagga.onDetected((res) => {
            // this.onBarcodeScanned(res.codeResult.code);
          });
        }
      });
  }

}
