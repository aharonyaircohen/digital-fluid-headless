import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useTranslation } from "../../../i18n";

export function LoginPage() {
  const { t } = useTranslation();
  const { login, status, error } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      await login(username, password);
      navigate("/account");
    } catch (err) {
      const msg = err instanceof Error ? err.message : t("auth.login.error");
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = submitting || status === "loading";
  const displayError = formError ?? error;

  return (
    <section className="py-6">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-d-700/60 bg-gradient-to-br from-[color:var(--ocean-900)] via-[color:var(--ocean-800)]/85 to-[color:var(--ocean-700)]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
          <div className="pointer-events-none absolute inset-0 bg-[var(--surface-glow-1),var(--surface-glow-2)]" />
          <div className="relative space-y-3">
            <p className="micro-label">{t("auth.login.microLabel")}</p>
            <h1 className="text-3xl font-semibold text-gold-300">{t("auth.login.title")}</h1>
            <p className="text-neutral-d-200">{t("auth.login.subtitle")}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-neutral-d-700/60 bg-ocean-900/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm text-neutral-d-200">
              {t("auth.login.username")}
            </label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg border border-neutral-d-700/60 bg-ocean-900/70 px-3 py-2 text-neutral-d-50 focus:border-aqua-300/70 focus:outline-none focus:ring-1 focus:ring-aqua-300/50"
              required
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-neutral-d-200">
              {t("auth.login.password")}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-neutral-d-700/60 bg-ocean-900/70 px-3 py-2 text-neutral-d-50 focus:border-aqua-300/70 focus:outline-none focus:ring-1 focus:ring-aqua-300/50"
              required
              autoComplete="current-password"
            />
          </div>

          {displayError ? <p className="text-sm text-gold-300">{displayError}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-aqua-400 px-4 py-2 text-sm font-semibold text-ocean-900 transition hover:bg-aqua-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-200 disabled:opacity-60"
          >
            {isLoading ? t("auth.login.loading") : t("auth.login.submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
