import { PrimaryButton } from "../../../ui/buttons/PrimaryButton";
import { SectionShell } from "../../../ui/layout/SectionShell";
import { VerticalLine } from "../../../ui/layout/VerticalLine";
import { useTranslation } from "../../../i18n";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <SectionShell variant="surface" className="gradient-surface overflow-hidden">
      <div className="relative flex flex-col gap-8 md:gap-12">
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <VerticalLine heightClassName="h-[320px] md:h-[420px]" className="top-8" />
        </div>

        <div className="absolute right-0 top-0 px-4 py-3">
          <span className="micro-label">{t("landing.hero.microLabel")}</span>
        </div>

        <div className="relative flex flex-col items-center text-center md:items-start md:text-left gap-6">
          <div className="flex flex-col gap-4 max-w-3xl">
            <p className="pill-tag self-start bg-ocean-900/80">{t("landing.hero.pill")}</p>
            <h1 className="mb-0">{t("landing.hero.title")}</h1>
            <p className="text-lg text-neutral-d-100 md:text-xl">{t("landing.hero.subtitle")}</p>
          </div>

          <PrimaryButton href="#vision">{t("landing.hero.cta")}</PrimaryButton>
        </div>
      </div>
    </SectionShell>
  );
}
