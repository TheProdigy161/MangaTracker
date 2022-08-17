import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [],
  exports: [
    MatListModule,
    MatSnackBarModule,
    MatButtonModule
  ]
})
export class MaterialUiModule { }
