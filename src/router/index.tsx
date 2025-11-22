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

const CoursesPage = lazy(() =>
  import("../modules/courses/pages/CoursesPage").then((module) => ({ default: module.CoursesPage }))
);

const CourseDetailPage = lazy(() =>
  import("../modules/courses/pages/CourseDetailPage").then((module) => ({ default: module.CourseDetailPage }))
);

const LoginPage = lazy(() => import("../modules/auth/pages/LoginPage").then((module) => ({ default: module.LoginPage })));
const AccountPage = lazy(() => import("../modules/auth/pages/AccountPage").then((module) => ({ default: module.AccountPage })));
const AppRedirectPage = lazy(() =>
  import("../modules/misc/pages/AppRedirectPage").then((module) => ({ default: module.AppRedirectPage }))
);

export function AppRoutes() {
  const element = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/app", element: <AppRedirectPage /> },
    { path: "/posts", element: <PostsPage /> },
    { path: "/posts/:slug", element: <PostDetailPage /> },
    { path: "/courses", element: <CoursesPage /> },
    { path: "/courses/:slug", element: <CourseDetailPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/account", element: <AccountPage /> },
  ]);

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}
