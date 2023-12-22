# demoup

Create a react component demo app in a simple step.

## Usage

Use rspack to serve current app.

```ts
import { createRoot } from 'react-dom/client'
import { createReactNodeForRspack } from 'demoup'

createRoot(document.getElementById('root')!).render(
  // @ts-ignore
  createReactNodeForRspack(require.context('.', true, /^*\.preview\.tsx$/, 'sync'))
)
```
