import {Component, OnInit} from '@angular/core';
import {MailService} from "../mail.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PulseService} from "../pulse.service";

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.component.html',
  styleUrls: ['./pulse.component.css']
})
export class PulseComponent {
  animationInProgress = false;
  x = this.mailService.mails.length - 1;

  constructor(public pulseService: PulseService, public mailService: MailService, private _snackBar: MatSnackBar) {
    window.addEventListener('keydown', ev => {
      if (!this.animationInProgress) {
        const c = ev.keyCode;
        // CTRL + Z
        if (ev.ctrlKey && c == 90 && this.x < this.mailService.mails.length - 1) {
          this.back();
        }
        // ARROWS
        //  right
        if (c == 39 && this.x >= 0) {
          const centerCard = document.getElementById('f' + (this.x).toString())!;
          const bottomCard = document.getElementById('f' + (this.x - 1).toString())!;
          const bottomHideCard = document.getElementById('f' + (this.x - 2).toString())!;
          const rightButton = document.getElementById('right-button')!.style;
          this.animationInProgress = true;
          rightButton.background = '#2979F1';
          centerCard.style.transform = 'translateX(70vw) translateY(80vh) rotate(30deg) scale(0.9)';
          centerCard.style.opacity = '0';
          if (this.x > 0) {
            this.cardToCenter(bottomCard);
          }
          if (this.x > 1) {
            this.cardToBottom(bottomHideCard);
          }
          setTimeout(() => {
            rightButton.background = '';
            this.animationInProgress = false;
            this.x--;
          }, 400);
        }
        //  left
        if (c == 37) {
          const centerCard = document.getElementById('f' + (this.x).toString())!;
          const bottomCard = document.getElementById('f' + (this.x - 1).toString())!;
          const bottomHideCard = document.getElementById('f' + (this.x - 2).toString())!;
          const leftButton = document.getElementById('right-button')!.style;
          this.animationInProgress = true;
          leftButton.background = '#2979F1';
          centerCard.style.transform = 'translateX(-70vw) translateY(80vh) rotate(-30deg) scale(0.9)';
          centerCard.style.opacity = '0';
          if (this.x > 0) {
            this.cardToCenter(bottomCard);
          }
          if (this.x > 1) {
            this.cardToBottom(bottomHideCard);
          }
          setTimeout(() => {
            leftButton.background = '';
            this.animationInProgress = false;
            this.x--;
          }, 400);
        }
        //  top
        if (c == 38 && this.x > 0) {
          const centerCard = document.getElementById('f' + (this.x).toString())!;
          const bottomCard = document.getElementById('f' + (this.x - 1).toString())!;
          const bottomHideCard = document.getElementById('f' + (this.x - 2).toString())!;
          this.animationInProgress = true;
          this.cardToTopHide(centerCard);
          this.cardToCenter(bottomCard);
          if (this.x > 1) {
            this.cardToBottom(bottomHideCard);
          }
          setTimeout(() => {
            this.animationInProgress = false;
            this.x--;
          }, 400);
        }
        //  bottom
        if (c == 40 && this.x < this.mailService.mails.length - 1) {
          if (this.x < 0) {
            this.x = 0;
          }
          const centerCard = document.getElementById('f' + (this.x).toString())!;
          const topCard = document.getElementById('f' + (this.x + 1).toString())!;
          const bottomCard = document.getElementById('f' + (this.x - 1).toString())!;
          this.animationInProgress = true;
          this.cardToBottom(centerCard);
          this.cardToCenter(topCard);
          if (this.x > 0) {
            this.cardToBottomHide(bottomCard);
          }
          setTimeout(() => {
            this.animationInProgress = false;
            this.x++;
          }, 400);
        }
      }
    })
  }

  cardToTopHide(nowCard: HTMLElement) {
    nowCard.style.transform = 'translateY(-100vh)';
  }

  cardToCenter(nowCard: HTMLElement) {
    nowCard.style.opacity = '1';
    nowCard.style.transform = '';
  }

  cardToBottom(nowCard: HTMLElement) {
    nowCard.style.transform = 'translateY(calc(100vh - 80px - 45px + 20px))';
  }

  cardToBottomHide(nowCard: HTMLElement) {
    nowCard.style.transform = 'translateY(100vh)';
  }

  moveRight() {
  }

  moveLeft() {
    const el = document.getElementById('f' + this.x.toString())!.style;
    const leftButton = document.getElementById('left-button')!.style;
    this.animationInProgress = true;
    el.transform = 'translateX(-70vw) translateY(80vh) rotate(-30deg) scale(0.9)';
    el.opacity = '0';
    leftButton.background = '#2979F1';
    setTimeout(() => {
      leftButton.background = '';
      this.animationInProgress = false;
      this.x--;
    }, 400);
  }

  back() {
    const el = document.getElementById('f' + (this.x + 1).toString())!.style;
    this.animationInProgress = true;
    el.transform = '';
    el.opacity = '1';
    setTimeout(() => {
      this.animationInProgress = false;
      this.x++;
      this._snackBar.open('Отменено', 'ОК', {duration: 1500})
    }, 400);
  }
}
