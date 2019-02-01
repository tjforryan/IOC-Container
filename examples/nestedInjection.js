class Meal {
  constructor(name, main, side) {
    this.name = name;
    this.main = main;
    this.side = side;
  }
}

class Menu {
  constructor(special) {
    this.special = special;
  }
}

class Chef {
  constructor(name) {
    this.name = name;
  }
}

class Restaurant {
  constructor(chef, menu) {
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
