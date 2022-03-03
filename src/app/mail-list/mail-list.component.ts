import {Component, OnInit} from '@angular/core';
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent {
  mails = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  checked = new Array<boolean>(this.mails.length);
  filterValue = 0;

  constructor(private clipboard: ClipboardService) {
  }

  selectAll() {
    for (let i = 0; i < this.mails.length; i++) {
      this.checked[i] = true;
    }
  }

  deselectAll() {
    for (let i = 0; i < this.mails.length; i++) {
      this.checked[i] = false;
    }
  }

  copyCode(i: number) {
    this.clipboard.copy('Hello, world!');
    const but = document.getElementById('mail-but-' + i.toString())!;
    but.classList.add('copied');
    setTimeout(() => but.classList.remove('copied'), 1000);

  }


}
