import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipesChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }
}
