import Meal from './classes/Meal';
import Menu from './classes/Menu';
import Chef from './classes/Chef';
import Restaurant from './classes/Restaurant';

const myRestaurant = new Restaurant(
  new Chef('Derek'),
  new Menu(new Meal('Fish and Chips', 'Battered Cod', 'Triple Cooked Chips'))
);

myRestaurant.cookSpecial();
