# demoup

Create a react component demo app in a simple step.

## Usage

Use rspack to serve current app.

```ts
import { createReactNodeForRspack } from "demoup";

// index.ts
createRoot(
  createReactNodeForRspack(
    require.context(".", true, /^*\.preview\.tsx$/, "sync")
  )
).render(document.getElementById("root"));
```
