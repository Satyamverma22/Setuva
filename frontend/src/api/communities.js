import { api } from './client';

export async function createCommunity({ name, description, communityType, location }) {
  return api.post('/communities', {
    name,
    description,
    community_type: communityType,
    location,
  });
}

export async function listCommunities({ communityType, location } = {}) {
  const params = new URLSearchParams();
  if (communityType) params.set('community_type', communityType);
  if (location) params.set('location', location);
  const res = await api.get(`/communities?${params.toString()}`);
  return res?.communities || [];
}

export async function getCommunity(id) {
  return api.get(`/communities/${id}`);
}

export async function joinCommunity(id) {
  return api.post(`/communities/${id}/join`, {});
}

export async function leaveCommunity(id) {
  return api.delete(`/communities/${id}/leave`);
}

export async function updateCommunity(id, updates) {
  return api.put(`/communities/${id}`, updates);
}
