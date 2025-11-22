import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchViewer, login as loginService, logout as logoutService } from "./authService";

type Viewer = {
  id: string;
  name?: string | null;
  nicename?: string | null;
  email?: string | null;
  avatar?: { url?: string | null } | null;
  roles?: string[];
};

type AuthState = {
  viewer: Viewer | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [status, setStatus] = useState<AuthState["status"]>("idle");
  const [error, setError] = useState<string | null>(null);

  const loadViewer = async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await fetchViewer();
      if (data) {
        setViewer({
          id: data.id,
          name: data.name ?? data.nicename ?? null,
          nicename: data.nicename,
          email: data.email,
          avatar: data.avatar ?? undefined,
          roles: data.roles?.nodes?.map((node) => node?.name).filter((name): name is string => Boolean(name)) ?? [],
        });
        setStatus("authenticated");
      } else {
        setViewer(null);
        setStatus("unauthenticated");
      }
    } catch (err) {
      setViewer(null);
      setStatus("unauthenticated");
      const msg = err instanceof Error ? err.message : "Failed to load viewer";
      setError(msg);
      // eslint-disable-next-line no-console
      console.error("Failed to fetch viewer", err);
    }
  };

  useEffect(() => {
    void loadViewer();
  }, []);

  const login = async (username: string, password: string) => {
    setError(null);
    try {
      await loginService({ username, password });
      await loadViewer();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      setStatus("unauthenticated");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Logout failed", err);
    } finally {
      setViewer(null);
      setStatus("unauthenticated");
    }
  };

  const value = useMemo<AuthState>(
    () => ({
      viewer,
      status,
      error,
      login,
      logout,
      refresh: loadViewer,
    }),
    [viewer, status, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
