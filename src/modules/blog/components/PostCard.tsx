import { Link } from "react-router-dom";
import { Post } from "../types/post";

type PostCardProps = {
  post: Post;
  readMoreLabel: string;
};

export function PostCard({ post, readMoreLabel }: PostCardProps) {
  const { slug, image, date, category, title, excerpt } = post;
  const linkTarget = slug ? `/posts/${slug}` : "#";

  return (
    <Link
      to={linkTarget}
      className="group card-surface relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-d-600/60 p-1 shadow-[0_18px_40px_rgba(0,0,0,0.55)] outline-none transition duration-200 hover:-translate-y-1 hover:border-aqua-300/60 hover:shadow-[0_18px_50px_rgba(0,0,0,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
      aria-label={title}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-ocean-900 via-ocean-800 to-aqua-700/40">
        {image ? (
          <img
            src={image.url}
            alt={image.alt}
            className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02] shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--ocean-900)] via-[color:var(--ocean-800)] to-[color:var(--aqua-400)]/40 shadow-[inset_0_18px_40px_rgba(0,0,0,0.35)]" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-d-200">
          {date ? <span className="text-neutral-d-200/90">{date}</span> : null}
          {category ? <span className="h-1.5 w-1.5 rounded-full bg-ocean-700/80" aria-hidden="true" /> : null}
          {category ? <span className="text-ocean-700/90">{category}</span> : null}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-tight">
            <span className="line-clamp" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {title}
            </span>
          </h3>
          {excerpt ? (
            <p
              className="text-sm leading-relaxed text-neutral-d-200"
              style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {excerpt}
            </p>
          ) : null}
        </div>

        <div className="mt-auto text-sm font-medium text-aqua-200 transition duration-200 group-hover:text-aqua-100">
          {readMoreLabel}
        </div>
      </div>
    </Link>
  );
}
