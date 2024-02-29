import React from "react";
import { BuilderComponent as Component } from "@builder.io/react";

export function BuilderComponent({
  model,
  builderJson,
}: {
  model: string;
  builderJson: any;
}) {
  return (
    <Component
      model={model}
      content={builderJson}
      apiKey={"4d47819ecde84dd5b34cc3f215a90a8f"}
    />
  );
}
