export type User = {
  name: string;
  email: string;
  password: string;
};

const USER_KEY = "demo_user";
const SESSION_KEY = "demo_session";

export function saveUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function createSession(email: string) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
}

export function getSessionEmail(): string | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as { email?: string };
    return parsed.email ?? null;
  } catch {
    return null;
  }
}

// Logout
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
