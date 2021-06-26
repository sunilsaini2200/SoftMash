
import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [TableComponent],
  exports:[TableComponent,MatProgressSpinnerModule],
  imports: [ CommonModule,MatProgressSpinnerModule ]
})
export class SharedModule { }
