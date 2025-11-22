import { useEffect, useState } from "react";
import { fetchPostBySlug } from "../services/postDetailsService";
import { PostDetails } from "../types/post";

type PostStatus = "idle" | "loading" | "success" | "error";

export function usePost(slug?: string) {
  const [post, setPost] = useState<PostDetails | null>(null);
  const [status, setStatus] = useState<PostStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      setStatus("error");
      setError("Missing slug.");
      return;
    }

    const load = async () => {
      setStatus("loading");
      setError(null);

      try {
        const result = await fetchPostBySlug(slug);
        if (!result) {
          setPost(null);
          setStatus("success");
          return;
        }

        setPost(result);
        setStatus("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        // eslint-disable-next-line no-console
        console.error("Post fetch failed:", err);
        setError(message);
        setStatus("error");
      }
    };

    void load();
  }, [slug]);

  return { post, status, error };
}
