import { Ingredient } from '../interfaces';

export default class Sauce implements Ingredient {
  public apply(): string {
    return `a smattering of tasty sauce`;
  }
}
