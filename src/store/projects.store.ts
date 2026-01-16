// store/projects.ts
import { create } from "zustand";
import { Project } from "@/lib/types";

interface ProjectState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  deleteProject: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
}

export const useProjectsStore = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  deleteProject: (id) =>
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),
  updateProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    })),
}));
