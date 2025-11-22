import { CodeSnippet } from "../../../ui/code/CodeSnippet";
import { PrimaryButton } from "../../../ui/buttons/PrimaryButton";
import { SectionShell } from "../../../ui/layout/SectionShell";
import { TranslucentCard } from "../../../ui/cards/TranslucentCard";
import { useTranslation } from "../../../i18n";

const featureSnippet = (
  <span>
    type Project = &#123; id: string; title: string; status: <span className="text-gold-300">"planned"</span> |
    <span className="text-gold-300"> "active"</span>; &#125;
  </span>
);

export function FeaturePreviewSection() {
  const { t } = useTranslation();

  return (
    <SectionShell
      id="feature-preview"
      variant="surface"
      className="bg-ocean-900/80 bg-gradient-to-br from-ocean-900/90 via-ocean-800/85 to-ocean-700/75"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <TranslucentCard className="min-h-[220px] animate-fade-in-up bg-gradient-to-br from-ocean-800/80 via-ocean-800/60 to-ocean-700/60 p-6">
          <div className="flex h-full w-full items-center justify-center rounded-card border border-dashed border-gold-300/20 bg-ocean-900/40 text-neutral-d-300">
            Minimal interface placeholder
          </div>
        </TranslucentCard>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h2 className="mb-1">{t("landing.feature.title")}</h2>
            <p className="text-neutral-d-200">{t("landing.feature.description")}</p>
          </div>

          <CodeSnippet>{featureSnippet}</CodeSnippet>

          <div>
            <PrimaryButton href="https://github.com/yac/tdr-fed/tree/main/docs">{t("landing.feature.cta")}</PrimaryButton>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
