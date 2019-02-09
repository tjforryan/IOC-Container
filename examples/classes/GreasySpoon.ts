import { Dish, Restaurant } from '../examples';

export default class GreasySpoon implements Restaurant {
  public special: Dish;
  public chefName: string;
  public constructor(chefName: string, special: Dish) {
    this.special = special;
    this.chefName = chefName;
  }

  public serveOrder(): string {
    return `${
      this.chefName
    } handed over ${this.special.serve()}, shining from too much grease!`;
  }
}
