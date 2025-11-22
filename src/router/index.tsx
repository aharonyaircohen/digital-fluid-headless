import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { PageLoader } from "./PageLoader";

const LandingPage = lazy(() =>
  import("../modules/landing/pages/LandingPage").then((module) => ({ default: module.LandingPage }))
);

const PostsPage = lazy(() =>
  import("../modules/blog/pages/PostsPage").then((module) => ({ default: module.PostsPage }))
);

const PostDetailPage = lazy(() =>
  import("../modules/blog/pages/PostDetailPage").then((module) => ({ default: module.PostDetailPage }))
);

const AppRedirectPage = lazy(() =>
  import("../modules/misc/pages/AppRedirectPage").then((module) => ({ default: module.AppRedirectPage }))
);

export function AppRoutes() {
  const element = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/app", element: <AppRedirectPage /> },
    { path: "/posts", element: <PostsPage /> },
    { path: "/posts/:slug", element: <PostDetailPage /> },
  ]);

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}
