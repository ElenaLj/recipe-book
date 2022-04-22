import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'Guacamole',
      'Guacamole is an avocado-based dip, spread, or salad first developed in Mexico. In addition to its use in modern Mexican cuisine, it has become part of international and American cuisine as a dip, condiment and salad ingredient.',
      'https://www.tribugolosa.com/cache/slideshow/43/f8/86/b8/a4-10.jpg/2cb6823c975ee09b0d93e071c71c86d5.jpg'
      )
  ];
}
