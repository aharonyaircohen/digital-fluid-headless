export type CourseImage = {
  url: string;
  alt: string;
};

export type Course = {
  id: string;
  slug?: string;
  title: string;
  shortDescription: string;
  price?: number;
  durationMinutes?: number;
  level?: "beginner" | "intermediate" | "advanced" | "unspecified";
  isFree: boolean;
  image?: CourseImage;
};

export type CourseDto = {
  id: string;
  slug?: string | null;
  title?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  courseFields?: {
    shortDescription?: string | null;
    price?: number | null;
    durationMinutes?: number | null;
    level?: string | null;
    isFree?: boolean | null;
  } | null;
};
