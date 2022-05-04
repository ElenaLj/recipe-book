import { Ingredient } from '../shared/ingredient.model';
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Gnocchi', 250),
    new Ingredient('Noodles', 500)
  ];

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  //since we cannot access the same array we need this function to copy the same array
  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}