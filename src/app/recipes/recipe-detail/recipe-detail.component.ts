import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})

export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // first method - it works fine just the first time it runs
    // const id = this.route.snapshot.params['id'];

    //to keeping track of changes use subscription
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +(params['id']); // casting needed because what returns is a string
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppinglist() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
  }
}
