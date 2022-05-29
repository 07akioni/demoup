# demoup

Create react component demo app with vite in a simple step.

## Usage

```ts
// index.ts
import { createRoot } from "react-dom/client";
import { createReactApp } from "demoup";

// `import.meta.glob` is a vite-only feature. For glob pattern, any suffix is
// okay but we recommend using `demo.tsx`.
const modules = import.meta.glob("./**/*.demo.tsx");

createReactApp(modules).then((app) => {
  const root = createRoot(document.getElementById("app")!);
  root.render(app);
});
```

```ts
// *.demo.tsx
export const config = {
  title: "Demo",
};

export const DemoA = () => <div>DemoA</div>;

export const DemoB = () => <div>DemoA</div>;
```
