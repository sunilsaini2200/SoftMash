import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadderService } from 'src/app/services/loader/loadder.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
   @Input() loading: Subject<boolean> = this.lodder.loading;
  constructor(private lodder: LoadderService) { }

}
