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
  INGREDIENT: 'INGREDIENT',
  CHEF_NAME: 'CHEF_NAME'
};

const container = new IOCContainer();

container.registerClass(KEYS.RESTAURANT, FancyRestaurant);
container.registerClass(KEYS.DISH, Sandwich);
container.registerClass(KEYS.INGREDIENT, Sauce);

container.registerVar(KEYS.CHEF_NAME, 'Pierre');

container.bindDependency(KEYS.RESTAURANT, KEYS.CHEF_NAME, 0);
container.bindDependency(KEYS.RESTAURANT, KEYS.DISH, 1);
container.bindDependency(KEYS.DISH, KEYS.INGREDIENT, 0);

console.info((container.resolve(KEYS.RESTAURANT) as Restaurant).serveOrder());
// Pierre served two slices of bread with a smattering of tasty sauce - but in style!

container.registerClass(KEYS.RESTAURANT, GreasySpoon);
container.registerClass(KEYS.DISH, Pizza);
container.registerClass(KEYS.INGREDIENT, Salad);

container.registerVar(KEYS.CHEF_NAME, 'Joe');

console.info();
console.info((container.resolve(KEYS.RESTAURANT) as Restaurant).serveOrder());
// Joe handed over cheesy, doughy goodness covered in heaps of healthy salad, shining from too much grease!

container.registerClass(KEYS.DISH, Sandwich);

container.registerVar(KEYS.CHEF_NAME, 'Greg');

console.info();
console.info((container.resolve(KEYS.RESTAURANT) as Restaurant).serveOrder());
// Greg handed over two slices of bread with heaps of healthy salad, shining from too much grease!
