import { IDatabase } from "../../db-client";
import {
  Category,
  category as categoriesSchema,
  recipe as recipeSchema,
  recipesToCategories,
  InsertRecipe,
  InsertCategory,
  InsertStat,
  InsertIngredient,
  stat,
  ingredient,
} from "../../schema";

export type AddRecipe = {
  recipe: InsertRecipe;
  categories?: InsertCategory[];
  stats?: InsertStat[];
  ingredients?: InsertIngredient[];
};

export type AddRecipeProps = AddRecipe & {
  db: IDatabase;
};

export const addRecipe = async ({
  recipe,
  stats,
  categories,
  ingredients,
  db,
}: AddRecipeProps) => {
  const categoriesInserted: Category[] = [];

  await db.transaction(async () => {
    const [recipeId] = await db
      .insert(recipeSchema)
      .values(recipe)
      .onConflictDoUpdate({
        target: recipeSchema.url,
        set: recipe,
      })
      .returning({ id: recipeSchema.id });

    if (categories && categories.length > 0) {
      for (const { name, key } of categories) {
        const [categoryInserted] = await db
          .insert(categoriesSchema)
          .values({ name, key })
          .onConflictDoUpdate({
            target: categoriesSchema.key,
            set: { name, key },
          })
          .returning();

        categoriesInserted.push(categoryInserted);
      }

      const recipeToCategoryRelations = categoriesInserted.map<{
        categoryId: number;
        recipeId: number;
      }>(({ id }) => ({
        recipeId: recipeId.id,
        categoryId: id,
      }));

      await db
        .insert(recipesToCategories)
        .values(recipeToCategoryRelations)
        .onConflictDoNothing();
    }

    if (stats && stats.length > 0) {
      const mappedStats = stats.map((item) => ({
        label: item.label,
        text: item.text,
        recipeId: recipeId.id,
      }));

      await db.insert(stat).values(mappedStats).onConflictDoNothing();
    }

    if (ingredients && ingredients.length > 0) {
      const mappedIngredients = ingredients.map((item) => ({
        title: item.title,
        collection: item.collection,
        recipeId: recipeId.id,
      }));

      await db.insert(ingredient).values(mappedIngredients).onConflictDoNothing();
    }
  });
};
