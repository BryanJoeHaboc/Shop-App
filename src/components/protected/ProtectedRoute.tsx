import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { LoggedInUser } from "../../../interfaces/user";

interface AuxProps {
  children: JSX.Element | ReactElement;
  user: LoggedInUser;
}

export default function ProtectedRoute({ user, children }: AuxProps) {
  if (!user.token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
