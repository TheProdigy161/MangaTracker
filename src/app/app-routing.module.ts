import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScannerComponent } from './scanner/scanner.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'scanner', component: ScannerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
