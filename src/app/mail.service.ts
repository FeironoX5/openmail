import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";


export class User {
  constructor(public name: string,
              public address: string) {
  }
}

export class Mail {
  constructor(
    public UID: number,
    public UIDValidity: string,
    public bodystructure: any,
    public date: string,
    public flags: Array<string>,
    public folders: Array<string>,
    public from: User,
    public internalDate: string,
    public labels: Array<string>,
    public messageId: string,
    public modSeq: number,
    public path: string,
    public references: any,
    public title: string,
    public to: Array<User>,
    public type: string,
    public xGMThreadId: string,
  ) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class MailService {
  mails: Array<Mail> = [];
  checked = new Array<boolean>(0);
  filterValue = 0;
  searchValue = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadMails("INBOX");
  }

  loadMails(url: string) {
    this.http.post('/api/mailsByFolderURL', {
      email: this.authService.email,
      password: this.authService.password,
      url: url,
    }).toPromise()
      .then((response: any) => {
        if (response) {
          console.log(response.inbox);
          this.mails = response.inbox;
        }
      })
      .catch(error => console.error(error));
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
