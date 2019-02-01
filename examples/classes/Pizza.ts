import { Dish, Ingredient } from '../examples';

export default class Pizza implements Dish {
  public secretIngredient: Ingredient;
  public constructor(secretIngredient: Ingredient) {
    this.secretIngredient = secretIngredient;
  }

  public serve(): string {
    return `cheesy, doughy goodness covered in ${this.secretIngredient.apply()}`;
  }
}
