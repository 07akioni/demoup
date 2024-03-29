import { DemoGroup, Module } from "../domainTypes.js";

function createTitleFromPath(path: string) {
  let fileName = path.split("/").pop() || path;
  fileName = fileName.split(".").shift() || fileName;
  return fileName
    .replace(/[A-Z]/g, " $&")
    .split(" ")
    .filter(Boolean)
    .map((v, index) =>
      v
        ? v[0][index === 0 ? "toUpperCase" : "toLowerCase"]() +
          (v.slice(1) || "")
        : ""
    )
    .join(" ")
    .trim();
}

export function createMenuOptions(
  // Suppose id is always
  config: Array<{ path: string; module: Module }>
): { options: DemoGroup[]; firstPath: string } {
  let firstPath = "";
  const options = config.map(({ path, module }) => {
    return {
      id: path,
      title: createTitleFromPath(path),
      children: Object.keys(module).map((demoId) => {
        const encodedPath = encodeURIComponent(`${path}-${demoId}`);
        if (!firstPath) {
          firstPath = encodedPath;
        }
        return {
          id: demoId,
          title: createTitleFromPath(demoId),
          path: encodedPath,
          Component: module[demoId],
        };
      }),
    };
  });
  return { options, firstPath };
}
