import { Ingredient } from '../interfaces';

export default class Salad implements Ingredient {
  public apply(): string {
    return `heaps of healthy salad`;
  }
}
