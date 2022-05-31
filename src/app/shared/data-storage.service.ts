import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  // this method saves recipes before fetching them
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://recipe-http-e2a57-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => {
        console.log(response)
      });
  }
}
