import React from "react";
import { defineConfig, defineDemo } from "demoup";

export const config = defineConfig({
  title: "B",
});

export function demoB() {
  return <div>demoB</div>;
}

export const tryIt = defineDemo({
  title: "随便试试",
  component: () => {
    return <div>随便试试</div>;
  },
});
