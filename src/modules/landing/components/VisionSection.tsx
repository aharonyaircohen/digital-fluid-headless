import { GeometricIcon } from "../../../ui/icons/GeometricIcon";
import { SectionShell } from "../../../ui/layout/SectionShell";
import { TranslucentCard } from "../../../ui/cards/TranslucentCard";
import { useTranslation } from "../../../i18n";

const bullets = [
  {
    titleKey: "landing.vision.bullet.react",
    shape: "triangle" as const,
  },
  {
    titleKey: "landing.vision.bullet.docs",
    shape: "circle" as const,
  },
  {
    titleKey: "landing.vision.bullet.oss",
    shape: "square" as const,
  },
];

export function VisionSection() {
  const { t } = useTranslation();

  return (
    <SectionShell id="vision" variant="surface" className="gradient-surface">
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="space-y-3">
          <h2 className="mb-0">{t("landing.vision.title")}</h2>
          <p className="text-neutral-d-200 md:text-lg">{t("landing.vision.description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {bullets.map((bullet, index) => (
            <TranslucentCard
              key={bullet.titleKey}
              className="flex items-center gap-4 p-5 md:p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/20 bg-ocean-800/60">
                <GeometricIcon shape={bullet.shape} className="text-gold-400" size={22} />
              </div>
              <p className="m-0 flex items-center gap-2 text-neutral-d-50 font-medium leading-snug">
                <span className="h-2 w-2 rounded-full bg-gold-400/40" aria-hidden="true" />
                {t(bullet.titleKey)}
              </p>
            </TranslucentCard>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
