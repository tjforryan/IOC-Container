import { Dish, Restaurant } from '../examples';

export default class FancyRestaurant implements Restaurant {
  public special: Dish;
  public chefName: string;
  public constructor(chefName: string, special: Dish) {
    this.special = special;
    this.chefName = chefName;
  }

  public serveOrder(): string {
    return `${this.chefName} served ${this.special.serve()} - but in style!`;
  }
}
