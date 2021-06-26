import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadderService {
  @Input() loading = new Subject<boolean>();
  constructor() {}

  showLodder() {
      this.loading.next(true);
  }

  hideLodder() {
      this.loading.next(false);
  }
}
