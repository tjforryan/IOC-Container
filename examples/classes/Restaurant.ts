import Menu from './Menu';
import Chef from './Chef';

export default class Restaurant {
  public menu: Menu;
  public chef: Chef;
  public constructor(chef: Chef, menu: Menu) {
    this.menu = menu;
    this.chef = chef;
  }

  public cookSpecial(): void {
    console.info(`${this.chef.name} cooked ${this.menu.special.name}`);
  }
}
