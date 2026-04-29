export const ROLE_OPTIONS = [
  "Admin",
  "Project Manager",
  "Team Lead",
  "Member",
  "Viewer",
];

export const ROLE_ROUTE_ACCESS = {
  Admin: ["dashboard", "inbox", "users", "teams", "projects", "tasks", "notifications", "profile"],
  "Project Manager": ["dashboard", "inbox", "projects", "tasks", "notifications", "profile"],
  "Team Lead": ["dashboard", "inbox", "teams", "projects", "tasks", "notifications", "profile"],
  Member: ["dashboard", "inbox", "projects", "tasks", "notifications", "profile"],
  Viewer: ["dashboard", "projects", "notifications", "profile"],
};

export function normalizeRole(role) {
  if (!role) return "Viewer";

  const matchedRole = ROLE_OPTIONS.find(
    (option) => option.toLowerCase() === String(role).trim().toLowerCase(),
  );

  return matchedRole || role;
}

export function canAccessByRole(role, featureKey) {
  const normalizedRole = normalizeRole(role);
  const allowedFeatures = ROLE_ROUTE_ACCESS[normalizedRole] || ROLE_ROUTE_ACCESS.Viewer;
  return allowedFeatures.includes(featureKey);
}
