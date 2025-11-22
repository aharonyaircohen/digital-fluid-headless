import { useTranslation } from "../../../i18n";
import { SectionShell } from "../../../ui/layout/SectionShell";

export function FooterMinimal() {
  const { t } = useTranslation();

  return (
    <SectionShell
      id="footer"
      variant="plain"
      className="flex flex-col gap-3 border border-neutral-d-700/60 bg-ocean-900/85 text-sm text-neutral-d-200"
      style={{ borderTopColor: "rgba(242, 201, 139, 0.2)" }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <a href="https://github.com/yac/tdr-fed" className="text-neutral-d-100 hover:text-aqua-200">
            {t("landing.footer.github")}
          </a>
          <a
            href="https://github.com/yac/tdr-fed/tree/main/docs"
            className="text-neutral-d-100 hover:text-aqua-200"
          >
            {t("landing.footer.docs")}
          </a>
        </div>
        <span className="text-gold-300/80">{t("landing.footer.version", { version: "0.1-alpha" })}</span>
      </div>
    </SectionShell>
  );
}
