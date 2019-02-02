import { Dish, Restaurant } from '../examples';

export default class GreasySpoon implements Restaurant {
  public special: Dish;
  public constructor(special: Dish) {
    this.special = special;
  }

  public serveOrder(): string {
    return `Handed over ${this.special.serve()}, shining from too much grease!`;
  }
}
