import { Component } from "@angular/core";
import { Recipe } from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})

export class RecipesComponent {

  selectedRecipe: Recipe;

  storeValue(event: Recipe){
    this.selectedRecipe = event;
  }

}
