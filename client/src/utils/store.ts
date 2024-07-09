import { ProjectType } from "../types/Project";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  projects: ProjectType[];
  setProjects: (projects: ProjectType[]) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        projects: [],
        setProjects: (projects) => set(() => ({ projects })),
      }),
      { name: "appStore" }
    )
  )
);
