import { Link, useParams } from "react-router-dom";
import { useLocale, useTranslation } from "../../../i18n";
import { BackgroundLoader } from "../../../ui/common/BackgroundLoader";
import { useCourse } from "../hooks/useCourse";
import "./CourseDetailPage.css";

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { direction } = useLocale();
  const { course, status, error } = useCourse(slug);
  const backIcon = direction === "rtl" ? "→" : "←";

  const showError = status === "error";
  const showLoading = status === "loading";
  const showEmpty = status === "success" && !course;

  return (
    <section className="py-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex justify-start">
          <Link to="/courses" className="course-back-link">
            <span aria-hidden="true">{backIcon}</span> {t("courses.detail.back")}
          </Link>
        </div>

        <div className="course-hero relative overflow-hidden rounded-2xl border p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[var(--surface-glow-1),var(--surface-glow-2)]" />
          <div className="relative space-y-3">
            <p className="micro-label">{t("courses.detail.microLabel")}</p>
            <h1 className="text-3xl font-semibold">{course?.title ?? t("courses.detail.titleFallback")}</h1>
            <div className="course-hero-meta flex flex-wrap items-center gap-3 text-sm">
              {course?.durationMinutes ? <span>{course.durationMinutes} {t("courses.durationUnit")}</span> : null}
              {course?.level ? (
                <span className="course-level-chip rounded-full px-3 py-1 text-xs uppercase tracking-wide">
                  {t(`courses.level.${course.level}`)}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {showLoading ? <BackgroundLoader label={t("courses.detail.loading")} /> : null}

        {showError ? (
          <div className="course-message course-message--error">
            <p className="course-message__title">{t("courses.detail.error")}</p>
            <p className="course-message__body">{error}</p>
          </div>
        ) : null}

        {showEmpty ? (
          <div className="course-message">
            <p className="course-message__title">{t("courses.detail.empty")}</p>
            <Link to="/courses" className="course-back-link mt-3 inline-block">
              {t("courses.detail.back")}
            </Link>
          </div>
        ) : null}

        {status === "success" && course ? (
          <article className="card-surface relative rounded-2xl border p-6 shadow-[0_18px_40px_rgba(0,0,0,0.25)] course-card">
            <div className="relative z-10 space-y-4">
              {course.image ? (
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img src={course.image.url} alt={course.image.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ) : null}
              <div className="space-y-2">
                <p className="text-sm text-[color:var(--theme-text-secondary)]">{course.shortDescription}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {course.isFree ? (
                    <span className="rounded-md bg-aqua-400/20 px-3 py-1 text-aqua-100">{t("courses.free")}</span>
                  ) : null}
                  {!course.isFree && typeof course.price === "number" ? (
                    <span className="course-price-chip rounded-md px-3 py-1">₪{course.price}</span>
                  ) : null}
                </div>
                <div className="flex justify-start">
                  <Link to="/courses" className="course-back-link">
                    <span aria-hidden="true">{backIcon}</span> {t("courses.detail.back")}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
