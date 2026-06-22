import {create} from 'zustand';

export interface UiState {
  tools: string[];
  selectedTool: string;
  selectTool: (selectedTool: string) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  tools: ['hoe', 'pickaxe'],
  selectedTool: 'none',
  selectTool: (selectedTool) => set(() => ({selectedTool})),
}));
