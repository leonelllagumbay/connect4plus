import { Connect4plusPage } from './app.po';

describe('connect4plus App', () => {
  let page: Connect4plusPage;

  beforeEach(() => {
    page = new Connect4plusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
