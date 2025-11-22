import { Link } from "react-router-dom";
import { Post } from "../types/post";

type PostListViewProps = {
  posts: Post[];
  readMoreLabel: string;
};

export function PostListView({ posts, readMoreLabel }: PostListViewProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const href = post.slug ? `/posts/${post.slug}` : "#";
        return (
          <Link
            key={post.id}
            to={href}
            className="group card-surface relative flex gap-4 overflow-hidden rounded-2xl border border-neutral-d-600/60 p-3 shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-aqua-300/60 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
            aria-label={post.title}
          >
            <div className="relative h-20 w-28 overflow-hidden rounded-xl bg-gradient-to-br from-[color:var(--ocean-900)] via-[color:var(--ocean-800)] to-[color:var(--aqua-400)]/30 shadow-[inset_0_12px_28px_rgba(0,0,0,0.35)]">
              {post.image ? (
                <img src={post.image.url} alt={post.image.alt} className="h-full w-full object-cover" loading="lazy" />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-neutral-d-200">
                  {post.date ? <span>{post.date}</span> : null}
                  {post.category ? (
                    <span className="rounded-full bg-ocean-800/80 px-2 py-1 text-[11px] text-gold-300">{post.category}</span>
                  ) : null}
                </div>
                <h3 className="text-lg font-semibold text-neutral-d-50">{post.title}</h3>
                {post.excerpt ? <p className="text-sm text-neutral-d-200 line-clamp-2">{post.excerpt}</p> : null}
              </div>
              <span className="text-sm font-medium text-aqua-200">{readMoreLabel}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
