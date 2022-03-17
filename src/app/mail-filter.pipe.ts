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
    const searchValue = this.mailService.searchValue.toLowerCase();
    const searched = value.filter(value => value.from.name.toLowerCase().includes(searchValue) || value.title.toLowerCase().includes(searchValue));
    if (this.mailService.filterValue == 0) {
      return searched;
    } else if (this.mailService.filterValue == 1) {
      return searched.filter(item => item.flags.includes('\\\\Seen'));
    } else {
      return searched;
    }
  }

}
