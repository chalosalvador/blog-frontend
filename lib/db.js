import api from "@/lib/api";

export async function getAllArticles() {
  const result = await api.get("/articles");
  return result.data.data;
}

export async function getArticle() {
  const result = await api.get("/articles/1");
  return result.data.data;
}
