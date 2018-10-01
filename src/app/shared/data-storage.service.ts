import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {stringify} from 'querystring';


@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private  authService: AuthService,
              private httpClient: HttpClient) {
  }

  storeRecipes() {

    const req = new HttpRequest('PUT', 'https://my-super-test-c204f.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
       // this.httpClient.get<Recipe[]>('https://my-super-test-c204f.firebaseio.com/recipes.json?auth=' + token)
       this.httpClient.get<Recipe[]>('https://my-super-test-c204f.firebaseio.com/recipes.json?'
         , {
         observe: 'body',

       })
         .map((recipes) => {
           for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
