import { graphqlClientAuth } from "../graphql/client";
import { LOGIN_MUTATION, LOGOUT_MUTATION, VIEWER_QUERY } from "../graphql/queries/auth";

type LoginInput = {
  username: string;
  password: string;
};

type LoginResponse = {
  login: {
    user: {
      id: string;
      nicename?: string | null;
      email?: string | null;
    } | null;
  } | null;
};

type LogoutResponse = {
  logout: {
    success?: boolean | null;
  } | null;
};

type ViewerResponse = {
  viewer: {
    id: string;
    name?: string | null;
    nicename?: string | null;
    email?: string | null;
    avatar?: { url?: string | null } | null;
    roles?: { nodes?: Array<{ name?: string | null } | null> | null } | null;
  } | null;
};

export async function login({ username, password }: LoginInput) {
  const result = await graphqlClientAuth
    .mutation<LoginResponse>(LOGIN_MUTATION, { username, password }, { fetchOptions: { credentials: "include" } })
    .toPromise();
  if (result.error) {
    throw result.error;
  }
  return result.data?.login?.user ?? null;
}

export async function logout() {
  const result = await graphqlClientAuth
    .mutation<LogoutResponse>(LOGOUT_MUTATION, {}, { fetchOptions: { credentials: "include" } })
    .toPromise();
  if (result.error) {
    throw result.error;
  }
  return result.data?.logout?.success ?? false;
}

export async function fetchViewer() {
  const result = await graphqlClientAuth
    .query<ViewerResponse>(VIEWER_QUERY, {}, { fetchOptions: { credentials: "include" } })
    .toPromise();
  if (result.error) {
    throw result.error;
  }
  return result.data?.viewer ?? null;
}
