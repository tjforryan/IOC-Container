class Meal {
  name: string;
  main: string;
  side: string;
  constructor(name: string, main: string, side: string) {
    this.name = name;
    this.main = main;
    this.side = side;
  }
}

class Menu {
  special: Meal
  constructor(special: Meal) {
    this.special = special;
  }
}

class Chef {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Restaurant {
  menu: Menu;
  chef: Chef;
  constructor(chef: Chef, menu: Menu) {
    this.menu = menu;
    this.chef = chef;
  }

  cookSpecial() {
    console.info(`${this.chef.name} cooked ${this.menu.special.name}`);
  }
}

const myRestaurant = new Restaurant(
  new Chef('Derek'),
  new Menu(new Meal('Fish and Chips', 'Battered Cod', 'Triple Cooked Chips'))
);

myRestaurant.cookSpecial();
