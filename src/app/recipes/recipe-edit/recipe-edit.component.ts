import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // fetch datas subscribing from root
    this.route.params.subscribe((params: Params) => {
      this.id = +(params['id']); // needs parsing as it retrieves a string!

      // does this component have an id? if TRUE than edit, if FALSE  than new
      this.editMode = params['id'] != null;
      console.log(this.editMode);
    });
  }
}
