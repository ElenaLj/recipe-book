import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 250),
    new Ingredient('Tomatoes', 500)
  ];

  // new event emitter to inform our component that new data is available
  ingredientsChanged = new Subject<Ingredient[]>();

  // this subject allows me to edit single ingredients using their ID
  startedEditing = new Subject<number>()
  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  //since we cannot access the same array we need this function to copy the same array
  getIngredients() {
    return this.ingredients.slice();
  }

  // this method simply returns the selected ingredient
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
