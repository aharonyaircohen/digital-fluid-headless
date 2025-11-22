import { graphqlClientPublic } from "../../../graphql/client";
import { GET_POSTS } from "../../../graphql/queries/posts";
import { Post, PostDto } from "../types/post";

type PostsQueryResponse = {
  posts: {
    pageInfo: {
      endCursor?: string | null;
      hasNextPage: boolean;
    };
    nodes: PostDto[];
  } | null;
};

const formatDate = (value?: string | null): string | undefined => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  // dd/mm/yyyy format
  return date.toLocaleDateString("en-GB");
};

const decodeHtmlEntities = (value: string): string => {
  if (typeof window === "undefined") {
    return value;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(value, "text/html");
  return doc.documentElement.textContent ?? value;
};

const cleanExcerpt = (value?: string | null): string => {
  if (!value) {
    return "";
  }

  const withoutTags = value.replace(/<\/?[^>]+(>|$)/g, " ");
  const decoded = decodeHtmlEntities(withoutTags);
  return decoded.replace(/\s+/g, " ").trim();
};

const pickPrimaryCategory = (dto: PostDto): string | undefined => {
  const primary = dto.categories?.nodes?.find((node) => node?.name?.trim());
  return primary?.name?.trim() || undefined;
};

const mapPost = (dto: PostDto): Post => ({
  id: dto.id,
  slug: dto.slug ?? undefined,
  title: dto.title ?? "Untitled",
  excerpt: cleanExcerpt(dto.excerpt),
  date: formatDate(dto.date),
  category: pickPrimaryCategory(dto),
  image: dto.featuredImage?.node?.sourceUrl
    ? {
        url: dto.featuredImage.node.sourceUrl,
        alt: dto.featuredImage.node.altText?.trim() || dto.title || "Post image",
      }
    : undefined,
});

export async function fetchPosts(): Promise<Post[]> {
  const allPosts: Post[] = [];
  let hasNextPage = true;
  let afterCursor: string | undefined;

  while (hasNextPage) {
    const { data, error } = await graphqlClientPublic.query<PostsQueryResponse>(GET_POSTS, { first: 50, after: afterCursor }).toPromise();

    if (error) {
      throw error;
    }

    const nodes = data?.posts?.nodes ?? [];
    const mapped = nodes.filter((node): node is PostDto => Boolean(node?.id)).map(mapPost);
    allPosts.push(...mapped);

    hasNextPage = data?.posts?.pageInfo?.hasNextPage ?? false;
    afterCursor = data?.posts?.pageInfo?.endCursor ?? undefined;

    if (!hasNextPage) {
      break;
    }
  }

  return allPosts;
}
