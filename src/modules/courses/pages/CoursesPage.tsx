import { useTranslation } from "../../../i18n";
import { BackgroundLoader } from "../../../ui/common/BackgroundLoader";
import { CoursesGrid } from "../components/CoursesGrid";
import { useCourses } from "../hooks/useCourses";

export function CoursesPage() {
  const { courses, status, error, retry } = useCourses();
  const { t } = useTranslation();
  const readMoreLabel = t("courses.list.readMore");

  const showSkeletons = status === "loading";
  const showEmpty = status === "success" && courses.length === 0;
  const showError = status === "error";

  return (
    <section className="space-y-8 py-8">
      <div className="space-y-3">
        <p className="micro-label">{t("courses.list.microLabel")}</p>
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-neutral-d-50">{t("courses.list.title")}</h1>
            <p className="text-neutral-d-200">{t("courses.list.subtitle")}</p>
          </div>
          <p className="text-sm text-neutral-d-300">{t("courses.list.helper")}</p>
        </div>
      </div>

      {showError ? (
        <div className="rounded-xl border border-gold-300/30 bg-ocean-900/70 p-4 text-neutral-d-100">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="font-medium text-gold-200">{t("courses.list.error")}</p>
              <p className="text-sm text-neutral-d-200">{error}</p>
            </div>
            <button
              type="button"
              onClick={retry}
              className="self-start rounded-lg bg-aqua-400 px-4 py-2 text-sm font-semibold text-ocean-900 transition hover:bg-aqua-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-200"
            >
              {t("courses.list.retry")}
            </button>
          </div>
        </div>
      ) : null}

      {showSkeletons ? <BackgroundLoader label={t("courses.list.loading")} /> : null}

      {showEmpty ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-d-800 bg-ocean-900/70 p-8 text-center text-neutral-d-100">
          <p className="text-lg font-semibold">{t("courses.list.emptyTitle")}</p>
          <p className="text-neutral-d-200">{t("courses.list.emptyDescription")}</p>
        </div>
      ) : null}

      {status === "success" && courses.length > 0 ? (
        <CoursesGrid courses={courses} readMoreLabel={readMoreLabel} />
      ) : null}
    </section>
  );
}
