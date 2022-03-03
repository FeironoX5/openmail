import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PulseService {
  right = 0;
  left = 1;

  constructor() {
  }
}
