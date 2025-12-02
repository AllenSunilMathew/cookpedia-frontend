import { Component, inject, Input, input } from '@angular/core';
import { Apiservices } from '../../services/apiservices';
import { log } from 'console';
import { strict } from 'assert';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-add-recipe',
  standalone: false,
  templateUrl: './admin-add-recipe.html',
  styleUrl: './admin-add-recipe.css',
})
export class AdminAddRecipe {

  route = inject(ActivatedRoute)
  recipeId: string = ""
  // @Input() id!:string
  api = inject(Apiservices)
  recipeDeatils: RecipeModel = {}
  ingredientsArray: any = []
  instructionsArray: any = []
  mealArray: any = []
  selectMealTypeArray: any = []

  router = inject(Router)
isSidebarOpen: any;


  constructor() {
    this.route.params.subscribe((res: any) => {
      console.log(res);
      this.recipeId = res.id

    })
  }
  ngOnInit() {
    this.getAllRecipes()
  }



  getAllRecipes() {
    this.api.getallrecipesAPI().subscribe((res: any) => {
      if (this.recipeId) {
        this.recipeDeatils = res.find((item: any) => item._id == this.recipeId)
        this.instructionsArray = this.recipeDeatils.instructions
        this.ingredientsArray = this.recipeDeatils.ingredients
        this.selectMealTypeArray = this.recipeDeatils.mealType

      }



      const dummyMeal = res.map((item: any) => item.mealType)
      console.log(dummyMeal.flat(Infinity));
      dummyMeal.flat(Infinity).forEach((item: any) => {
        !this.mealArray.includes(item) && this.mealArray.push(item)
      })
      console.log(this.mealArray);

    })
  }


  addIngredients(ingredientsInput: any) {
    if (ingredientsInput.value) {
      this.ingredientsArray.push(ingredientsInput.value)
    }
  }

  removeIngredient(value: string) {
    this.ingredientsArray = this.ingredientsArray.filter((item: string) => item != value)
  }


  chooseMeal(mealCheckEvent: any) {
    if (mealCheckEvent.target.checked) {
      !this.selectMealTypeArray.includes(mealCheckEvent.target.name) && this.selectMealTypeArray.push(mealCheckEvent.target.name)
    } else {
      this.selectMealTypeArray = this.selectMealTypeArray.filter((item: string) => item != mealCheckEvent.target.name)
    }
  }
 addRecipe() {
    this.recipeDeatils.ingredients = this.ingredientsArray
    this.recipeDeatils.instructions = this.instructionsArray
    this.recipeDeatils.mealType = this.selectMealTypeArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, image, mealType, cuisine, caloriesPerServing } = this.recipeDeatils
    if (name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && image && mealType && cuisine && caloriesPerServing) {
      this.api.addRecipeApi(this.recipeDeatils).subscribe({
        next: (res: any) => {
          alert("New Recipe Added Successfully!!!")
          this.recipeDeatils = {}
          this.instructionsArray = []
          this.ingredientsArray = []
          this.selectMealTypeArray = []
          this.router.navigateByUrl('/admin/recipe-list')
        }
      })
    } else {

      alert("plz fill the form completlely")
    }
  }






  updateRecipe() {
    this.recipeDeatils.ingredients = this.ingredientsArray
    this.recipeDeatils.instructions = this.instructionsArray
    this.recipeDeatils.mealType = this.selectMealTypeArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, image, mealType, cuisine, caloriesPerServing } 
    = this.recipeDeatils
    if (name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && image && mealType && cuisine && caloriesPerServing) {
      this.api.editRecipeApi(this.recipeId,this.recipeDeatils).subscribe({
        next: (res: any) => {
          alert(" Recipe updated Successfully!!!")
          this.recipeDeatils = {}
          this.instructionsArray = []
          this.ingredientsArray = []
          this.selectMealTypeArray = []
          this.router.navigateByUrl('/admin/recipe-list')
        }
      })
    } else {

      alert("plz fill the form completlely")
    }
  }

  removeMealType(meal:string){
      this.selectMealTypeArray = this.selectMealTypeArray.filter((item: string) => item != meal)
  }
}


