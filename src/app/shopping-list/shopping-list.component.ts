import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  //   new Ingredient('Gnocchi', 250),
  //   new Ingredient('Noodles', 500)
  // ]
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}
