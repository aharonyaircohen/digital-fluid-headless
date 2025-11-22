import { useCallback, useEffect, useState } from "react";
import { fetchCourses } from "../services/coursesService";
import { Course } from "../types/course";

type CoursesStatus = "idle" | "loading" | "success" | "error";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [status, setStatus] = useState<CoursesStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const data = await fetchCourses();
      setCourses(data);
      setStatus("success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      // Log for visibility while keeping UI clean
      // eslint-disable-next-line no-console
      console.error("Courses fetch failed:", err);
      setError(message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const retry = () => {
    void load();
  };

  return { courses, status, error, retry };
}
