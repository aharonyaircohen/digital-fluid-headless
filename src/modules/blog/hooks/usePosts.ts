import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postsService";
import { Post } from "../types/post";

type PostsStatus = "idle" | "loading" | "success" | "error";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<PostsStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setStatus("loading");
      setError(null);

      try {
        const result = await fetchPosts();
        if (!isMounted) {
          return;
        }

        setPosts(result);
        setStatus("success");
      } catch (err) {
        if (!isMounted) {
          return;
        }

        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setStatus("error");
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, status, error };
}
