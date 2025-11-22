import { graphqlClientPublic } from "../../../graphql/client";
import { GET_POST_BY_SLUG } from "../../../graphql/queries/posts";
import { PostDetails, PostDetailsDto } from "../types/post";

type PostDetailsResponse = {
  post: PostDetailsDto | null;
};

const formatDate = (value?: string | null): string | undefined => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toLocaleDateString("en-GB");
};

const pickPrimaryCategory = (dto: PostDetailsDto): string | undefined => {
  const primary = dto.categories?.nodes?.find((node) => node?.name?.trim());
  return primary?.name?.trim() || undefined;
};

const stripScripts = (value: string): string => value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

const decodeHtmlEntities = (value: string): string => {
  if (typeof window === "undefined") {
    return value;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(value, "text/html");
  return doc.documentElement.textContent ?? value;
};

const cleanContent = (value?: string | null): string => {
  if (!value) {
    return "";
  }

  const withoutTags = value.replace(/<\/?[^>]+(>|$)/g, " ");
  const decoded = decodeHtmlEntities(withoutTags);
  return decoded.replace(/\s+/g, " ").trim();
};

const mapPostDetails = (dto: PostDetailsDto): PostDetails => {
  const rawHtml = dto.contentFiltered ?? dto.content ?? "";

  return {
    id: dto.id,
    slug: dto.slug ?? undefined,
    title: dto.title ?? "Untitled",
    contentText: cleanContent(rawHtml),
    contentHtml: stripScripts(rawHtml),
    date: formatDate(dto.date),
    category: pickPrimaryCategory(dto),
    image: dto.featuredImage?.node?.sourceUrl
      ? {
          url: dto.featuredImage.node.sourceUrl,
          alt: dto.featuredImage.node.altText?.trim() || dto.title || "Post image",
        }
      : undefined,
  };
};

export async function fetchPostBySlug(slug: string): Promise<PostDetails | null> {
  const { data, error } = await graphqlClientPublic.query<PostDetailsResponse>(GET_POST_BY_SLUG, { slug }).toPromise();

  if (error) {
    throw error;
  }

  if (!data?.post) {
    return null;
  }

  return mapPostDetails(data.post);
}
