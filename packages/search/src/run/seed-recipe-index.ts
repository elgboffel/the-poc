import { Database, getAllRecipes } from "@project/database";
import "dotenv/config";
import { RecipeFacet } from "../features/recipes/recipes-index";
import { index } from "../index";

async function main() {
  const { db, dispose } = Database.getInstance();

  const recipes = await getAllRecipes(db);
  const mappedRecipes = recipes.map((x) => ({
    ...x,
    categories: x.recipesToCategories.map((y) => y.category.name),
  }));
  await index.recipe.add(mappedRecipes);

  await index.recipe.setFacets([RecipeFacet.Categories]);

  dispose();
}

main();
