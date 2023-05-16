# demoup

Create a react component demo app in a simple step.

## Usage

```ts
// index.ts
import { createRoot } from "react-dom/client";
import { createReactApp } from "demoup";
import demos from "./*.demo.tsx";

const App = createReactApp([{ name: "Custom Demo Name", module: demos }]);

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
```

```ts
// *.demo.tsx
export const DemoA = () => <div>DemoA</div>;

export const DemoB = () => <div>DemoA</div>;
```
