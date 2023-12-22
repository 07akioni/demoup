import { ComponentType } from "react";

export type Module = Record<string, ComponentType>;

export type DemoGroup = {
  /**
   * The id of the group
   */
  id: string;
  /**
   * Displyed title of the group
   */
  title: string
  children: Array<{
    /**
     * The id of the demo
     */
    id: string;
    /**
     * Displayed title of the demo
     */
    title: string
    /**
     * Browser path of the demo
     */
    path: string;
    /**
     * Demo component
     */
    Component: any;
  }>;
};
