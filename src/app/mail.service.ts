import {Injectable} from '@angular/core';


export class User {
  constructor(public name: string,
              public email: string) {
  }
}

export class Mail {
  constructor(public from: User,
              public to: Array<User>,
              public content: string,
              public theme: string,
              public dateTime: string,
              public folder: string,
              public read: boolean
  ) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class MailService {
  mails: Array<Mail> = [];
  checked = new Array<boolean>(this.mails.length);
  filterValue = 0;

  constructor() {
    for (let i = 0; i < 40; i++) {
      this.mails.push(
        new Mail(new User('Sender ' + i.toString(),
            'mail' + i.toString() + '@gmail.com'),
          [],
          i % 2 == 0 && 'Hello, World! <b>Why I got this email?</b>' || '',
          'Hello, Receiver ' + i.toString(),
          '1:01,Tuesday',
          'входящие',
          i > 5));
    }
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
}
