import { createRoot } from "react-dom/client";
import { createReactApp } from "demoup";

const modules = import.meta.glob("./**/*.demo.tsx");

createReactApp(modules).then((app) => {
  const root = createRoot(document.getElementById("app")!);
  root.render(app);
});
