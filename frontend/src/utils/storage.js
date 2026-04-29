export const AUTH_TOKEN_KEY = "pm_frontend_auth_token";
export const AUTH_USER_KEY = "pm_frontend_auth_user";

export function getStoredToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredUser() {
  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
}

export function setStoredToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function setStoredUser(user) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearStoredToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function clearStoredUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}
