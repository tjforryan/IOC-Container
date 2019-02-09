import Sauce from './classes/Sauce';
import Sandwich from './classes/Sandwich';
import FancyRestaurant from './classes/FancyRestaurant';
import GreasySpoon from './classes/GreasySpoon';
import Pizza from './classes/Pizza';
import Salad from './classes/Salad';

console.info(
  new FancyRestaurant('Pierre', new Sandwich(new Sauce())).serveOrder()
);
// Pierre served two slices of bread with a smattering of tasty sauce - but in style!

console.info();
console.info(new GreasySpoon('Joe', new Pizza(new Salad())).serveOrder());
// Joe handed over cheesy, doughy goodness covered in heaps of healthy salad, shining from too much grease!

console.info();
console.info(new GreasySpoon('Greg', new Sandwich(new Salad())).serveOrder());
// Greg handed over two slices of bread with heaps of healthy salad, shining from too much grease!
