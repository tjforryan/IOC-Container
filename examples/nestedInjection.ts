import Sauce from './classes/Sauce';
import Sandwich from './classes/Sandwich';
import FancyRestaurant from './classes/FancyRestaurant';
import GreasySpoon from './classes/GreasySpoon';
import Pizza from './classes/Pizza';
import Salad from './classes/Salad';

console.info(new FancyRestaurant(new Sandwich(new Sauce())).serveOrder());

console.info();

console.info(new GreasySpoon(new Pizza(new Salad())).serveOrder());

console.info();

console.info(new GreasySpoon(new Sandwich(new Salad())).serveOrder());
