import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    // fetch datas subscribing from root
    this.route.params.subscribe((params: Params) => {
      this.id = +(params['id']); // needs parsing as it retrieves a string!

      // does this component have an id? if TRUE than edit, if FALSE  than new
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              "name": new FormControl(ingredient.name),
              "amount": new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName),
      "imagePath": new FormControl(recipeImagePath),
      "description": new FormControl(recipeDescription),
      "ingredients": new FormControl(recipeIngredients)
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
