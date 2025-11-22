import { Course } from "../types/course";
import { CourseCard } from "./CourseCard";

type CoursesGridProps = {
  courses: Course[];
  readMoreLabel: string;
};

export function CoursesGrid({ courses, readMoreLabel }: CoursesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} readMoreLabel={readMoreLabel} />
      ))}
    </div>
  );
}
