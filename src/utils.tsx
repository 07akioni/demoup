export interface PageConfig {
  title: string;
}

export interface DemoConfig {
  title: string;
  component: any;
}

export function defineConfig(config: PageConfig): PageConfig {
  return config;
}

export function defineDemo(config: DemoConfig): DemoConfig {
  return config;
}
