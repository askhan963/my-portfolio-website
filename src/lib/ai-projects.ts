import type { Project } from "@/hooks/useProjects";

const AI_KEYWORDS = [
  "artificial intelligence",
  "machine learning",
  "tensorflow",
  "computer vision",
  "langchain",
  "langgraph",
  "retrieval-augmented generation",
  "llm",
  "large language models",
  "weaviate",
  "ollama",
];

export function isAppliedAIProject(project: Pick<Project, "category" | "techStack">) {
  const haystack = [project.category, ...project.techStack].join(" ").toLowerCase();
  return AI_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

export function filterAppliedAIProjects<T extends Pick<Project, "category" | "techStack">>(
  projects: T[]
): T[] {
  return projects.filter(isAppliedAIProject);
}
