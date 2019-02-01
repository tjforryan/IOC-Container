import Meal from './Meal';

export default class Menu {
  public special: Meal;
  public constructor(special: Meal) {
    this.special = special;
  }
}
