import {Component, OnInit} from '@angular/core';
import {ClipboardService} from "ngx-clipboard";
import {MailService} from "../mail.service";

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent {
  mailActive = -1;

  constructor(private clipboard: ClipboardService, public mailService: MailService) {
  }

  copyCode(i: number) {
    this.clipboard.copy('Hello, world!');
    const but = document.getElementById('mail-but-' + i.toString())!;
    but.classList.add('copied');
    setTimeout(() => but.classList.remove('copied'), 1000);
  }


}
