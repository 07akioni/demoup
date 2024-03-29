import React from "react";
import { Module } from "./domainTypes.js";
import { createReactApp } from "./createReactApp/index.js";

function createReactNode(config: Array<{ path: string; module: Module }>) {
  const App = createReactApp(config);
  return <App />;
}

/**
 * Accept a require.context return value and return a React node.
 *
 * Example:
 *
 * ```ts
 * createRoot(document.getElementById('root')!).render(
 *   createReactNodeForRspack(require.context('.', true, /^*\.preview\.tsx$/, 'sync'))
 * )
 * ```
 */
export function createReactNodeForRspack(requireContextReturn: any) {
  return createReactNode(
    (requireContextReturn.keys() as string[]).map<{
      path: string;
      module: Module;
    }>((key: string) => {
      return {
        path: key,
        module: requireContextReturn(key),
      };
    })
  );
}
