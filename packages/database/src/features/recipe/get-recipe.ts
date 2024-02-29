import { eq } from "drizzle-orm";
import { IDatabase } from "../../db-client";
import { recipe, RecipeWithRelations } from "../../schema";

export const getAllRecipes = async (db: IDatabase): Promise<RecipeWithRelations[]> => {
  return await db.query.recipe.findMany({
    with: {
      recipesToCategories: { with: { category: true } },
      ingredient: true,
      stat: true,
    },
  });
};

export const getRecipeById = async (id: number, db: IDatabase) =>
  await db.query.recipe.findFirst({
    where: eq(recipe.id, id),
    with: {
      recipesToCategories: { with: { category: true } },
      ingredient: true,
      stat: true,
    },
  });

export const getRecipeByUrl = async (url: string, db: IDatabase) =>
  await db.query.recipe.findFirst({
    where: eq(recipe.url, url),
    with: {
      recipesToCategories: { with: { category: true } },
      ingredient: true,
      stat: true,
    },
  });
