import "dotenv/config";
import { Database } from "../db-client";
import { addRecipe } from "../features/recipe/add-recipe";

const recipeSeedData = {
  title: "Risotto med kylling",
  description:
    "<p>Her får du opskriften på en nem og klassisk risotto med kylling. Det smager vidunderligt og er dejlig simpelt at lave sådan en lækker ret, som denne.</p><p>Risotto med kylling er så nemt så det sagtens kan serveres til hverdage – og samtidig så ukompliceret delikat at det kan fungere som en glimrende gæstemad. Jeg lader denne opskrift være helt enkel, så den er lækker i al sin enkelhed – men med plads til lidt variation, hvis du har lyst – se inspiration i ’Tip til opskriften’</p>",
  url: "https://www.valdemarsro.dk/risotto-4",
  instructions:
    '<p data-pid="1" class="can-hover">Sauter løg og hvidløg i en gryde med olie, til løgene er klare og bløde. Tilsæt ris og rør det godt igennem ved høj varme i et halvt minut. Kom hvidvin i gryden og kog det ind. Hæld straks derefter grøntsagsbouillon og hønsefond i gryden og skrue ned for varmen til det simrer let. Læg låg på gryden og lad det simre sagte under låg i cirka 30 minutter, eller til risene er lige akkurat møre.</p> <p data-pid="2" class="can-hover">Vend parmesan og frisk timian i risottoen, og smag til med salt og peber.</p><p data-pid="3" class="can-hover">Mens risottoen simrer, så drys kyllingebryst med timian, salt og peber og kom i et ovnfast fad med bagepapir, sammen med&nbsp;cherrytomater skåret i halve. Bag i en forvarmet ovn ved 225 grader i cirka 20-25 minutter, til skindet er sprødt og kyllingen gennemstegt.</p><p data-pid="4" class="can-hover">Skær kyllingebrystet i skiver og server på risotto med tomaterne, revet parmesan og persille.</p>',
};

const categoriesSeedData = [
  { name: "Category 1", key: "category-1" },
  { name: "Category 2", key: "category-2" },
];

const recipeStatsSeedData = [
  { label: "Tid i alt", text: "45 min." },
  { label: "Arbejdstid", text: "30 min." },
  { label: "Antal", text: "4 pers." },
];

const recipeIngredientsSeedData = [
  {
    title: "",
    ingredients: [
      "500 g kyllingebryst med skind",
      "1 tsk timian, tørret",
      "300 g cherrytomater, skåret i halve",
      "flagesalt",
      "sort peber",
    ],
  },
  {
    title: "Risotto",
    ingredients: [
      "1 løg, finthakket",
      "1 fed hvidløg, finthakket",
      "400 g risotto ris",
      "1 dl hvidvin",
      "5 dl grøntsagsbouillon",
      "5 dl kyllingefond",
      "50 g parmesan, friskrevet",
      "2 spsk olivenolie",
      "salt",
      "sort peber, friskkværnet",
    ],
  },
  {
    title: "Til servering",
    ingredients: ["50 g parmesan, friskrevet", "1 drys frisk timian"],
  },
];

const seed = async () => {
  const { db, dispose } = Database.getInstance();

  await addRecipe({
    recipe: recipeSeedData,
    categories: categoriesSeedData,
    ingredients: recipeIngredientsSeedData,
    stats: recipeStatsSeedData,
    db,
  });
  const recipe = await db.query.recipe.findMany({
    with: {
      recipesToCategories: { with: { category: true } },
      ingredient: true,
      stat: true,
    },
  });
  console.log("pruut", JSON.stringify(recipe[recipe.length - 1]));
  await dispose();
  process.exit(0);
};

seed();
