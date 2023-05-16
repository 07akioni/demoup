import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default {
  entry: {
    main: "./demo/index.tsx",
  },
  builtins: {
    html: [{ template: "./demo/index.html" }],
  },
  resolve: {
    alias: {
      demoup: path.resolve(__dirname, "./src/index.ts"),
    },
  },
};
