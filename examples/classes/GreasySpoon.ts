import { Dish, Restaurant } from '../interfaces';

export default class GreasySpoon implements Restaurant {
  public special: Dish;
  public constructor(special: Dish) {
    this.special = special;
  }

  public serveOrder(): void {
    console.info(
      `Handed over ${this.special.serve()}, covered in far too much grease!`
    );
  }
}
