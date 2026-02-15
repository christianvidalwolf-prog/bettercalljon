import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'better-call-jon',
  title: 'Better Call Jon CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  },

  document: {
    productionUrl: async (prev, context) => {
      const { document } = context
      if (document._type === 'service') {
        const slug = (document.slug as any)?.current
        return `${process.env.NEXT_PUBLIC_SITE_URL}/servicios/${slug}`
      }
      return prev
    }
  }
})
