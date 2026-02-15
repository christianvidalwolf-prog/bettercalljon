import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

if (!projectId) {
  console.warn('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
      perspective: 'published',
    })
  : null

// Cliente para operaciones de escritura (usado en scripts de migración)
export const writeClient = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
      perspective: 'previewDrafts',
    })
  : null
