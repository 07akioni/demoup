import React from 'react'
import { createRoot } from "react-dom/client";
import { createReactApp } from "demoup";
import * as aDemo from "./a.demo";
import * as bDemo from "./b.demo";

const App = createReactApp([
  {
    name: "A Demo",
    module: aDemo,
  },
  {
    name: "B Demo",
    module: bDemo,
  },
]);
const root = createRoot(document.getElementById("app")!);
root.render(<App />)
