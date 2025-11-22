import { Link } from "react-router-dom";
import { GeometricIcon } from "../../../ui/icons/GeometricIcon";
import { useTranslation } from "../../../i18n";
import { Course } from "../types/course";

type CourseCardProps = {
  course: Course;
  readMoreLabel: string;
};

const levelStyles: Record<NonNullable<Course["level"]>, string> = {
  beginner: "bg-aqua-400/15 text-aqua-200 border border-aqua-300/30",
  intermediate: "bg-violet-400/15 text-violet-200 border border-violet-300/30",
  advanced: "bg-gold-400/15 text-gold-200 border border-gold-300/30",
  unspecified: "bg-neutral-d-700/40 text-neutral-d-100 border border-neutral-d-600/60",
};

const formatDuration = (minutes: number | undefined, label: string) => {
  if (!minutes) {
    return null;
  }

  return `${minutes} ${label}`;
};

const formatPriceLabel = (course: Course, freeLabel: string) => {
  if (course.isFree) {
    return freeLabel;
  }

  if (typeof course.price === "number") {
    const formatted = Number.isInteger(course.price) ? course.price.toFixed(0) : course.price.toFixed(2);
    return `₪${formatted}`;
  }

  return null;
};

export function CourseCard({ course, readMoreLabel }: CourseCardProps) {
  const { t } = useTranslation();
  const href = course.slug ? `/courses/${course.slug}` : "#";
  const durationLabel = formatDuration(course.durationMinutes, t("courses.durationUnit"));
  const levelLabel = course.level ? t(`courses.level.${course.level}`) : undefined;
  const freeLabel = t("courses.free");
  const priceLabel = formatPriceLabel(course, freeLabel);

  return (
    <Link
      to={href}
      className="group card-surface relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-d-600/60 p-1 shadow-[0_18px_40px_rgba(0,0,0,0.55)] transition duration-200 hover:-translate-y-1 hover:border-aqua-300/60 hover:shadow-[0_18px_50px_rgba(0,0,0,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
      aria-label={course.title}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ocean-900/80">
        {course.image ? (
          <img
            src={course.image.url}
            alt={course.image.alt}
            className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02] shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[color:var(--ocean-800)] via-[color:var(--ocean-900)] to-[color:var(--aqua-400)]/30 text-aqua-200 shadow-[inset_0_18px_40px_rgba(0,0,0,0.35)]">
            <GeometricIcon shape="triangle" size={42} className="text-aqua-200/80 drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-d-200">
          {durationLabel ? <span>{durationLabel}</span> : null}
          {course.level ? (
            <span className={`rounded-full px-3 py-1 text-[11px] leading-none ${levelStyles[course.level]}`}>
              {levelLabel}
            </span>
          ) : null}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-tight">
            <span
              className="line-clamp"
              style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {course.title}
            </span>
          </h3>
          {course.shortDescription ? (
            <p
              className="text-sm leading-relaxed text-neutral-d-200"
              style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {course.shortDescription}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between text-sm text-neutral-d-100">
          <span className="font-medium text-aqua-200 transition duration-200 group-hover:text-aqua-100">
            {readMoreLabel}
          </span>
          {priceLabel ? (
            <span className="rounded-md bg-ocean-900/60 px-3 py-1 text-neutral-d-100">{priceLabel}</span>
          ) : null}
          {!priceLabel && course.isFree ? (
            <span className="rounded-md bg-aqua-500/20 px-3 py-1 text-aqua-100">{freeLabel}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
