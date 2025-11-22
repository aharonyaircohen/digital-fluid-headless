export type PostImage = {
  url: string;
  alt: string;
};

export type Post = {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  date?: string;
  category?: string;
  image?: PostImage;
};

export type PostDto = {
  id: string;
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  categories?: {
    nodes?: Array<{
      name?: string | null;
    } | null> | null;
  } | null;
};

export type PostDetails = {
  id: string;
  slug?: string;
  title: string;
  contentText: string;
  contentHtml: string;
  date?: string;
  category?: string;
  image?: PostImage;
};

export type PostDetailsDto = {
  id: string;
  slug?: string | null;
  title?: string | null;
  content?: string | null;
  contentFiltered?: string | null;
  date?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  categories?: {
    nodes?: Array<{
      name?: string | null;
    } | null> | null;
  } | null;
};
