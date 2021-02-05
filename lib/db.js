import api from "@/lib/api";

export async function getAllArticles() {
  const result = await api.get("/articles");
  return result.data;
}

export async function getArticle(id) {
  const result = await api.get(`/articles/${id}`);
  return result.data;
}
