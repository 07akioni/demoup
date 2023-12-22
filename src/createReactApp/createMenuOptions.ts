import { DemoGroup, Module } from "../domainTypes";

function createTitleFromPath(path: string) {
  let fileName = path.split("/").pop() || path;
  fileName = fileName.split(".").shift() || fileName;
  return fileName
    .replace(/[A-Z]/g, " $&")
    .split(" ")
    .map(
      (v, index) =>
        v[0][index === 0 ? "toUpperCase" : "toLowerCase"]() + (v.slice(1) || "")
    )
    .join(" ");
}

export function createMenuOptions(
  // Suppose id is always
  config: Array<{ path: string; module: Module }>
): DemoGroup[] {
  return config.map(({ path, module }) => {
    return {
      id: path,
      title: createTitleFromPath(path),
      children: Object.keys(module).map((demoId) => {
        return {
          id: demoId,
          title: createTitleFromPath(demoId),
          path: encodeURIComponent(`${path}-${demoId}`),
          Component: module[demoId],
        };
      }),
    };
  });
}
