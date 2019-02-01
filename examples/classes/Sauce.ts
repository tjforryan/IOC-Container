import { Ingredient } from '../examples';

export default class Sauce implements Ingredient {
  public apply(): string {
    return `a smattering of tasty sauce`;
  }
}
