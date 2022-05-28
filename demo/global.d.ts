declare global {
  interface ImportMeta {
    readonly glob: (pattern: string) => Record<
      string,
      () => Promise<{
        config: { title: string };
      }>
    >;
  }
}

export {};
