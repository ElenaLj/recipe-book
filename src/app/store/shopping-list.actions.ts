import { Action } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  // type is the identifier of the action
  readonly type = ADD_INGREDIENT
  payload: Ingredient
}
