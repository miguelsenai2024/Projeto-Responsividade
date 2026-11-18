import { defineStore } from "pinia";
export interface Lesson {
  slug: string;
  intro: string;
  points: string[];
  code: string;
  language: string;
  question: string;
  answer: string;
  sources: [string, string][];
}
export const useGuide = defineStore("guide", {
  state: () => ({
    lessons: [] as Lesson[],
    error: "",
    loading: false,
    solved: false,
  }),
  actions: {
    async load() {
      if (this.lessons.length || this.loading) return;
      this.loading = true;
      this.error = "";
      try {
        const response = await fetch(
          import.meta.env.BASE_URL + "api/licoes.json",
        );
        if (!response.ok) throw new Error();
        this.lessons = await response.json();
      } catch {
        this.error = "Falha ao carregar as lições.";
      } finally {
        this.loading = false;
      }
    },
  },
});
