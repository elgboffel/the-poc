import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  date,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";

export enum DbTables {
  Recipe = "recipe",
  User = "user",
  Category = "category",
  Stat = "stat",
  Ingredient = "ingredient",
  RecipeToCategories = "recipeToCategories",
}

/* Recipes */
export type Recipe = InferSelectModel<typeof recipe>;
export type InsertRecipe = InferInsertModel<typeof recipe>;
export type RecipeWithRelations = Recipe & {
  recipesToCategories: Array<{
    category: Category;
  }>;
  stat: Stat[];
  ingredient: Ingredient[];
};
export const recipe = pgTable(DbTables.Recipe, {
  id: serial("id").primaryKey(),
  createdAt: date("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  title: text("title"),
  description: text("description"),
  instructions: text("instructions"),
  url: text("url").unique(),
  originDomain: text("origin_domain"),
  image: text("image"),
});

export const recipeRelations = relations(recipe, ({ many }) => ({
  stat: many(stat),
  ingredient: many(ingredient),
  recipesToCategories: many(recipesToCategories),
}));

/* Recipe Stats */
export type Stat = InferSelectModel<typeof stat>;
export type InsertStat = InferInsertModel<typeof stat>;

export const stat = pgTable(DbTables.Stat, {
  id: serial("id").primaryKey(),
  label: text("label"),
  text: text("text"),
  recipeId: integer("recipe_id").references(() => recipe.id),
});

export const statRelations = relations(stat, ({ one }) => ({
  recipe: one(recipe, {
    fields: [stat.recipeId],
    references: [recipe.id],
  }),
}));

/* Ingredient Group */
export type Ingredient = InferSelectModel<typeof ingredient>;
export type InsertIngredient = InferInsertModel<typeof ingredient>;

export const ingredient = pgTable(DbTables.Ingredient, {
  id: serial("id").primaryKey(),
  title: text("title"),
  collection: text("ingredients").array(),
  recipeId: integer("recipe_id").references(() => recipe.id),
});

export const ingredientRelations = relations(ingredient, ({ one }) => ({
  recipe: one(recipe, {
    fields: [ingredient.recipeId],
    references: [recipe.id],
  }),
}));

/* Categories */
export type Category = InferSelectModel<typeof category>;
export type InsertCategory = InferInsertModel<typeof category>;

export const category = pgTable(DbTables.Category, {
  id: serial("id").primaryKey(),
  key: text("key").unique(),
  name: text("name"),
});

export const categoryRelations = relations(category, ({ many }) => ({
  recipesToCategories: many(recipesToCategories),
}));

export const recipesToCategories = pgTable(
  DbTables.RecipeToCategories,
  {
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipe.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => category.id),
  },
  (t) => ({
    pk: primaryKey({
      name: "recipesToCategories",
      columns: [t.recipeId, t.categoryId],
    }),
  })
);

export const recipesToCategoriesRelations = relations(recipesToCategories, ({ one }) => ({
  recipe: one(recipe, {
    fields: [recipesToCategories.recipeId],
    references: [recipe.id],
  }),
  category: one(category, {
    fields: [recipesToCategories.categoryId],
    references: [category.id],
  }),
}));

/* User */
export type User = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;

export const user = pgTable(DbTables.User, {
  id: serial("id").primaryKey(),
  createdAt: date("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
});
