import { graphqlClientPublic } from "../../../graphql/client";
import { GET_COURSE_BY_SLUG, GET_COURSES } from "../../../graphql/queries/courses";
import { Course, CourseDto } from "../types/course";

type CoursesQueryResponse = {
  courses: {
    pageInfo: {
      endCursor?: string | null;
      hasNextPage: boolean;
    };
    nodes: CourseDto[];
  } | null;
};

const normalizeLevel = (value?: unknown): Course["level"] => {
  if (typeof value !== "string") {
    return "unspecified";
  }

  const normalized = value.toLowerCase();
  if (normalized === "beginner" || normalized === "intermediate" || normalized === "advanced") {
    return normalized;
  }

  return "unspecified";
};

const mapCourse = (dto: CourseDto): Course => ({
  id: dto.id,
  slug: dto.slug ?? undefined,
  title: dto.title ?? "Untitled course",
  shortDescription: dto.courseFields?.shortDescription?.trim() ?? "",
  price: dto.courseFields?.price ?? undefined,
  durationMinutes: dto.courseFields?.durationMinutes ?? undefined,
  level: normalizeLevel(dto.courseFields?.level),
  isFree: dto.courseFields?.isFree ?? false,
  image: dto.featuredImage?.node?.sourceUrl
    ? {
        url: dto.featuredImage.node.sourceUrl,
        alt: dto.featuredImage.node.altText?.trim() || dto.title || "Course image",
      }
    : undefined,
});

export async function fetchCourses(): Promise<Course[]> {
  const allCourses: Course[] = [];
  let hasNextPage = true;
  let afterCursor: string | undefined;

  while (hasNextPage) {
    const { data, error } = await graphqlClientPublic.query<CoursesQueryResponse>(GET_COURSES, { first: 50, after: afterCursor }).toPromise();

    if (error) {
      throw error;
    }
    if (!data) {
      break;
    }

    const nodes = data.courses?.nodes ?? [];
    const mapped = nodes.filter((node): node is CourseDto => Boolean(node?.id)).map(mapCourse);
    allCourses.push(...mapped);

    hasNextPage = data.courses?.pageInfo?.hasNextPage ?? false;
    afterCursor = data.courses?.pageInfo?.endCursor ?? undefined;
  }

  return allCourses;
}

type CourseBySlugResponse = {
  course: CourseDto | null;
};

export async function fetchCourseBySlug(slug: string): Promise<Course | null> {
  const { data, error } = await graphqlClientPublic.query<CourseBySlugResponse>(GET_COURSE_BY_SLUG, { slug }).toPromise();

  if (error) {
    throw error;
  }

  if (!data?.course) {
    return null;
  }

  return mapCourse(data.course);
}
