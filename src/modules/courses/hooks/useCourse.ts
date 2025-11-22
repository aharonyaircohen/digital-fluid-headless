import { useEffect, useState } from "react";
import { fetchCourseBySlug } from "../services/coursesService";
import { Course } from "../types/course";

type CourseStatus = "idle" | "loading" | "success" | "error";

export function useCourse(slug?: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [status, setStatus] = useState<CourseStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setCourse(null);
      setStatus("error");
      setError("Missing slug.");
      return;
    }

    const load = async () => {
      setStatus("loading");
      setError(null);

      try {
        const data = await fetchCourseBySlug(slug);
        setCourse(data);
        setStatus("success");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        // eslint-disable-next-line no-console
        console.error("Course fetch failed:", err);
        setError(message);
        setStatus("error");
      }
    };

    void load();
  }, [slug]);

  return { course, status, error };
}
