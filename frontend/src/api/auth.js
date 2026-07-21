import { api, setTokens, clearTokens } from './client';

// Backend role values (Phase 1): "contributor" | "learner" | "both"
// Frontend UI uses "User" / "Expert" — mapped here so the rest of the
// app can keep using the friendlier labels.
export function uiRoleToBackend(uiRole) {
  return uiRole === 'Expert' ? 'contributor' : 'learner';
}

export function backendRoleToUi(backendRole) {
  if (backendRole === 'contributor') return 'Expert';
  if (backendRole === 'both') return 'Expert';
  return 'User';
}

export async function register({ name, email, password, role }) {
  const data = await api.post(
    '/auth/register',
    { name, email, password, role: uiRoleToBackend(role) },
    { auth: false }
  );
  setTokens(data);
  return data;
}

export async function login({ email, password }) {
  const data = await api.post('/auth/login', { email, password }, { auth: false });
  setTokens(data);
  return data;
}

export async function getMe() {
  return api.get('/users/me');
}

export function logout() {
  clearTokens();
}

// Normalizes a backend UserOut object into the shape the existing UI
// components (Profile, Navbar, etc.) already expect, so we don't have to
// rewrite every component's field names.
export function normalizeUser(backendUser) {
  if (!backendUser) return null;
  return {
    id: backendUser.id,
    name: backendUser.name,
    email: backendUser.email,
    role: backendRoleToUi(backendUser.role),
    rawRole: backendUser.role,
    preferredLanguage: backendUser.preferred_language || 'en',
    joinedDate: backendUser.created_at
      ? new Date(backendUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : '',
    // These fields don't exist on the backend yet (no bio/location/phone/
    // avatar/skills columns as of Phase 4.5) — kept so the existing Profile
    // UI doesn't break, defaulted to friendly placeholders.
    bio: backendUser.bio || 'Member of the Setu knowledge preservation community.',
    location: backendUser.location || '',
    phone: backendUser.phone || '',
    skills: backendUser.skills || [],
    avatar:
      backendUser.avatar ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  };
}
