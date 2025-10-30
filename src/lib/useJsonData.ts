import { create } from "zustand";

interface JsonDataState {
  jsonData: string;
  setJsonData: (data: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const useJsonData = create<JsonDataState>((set) => ({
  jsonData: "",
  setJsonData: (data: string) => set({ jsonData: data }),
  isGenerating: false,
  setIsGenerating: (generating: boolean) => set({ isGenerating: generating }),
}));

export default useJsonData;