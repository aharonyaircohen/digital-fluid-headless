import { Link, useParams } from "react-router-dom";
import { useLocale, useTranslation } from "../../../i18n";
import { BackgroundLoader } from "../../../ui/common/BackgroundLoader";
import { usePost } from "../hooks/usePost";
import "./PostDetailPage.css";

export function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { direction } = useLocale();
  const { post, status, error } = usePost(slug);
  const backIcon = direction === "rtl" ? "→" : "←";

  const showError = status === "error";
  const showLoading = status === "loading";
  const showEmpty = status === "success" && !post;

  return (
    <section className="py-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex justify-start">
          <Link to="/posts" className="post-back-link">
            <span aria-hidden="true">{backIcon}</span> {t("blog.post.back")}
          </Link>
        </div>

        <div className="post-hero relative overflow-hidden rounded-2xl border p-6 shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(114,224,255,0.12),transparent_35%),radial-gradient(circle_at_75%_10%,rgba(167,157,255,0.12),transparent_35%)]" />
          <div className="relative space-y-3">
            <p className="micro-label">{t("blog.post.microLabel")}</p>
            <h1 className="text-3xl font-semibold">{post?.title ?? t("blog.post.titleFallback")}</h1>
            <div className="post-meta flex flex-wrap items-center gap-3 text-sm">
              {post?.date ? <span>{post.date}</span> : null}
              {post?.category ? (
                <span className="post-category-chip rounded-full px-3 py-1 text-xs uppercase tracking-wide">
                  {post.category}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {showLoading ? <BackgroundLoader label={t("blog.post.loading")} /> : null}

        {showError ? (
          <div className="post-message post-message--error">
            <p className="post-message__title">{t("blog.post.error")}</p>
            <p className="post-message__body">{error}</p>
          </div>
        ) : null}

        {showEmpty ? (
          <div className="post-message">
            <p className="post-message__title">{t("blog.post.empty")}</p>
            <Link to="/posts" className="post-back-link">
              {t("blog.post.back")}
            </Link>
          </div>
        ) : null}

        {status === "success" && post ? (
          <article className="post-panel relative rounded-2xl border border-neutral-d-700/60 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
            <div className="relative z-10 space-y-6">
              {post.image ? (
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <img src={post.image.url} alt={post.image.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ) : null}
              <div className="post-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              <div className="flex justify-start">
                <Link to="/posts" className="post-back-link">
                  <span aria-hidden="true">{backIcon}</span> {t("blog.post.back")}
                </Link>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
