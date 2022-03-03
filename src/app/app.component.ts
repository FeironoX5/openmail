import {Component, ViewChild} from '@angular/core';
import {ClipboardService} from "ngx-clipboard";
import {MatMenuTrigger} from "@angular/material/menu";
import {MailService} from "./mail.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PulseService} from "./pulse.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public mailService: MailService, public router: Router, public dialog: MatDialog) {
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
    });
    setTimeout(() => {
      this.displayNotification();
    }, 1000)
  }

  displayNotification() {
  }

  openHelpDialog() {
    const dialogRef = this.dialog.open(HelpDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'help-dialog',
  templateUrl: 'dialogs/help-dialog.html',
})
export class HelpDialog {
  right = this.pulseService.right;
  left = this.pulseService.left;

  constructor(public pulseService: PulseService) {
  }

  saveData() {
    if (this.right != this.left) {
      this.pulseService.right = this.right;
      this.pulseService.left = this.left;
    }
  }
}
