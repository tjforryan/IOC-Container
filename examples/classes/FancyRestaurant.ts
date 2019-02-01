import { Dish, Restaurant } from '../examples';

export default class FancyRestaurant implements Restaurant {
  public special: Dish;
  public constructor(special: Dish) {
    this.special = special;
  }

  public serveOrder(): void {
    console.info(`Served ${this.special.serve()} - but in style!`);
  }
}
