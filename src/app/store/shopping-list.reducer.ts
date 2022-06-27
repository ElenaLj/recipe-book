import { Ingredient } from "../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 5),

  ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        //pushing on state is not permitted and WRONG in ngrx because state must be IMMUTABLE
        // overwrite old ingredients array
        ingredients: [
          // use spread operator not to lose old ingredients
          ...state.ingredients,
          action.payload
        ]
      }
  }
}
