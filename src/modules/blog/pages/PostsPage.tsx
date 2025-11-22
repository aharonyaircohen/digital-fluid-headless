import { useMemo, useState } from "react";
import { useTranslation } from "../../../i18n";
import { BackgroundLoader } from "../../../ui/common/BackgroundLoader";
import { PostsList } from "../components/PostsList";
import { PostListView } from "../components/PostListView";
import { usePosts } from "../hooks/usePosts";
import "./PostsPage.css";

export function PostsPage() {
  const { t } = useTranslation();
  const { posts, status, error } = usePosts();
  const readMoreLabel = t("blog.posts.readMore");
   const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const names = posts
      .map((post) => post.category)
      .filter((name): name is string => Boolean(name))
      .map((name) => name.trim());
    return Array.from(new Set(names));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <section className="posts-page">
      <div className="posts-page__header">
        <p className="micro-label">{t("blog.posts.microLabel")}</p>
        <h1 className="posts-page__title">{t("blog.posts.title")}</h1>
        <p className="posts-page__subtitle">{t("blog.posts.subtitle")}</p>
      </div>

      <div className="posts-page__filters">
        <div className="posts-page__view">
          <span className="posts-page__label">{t("blog.posts.view.label")}</span>
          <div className="posts-page__toggle-group">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`posts-page__toggle ${viewMode === "cards" ? "is-active" : ""}`}
              aria-pressed={viewMode === "cards"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="posts-page__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
              {t("blog.posts.view.cards")}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`posts-page__toggle ${viewMode === "list" ? "is-active" : ""}`}
              aria-pressed={viewMode === "list"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="posts-page__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
                <circle cx="7" cy="6" r="1" fill="currentColor" />
                <circle cx="7" cy="12" r="1" fill="currentColor" />
                <circle cx="7" cy="18" r="1" fill="currentColor" />
              </svg>
              {t("blog.posts.view.list")}
            </button>
          </div>
        </div>

        <div className="posts-page__filter">
          <label htmlFor="category" className="posts-page__label">
            {t("blog.posts.filter.label")}
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="posts-page__select"
          >
            <option value="all">{t("blog.posts.filter.all")}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "loading" ? <BackgroundLoader label={t("blog.posts.loading")} /> : null}

      {status === "error" ? (
        <p className="text-gold-300">
          {t("blog.posts.error")}
          {error ? ` — ${error}` : null}
        </p>
      ) : null}

      {status === "success" && filteredPosts.length === 0 ? (
        <p className="text-neutral-d-200">{t("blog.posts.empty")}</p>
      ) : null}

      {status === "success" && filteredPosts.length > 0 ? (
        viewMode === "cards" ? (
          <PostsList posts={filteredPosts} readMoreLabel={readMoreLabel} />
        ) : (
          <PostListView posts={filteredPosts} readMoreLabel={readMoreLabel} />
        )
      ) : null}
    </section>
  );
}
