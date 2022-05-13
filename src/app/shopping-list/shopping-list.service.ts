import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Gnocchi', 250),
    new Ingredient('Noodles', 500)
  ];

  // new event emitter to inform our component that new data is available
  ingredientsChanged = new Subject<Ingredient[]>();

  // this subject allows me to edit single ingredients using their ID
  startedEditing = new Subject<number>()
  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  constructor() {}

  //since we cannot access the same array we need this function to copy the same array
  getIngredients(){
    return this.ingredients.slice();
  }

  // this method simply returns the selected ingredient
  getIngredient(index: number){
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

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
