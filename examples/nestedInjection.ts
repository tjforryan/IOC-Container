import Sauce from './classes/Sauce';
import Sandwich from './classes/Sandwich';
import FancyRestaurant from './classes/FancyRestaurant';
import GreasySpoon from './classes/GreasySpoon';
import Pizza from './classes/Pizza';
import Salad from './classes/Salad';

console.info(new FancyRestaurant(new Sandwich(new Sauce())).serveOrder());
// Served two slices of bread with a smattering of tasty sauce - but in style!

console.info();
console.info(new GreasySpoon(new Pizza(new Salad())).serveOrder());
// Handed over cheesy, doughy goodness covered in heaps of healthy salad, shining from too much grease!

console.info();
console.info(new GreasySpoon(new Sandwich(new Salad())).serveOrder());
// Handed over two slices of bread with heaps of healthy salad, shining from too much grease!
