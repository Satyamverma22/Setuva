import { api } from './client';

export async function createLearningPath({ title, description, category, entryIds }) {
  return api.post('/learning-paths', {
    title,
    description,
    category,
    entry_ids: entryIds,
  });
}

export async function listLearningPaths({ category, skip = 0, limit = 20 } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.set('category', category);
  params.set('skip', skip);
  params.set('limit', limit);
  const res = await api.get(`/learning-paths?${params.toString()}`);
  return res?.learning_paths || [];
}

export async function getLearningPath(id) {
  return api.get(`/learning-paths/${id}`);
}

export async function getLearningPathEntries(id) {
  return api.get(`/learning-paths/${id}/entries`);
}

export async function updateLearningPath(id, updates) {
  return api.put(`/learning-paths/${id}`, updates);
}

export async function deleteLearningPath(id) {
  return api.delete(`/learning-paths/${id}`);
}
