import { create } from 'zustand';

// Helper to generate random ID
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export interface Project {
    id: string;
    name: string;
    url: string;
    localPort?: string;
    devName: string;
    apiKey: string;
    tier: 'free' | 'pro' | 'premium';
    createdAt: string;
    isLocal: boolean;
    feedbackCount: number;
    status: 'active' | 'inactive';
}

interface ProjectStore {
    projects: Project[];
    selectedProject: Project | null;

    // Actions
    addProject: (projectData: Omit<Project, 'id' | 'apiKey' | 'createdAt' | 'feedbackCount' | 'status'>) => Project;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    regenerateApiKey: (id: string) => string;
    setSelectedProject: (project: Project | null) => void;
    getProjectById: (id: string) => Project | undefined;
}

// Helper to generate API key
const generateApiKey = (): string => {
    return `tk_${generateId()}${generateId()}`;
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: [
        {
            id: '1',
            name: 'Example Project',
            url: 'https://example.com',
            devName: 'John Doe',
            apiKey: generateApiKey(),
            tier: 'pro',
            createdAt: new Date().toISOString(),
            isLocal: false,
            feedbackCount: 12,
            status: 'active'
        }
    ],
    selectedProject: null,

    addProject: (projectData) => {
        const newProject: Project = {
            ...projectData,
            id: generateId(),
            apiKey: generateApiKey(),
            createdAt: new Date().toISOString(),
            feedbackCount: 0,
            status: 'active'
        };

        set((state) => ({
            projects: [...state.projects, newProject]
        }));

        return newProject;
    },

    updateProject: (id, updates) => {
        set((state) => ({
            projects: state.projects.map((project) =>
                project.id === id ? { ...project, ...updates } : project
            )
        }));
    },

    deleteProject: (id) => {
        set((state) => ({
            projects: state.projects.filter((project) => project.id !== id),
            selectedProject: state.selectedProject?.id === id ? null : state.selectedProject
        }));
    },

    regenerateApiKey: (id) => {
        const newApiKey = generateApiKey();

        set((state) => ({
            projects: state.projects.map((project) =>
                project.id === id ? { ...project, apiKey: newApiKey } : project
            )
        }));

        return newApiKey;
    },

    setSelectedProject: (project) => {
        set({ selectedProject: project });
    },

    getProjectById: (id) => {
        return get().projects.find((project) => project.id === id);
    }
}));
