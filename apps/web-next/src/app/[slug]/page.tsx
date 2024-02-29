import { Database, getAllRecipes } from "@project/database";
import { Search } from "@/components/search";

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

async function getRecipes(params: any) {
  const { db, dispose } = Database.getInstance();
  const data = await getAllRecipes(db);

  if (!data) {
    dispose();
    throw new Error("Failed to fetch data");
  }

  dispose();

  return data;
}

export const revalidate = 3600;

export default async function Page({ params }: any) {
  const data = await getRecipes(params);

  return (
    <>
      {data.length}
      <Search />
      {/*{data.map((item) => (*/}
      {/*  <Box key={item.id}>*/}
      {/*    <Text>{item.id}</Text>*/}
      {/*    <Title>{item.title}</Title>c<Text>{item.description}</Text>*/}
      {/*    <a href={item.url!} target="_blank">*/}
      {/*      {item.url}*/}
      {/*    </a>*/}
      {/*    <Text>{item.recipesToCategories[0]?.category.key}</Text>*/}
      {/*    <h6>Stats</h6>*/}
      {/*    <Text>{JSON.stringify(item.stat)}</Text>*/}
      {/*    <h6>Ingredients</h6>*/}
      {/*    <Text>{JSON.stringify(item.ingredient)}</Text>*/}
      {/*  </Box>*/}
      {/*))}*/}
    </>
  );
}
