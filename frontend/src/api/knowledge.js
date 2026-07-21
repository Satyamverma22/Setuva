import { api } from './client';

// Backend categories (Phases 1-4). Keep this in sync with
// KnowledgeEntryCreate's Literal[...] on the backend.
export const CATEGORIES = [
  'Healthcare',
  'Agriculture',
  'Engineering',
  'Education',
  'Business',
  'Technology',
  'Traditional Knowledge',
];

export const CONTENT_TYPES = ['text', 'voice', 'video', 'document'];

export async function listKnowledge({ category, contributorId, communityId, lang, skip = 0, limit = 20, q } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.set('category', category);
  if (contributorId) params.set('contributor_id', contributorId);
  if (communityId) params.set('community_id', communityId);
  if (lang) params.set('lang', lang);
  params.set('skip', skip);
  params.set('limit', limit);

  // If there's a real search query, prefer semantic search (falls back to
  // keyword automatically on the backend if no embeddings exist yet).
  if (q && q.trim()) {
    params.set('q', q.trim());
    const res = await api.get(`/search/semantic?${params.toString()}`);
    return res?.results || [];
  }
  return api.get(`/knowledge?${params.toString()}`);
}

export async function getKnowledgeEntry(id, lang) {
  const params = lang ? `?lang=${encodeURIComponent(lang)}` : '';
  return api.get(`/knowledge/${id}${params}`);
}

export async function createKnowledgeEntry({ title, description, category, communityId }) {
  return api.post('/knowledge', {
    title,
    description,
    category,
    ...(communityId ? { community_id: communityId } : {}),
  });
}

export async function updateKnowledgeEntry(id, updates) {
  return api.put(`/knowledge/${id}`, updates);
}

export async function deleteKnowledgeEntry(id) {
  return api.delete(`/knowledge/${id}`);
}

export async function uploadKnowledgeFile(id, file, contentType) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('content_type', contentType);
  return api.postForm(`/knowledge/${id}/upload`, formData);
}

export async function getKnowledgeStatus(id) {
  return api.get(`/knowledge/${id}/status`);
}

export async function retryKnowledgeProcessing(id) {
  return api.post(`/knowledge/${id}/retry`, {});
}

/**
 * Poll GET /knowledge/{id}/status until it reaches "completed" or "failed".
 * Returns the final status payload. Used right after upload so the UI can
 * show a live "processing..." state without the caller managing intervals.
 */
export async function pollKnowledgeStatus(id, { intervalMs = 3000, timeoutMs = 180000, onTick } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const status = await getKnowledgeStatus(id);
    if (onTick) onTick(status);
    if (status.status === 'completed' || status.status === 'failed') {
      return status;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error('Processing is taking longer than expected. Check back on this entry shortly.');
}

/**
 * Normalizes a backend KnowledgeEntryOut into the shape the existing
 * LibraryCard / Library detail view expects (contentType, contributor,
 * readTime, image, traditionalMethod, etc.) so the existing UI keeps
 * working with real data instead of the old hardcoded array.
 */
export function normalizeEntry(entry) {
  if (!entry) return null;
  const contentTypeLabel = {
    text: 'Article',
    voice: 'Audio',
    video: 'Video',
    document: 'PDF',
  }[entry.content_type] || 'Article';

  return {
    id: entry.id,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    contentType: contentTypeLabel,
    contributor: entry.contributor_name || 'Setu Contributor',
    contributorId: entry.contributor_id,
    readTime: entry.status === 'completed' ? '5 min' : 'Processing...',
    fileUrl: entry.file_url || null,
    status: entry.status,
    errorMessage: entry.error_message || null,
    transcript: entry.transcript || null,
    summary: entry.summary || 'AI summary will appear here once processing finishes.',
    keyInsights: entry.key_insights || [],
    trustScore: typeof entry.trust_score === 'number' ? entry.trust_score : 0,
    verificationCount: entry.verification_count || 0,
    createdAt: entry.created_at,
    communityId: entry.community_id || null,
    // Legacy field names kept as aliases so the existing "Knowledge Bridge"
    // detail UI (traditionalMethod / scientificExplanation / etc.) can be
    // repointed at real AI-generated content without a full rewrite.
    traditionalMethod: entry.description,
    personalExperience: entry.transcript
      ? entry.transcript.slice(0, 400) + (entry.transcript.length > 400 ? '…' : '')
      : 'No transcript available for this entry yet.',
    scientificExplanation: entry.summary || 'Summary pending — this entry is still being processed.',
    benefits: (entry.key_insights || []).join(' • ') || 'Key insights pending.',
    precautions: null,
  };
}
