import { Navigate } from "react-router-dom";

export function AppRedirectPage() {
  return <Navigate to="/" replace />;
}
