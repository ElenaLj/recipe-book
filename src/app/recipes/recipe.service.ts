// this service manages recipes
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";
@Injectable()

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Guacamole',
      'Guacamole is an avocado-based dip, spread, or salad first developed in Mexico. In addition to its use in modern Mexican cuisine, it has become part of international and American cuisine as a dip, condiment and salad ingredient.',
      'https://www.tribugolosa.com/cache/slideshow/43/f8/86/b8/a4-10.jpg/2cb6823c975ee09b0d93e071c71c86d5.jpg',
      [
        new Ingredient('Avocado', 3),
        new Ingredient('Onion', 1),
        new Ingredient('Cherry tomatoes', 200),
        new Ingredient('Lime', 100),

      ]
    ),
    new Recipe(
      'Gnocchi cacio e pepe',
      'Enjoy a comforting bowl of gnocchi with parmesan and black pepper. It\'s simple but utterly delicious, and the best part is, it only takes seven minutes to make',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-cacio-e-pepe-a1392fd.jpg',
      [
        new Ingredient('Gnocchi', 250),
        new Ingredient('Caciocavallo cheese', 100),
        new Ingredient('Pepper', 10),
        new Ingredient('Butter', 125)
      ]

    ),
    new Recipe(
      'Thai Rice Noodle Salad',
      'Just made it up 5 minutes ago and it\'s really good. It can be served warm or cold; toss again right before serving. Do not overcook the noodles.',
      'https://itsnotcomplicatedrecipes.com/wp-content/uploads/2020/09/Thai-Vermicelli-Noodle-Salad-1.jpg',
      [
        new Ingredient('Rice noodles', 250),
        new Ingredient('Carrots', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Zucchini', 2),
        new Ingredient('Bell pepper', 1),
        new Ingredient('Soy sauce', 25),
      ]
    )
  ];

  constructor(private slService: ShoppingListService) { }

  // this function returns the this array copied so to get access from outside
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
