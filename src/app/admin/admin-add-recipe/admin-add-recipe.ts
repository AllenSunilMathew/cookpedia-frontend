import { Component, inject } from '@angular/core';
import { Apiservices } from '../../services/apiservices';
import { log } from 'console';
import { strict } from 'assert';

@Component({
  selector: 'app-admin-add-recipe',
  standalone: false,
  templateUrl: './admin-add-recipe.html',
  styleUrl: './admin-add-recipe.css',
})
export class AdminAddRecipe {


api=inject(Apiservices)
  recipeDeatils: RecipeModel = {}
  ingredientsArray: any = []
  instructionsArray: any = []
  mealArray: any = []
  selectMealTypeArray:any=[]

ngOnInit(){
  this.getAllRecipes()
}



getAllRecipes(){
  this.api.getallrecipesAPI().subscribe((res:any)=>{
    const dummyMeal=res.map((item:any)=>item.mealType)
    console.log(dummyMeal.flat(Infinity));
    dummyMeal.flat(Infinity).forEach((item:any)=>{
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

removeIngredient(value:string){
  this.ingredientsArray=this.ingredientsArray.filter((item:string)=>item!=value)
}


chooseMeal(mealCheckEvent:any){
if (mealCheckEvent.target.checked) {
  !this.selectMealTypeArray.includes(mealCheckEvent.target.name) && this.selectMealTypeArray.push(mealCheckEvent.target.name)
} else {
  this.selectMealTypeArray=this.selectMealTypeArray.filter(( item:string))
}
}
}