import { MailFilterPipe } from './mail-filter.pipe';

describe('MailFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new MailFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
