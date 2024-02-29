import { MeiliSearch } from "meilisearch";

export const client = new MeiliSearch({
  // host: "http://159.223.225.191:7700/",
  host: "127.0.0.1:7700",
  apiKey: "MASTER_KEY",
});
