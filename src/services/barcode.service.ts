import { AfterViewInit, EventEmitter, Injectable } from "@angular/core";

const BARCODES_STORAGE = "MANGA_TRACKER_BARCODES";

@Injectable({
    providedIn: 'root'
})
export class BarcodeService {
    private static _barcodes: string[] = [
        "Test1",
        "Test2",
        "Test3",
        "Test4",
        "Test5"
    ];
    barcodes: EventEmitter<string[]> = new EventEmitter<string[]>();

    setupBarcodes(): void {  
        this.getLocalStorageBarcodes();
    }

    addBarcode(code: string): boolean {
        // Check if code is already in list. If not then add to list and emit the new list.
        if (!BarcodeService._barcodes.find(barcode => barcode === code)) {

            BarcodeService._barcodes.push(code);   
            this.barcodes.emit(BarcodeService._barcodes);

            this.setLocalStorageBarcodes(BarcodeService._barcodes);

            return true;
        }

        return false;
    }

    clearBarcodes(): void {
        BarcodeService._barcodes = [];
        this.barcodes.emit(BarcodeService._barcodes);
        this.setLocalStorageBarcodes(BarcodeService._barcodes);
    }

    private getLocalStorageBarcodes(): void {
        const storedBarcodesRaw: string | null = localStorage.getItem(BARCODES_STORAGE);

        if (storedBarcodesRaw) {
            const storedBarcodes: string[] = JSON.parse(storedBarcodesRaw);
            BarcodeService._barcodes = storedBarcodes;
        }

        this.barcodes.emit(BarcodeService._barcodes);
    }

    private setLocalStorageBarcodes(codes: string[]): void {
        localStorage.setItem(BARCODES_STORAGE, JSON.stringify(codes));
    }
}