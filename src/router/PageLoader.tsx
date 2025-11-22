import { useTranslation } from "../i18n";

export function PageLoader() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p className="text-neutral-d-100">{t("ui.loading.page")}</p>
    </div>
  );
}
