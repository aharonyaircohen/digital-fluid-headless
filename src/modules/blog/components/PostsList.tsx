import { Post } from "../types/post";
import { PostCard } from "./PostCard";

type PostsListProps = {
  posts: Post[];
  readMoreLabel: string;
};

export function PostsList({ posts, readMoreLabel }: PostsListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} readMoreLabel={readMoreLabel} />
      ))}
    </div>
  );
}
