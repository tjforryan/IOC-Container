export default class Meal {
  public name: string;
  public main: string;
  public side: string;
  public constructor(name: string, main: string, side: string) {
    this.name = name;
    this.main = main;
    this.side = side;
  }
}
