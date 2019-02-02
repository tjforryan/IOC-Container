export interface Ingredient {
  apply(): string;
}

export interface Dish {
  secretIngredient: Ingredient;
  serve(): string;
}

export interface Restaurant {
  special: Dish;
  serveOrder(): string;
}
