import {Pipe, PipeTransform} from '@angular/core';
import {Mail, MailService} from "./mail.service";

@Pipe({
  name: 'mailFilter',
  pure: false
})
export class MailFilterPipe implements PipeTransform {
  constructor(public mailService: MailService) {
  }

  transform(value: Array<Mail>) {
    console.log(this.mailService.filterValue);
    if (this.mailService.filterValue == 0) {
      return value;
    } else if (this.mailService.filterValue == 1) {
      return value.filter(item => !item.read);
    } else {
      return value;
    }
  }

}
