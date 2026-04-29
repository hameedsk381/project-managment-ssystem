import { useAuth } from "./useAuth";
import { canAccessByRole } from "../utils/roles";

export function useRoleAccess(featureKey) {
  const { user } = useAuth();
  return canAccessByRole(user?.role, featureKey);
}
