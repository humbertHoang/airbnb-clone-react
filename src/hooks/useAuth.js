import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
