import api from "@/lib/api";

export async function getAllArticles() {
  const result = await api.get("/articles");
  return result.data.data;
}
