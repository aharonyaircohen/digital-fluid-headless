import { Link } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useTranslation } from "../../../i18n";

export function AccountPage() {
  const { t } = useTranslation();
  const { viewer, status } = useAuth();

  const isUnauthed = status === "unauthenticated" || !viewer;

  if (isUnauthed) {
    return (
      <section className="py-6">
        <div className="rounded-2xl border border-neutral-d-700/60 bg-ocean-900/70 p-6 text-neutral-d-100">
          <p className="text-lg font-semibold">{t("auth.account.protected")}</p>
          <Link to="/login" className="mt-3 inline-flex items-center gap-2 text-aqua-200 hover:text-aqua-100">
            {t("auth.account.goToLogin")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-d-700/60 bg-gradient-to-br from-[color:var(--ocean-900)] via-[color:var(--ocean-800)]/85 to-[color:var(--ocean-700)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
          <div className="pointer-events-none absolute inset-0 bg-[var(--surface-glow-1),var(--surface-glow-2)]" />
          <div className="relative space-y-2">
            <p className="micro-label">{t("auth.account.microLabel")}</p>
            <h1 className="text-3xl font-semibold text-gold-300">{t("auth.account.title")}</h1>
            <p className="text-neutral-d-200">{t("auth.account.subtitle")}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-d-700/60 bg-ocean-900/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          <div className="flex items-center gap-4">
            {viewer.avatar?.url ? (
              <img src={viewer.avatar.url} alt={viewer.name ?? "User avatar"} className="h-16 w-16 rounded-full border border-neutral-d-700/60 object-cover" />
            ) : (
              <div className="grid h-16 w-16 place-items-center rounded-full border border-neutral-d-700/60 bg-ocean-800/80 text-gold-300">
                <span className="text-lg font-semibold">{viewer.name?.[0] ?? "U"}</span>
              </div>
            )}
            <div className="space-y-1 text-neutral-d-100">
              <p className="text-lg font-semibold">{viewer.name ?? viewer.nicename ?? t("auth.account.unknownName")}</p>
              {viewer.email ? <p className="text-sm text-neutral-d-200">{viewer.email}</p> : null}
            </div>
          </div>
          {viewer.roles?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {viewer.roles.map((role) => (
                <span key={role} className="rounded-full bg-ocean-800/80 px-3 py-1 text-xs uppercase tracking-wide text-gold-300">
                  {role}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
