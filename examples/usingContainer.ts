import IOCContainer from '../src/index';

import Sauce from './classes/Sauce';
import Sandwich from './classes/Sandwich';
import FancyRestaurant from './classes/FancyRestaurant';
import GreasySpoon from './classes/GreasySpoon';
import Pizza from './classes/Pizza';
import Salad from './classes/Salad';
import { Restaurant } from './examples';

const KEYS = {
  RESTAURANT: 'RESTAURANT',
  DISH: 'DISH',
  INGREDIENT: 'INGREDIENT'
};

const container = new IOCContainer();

container.register(KEYS.RESTAURANT, FancyRestaurant);
container.register(KEYS.DISH, Sandwich);
container.register(KEYS.INGREDIENT, Sauce);

container.bindDependency(KEYS.RESTAURANT, KEYS.DISH, 0);
container.bindDependency(KEYS.DISH, KEYS.INGREDIENT, 0);

console.info((container.resolve(KEYS.RESTAURANT) as Restaurant).serveOrder());
// Served two slices of bread with a smattering of tasty sauce - but in style!

container.register(KEYS.RESTAURANT, GreasySpoon);
container.register(KEYS.DISH, Pizza);
container.register(KEYS.INGREDIENT, Salad);

console.info();
console.info((container.resolve(KEYS.RESTAURANT) as Restaurant).serveOrder());
// Handed over cheesy, doughy goodness covered in heaps of healthy salad, shining from too much grease!

container.register(KEYS.DISH, Sandwich);

console.info();
console.info((container.resolve(KEYS.RESTAURANT) as Restaurant).serveOrder());
// Handed over two slices of bread with heaps of healthy salad, shining from too much grease!
