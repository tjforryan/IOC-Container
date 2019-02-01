import { Dish, Ingredient } from '../interfaces';

export default class Sandwich implements Dish {
  public secretIngredient: Ingredient;
  public constructor(secretIngredient: Ingredient) {
    this.secretIngredient = secretIngredient;
  }

  public serve(): string {
    return `two slices of bread with ${this.secretIngredient.apply()}`;
  }
}
