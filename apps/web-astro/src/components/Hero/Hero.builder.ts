//  This is a minimal example of a custom component, you can view more complex input types here:
//  https://www.builder.io/c/docs/custom-react-components#input-types
import { Builder } from "@builder.io/react";
import type { Input } from "@builder.io/sdk";
import { Hero } from "@components/Hero/Hero";

const heroSchema: Input[] = [
  { name: "heading", type: "string", defaultValue: "Add heading" },
  { name: "text", type: "string", defaultValue: "Add text" },
];

Builder.registerComponent(Hero, {
  name: "Hero",
  models: ["page"],
  override: true,
  inputs: heroSchema,
});
