import { config } from 'dotenv'
import { createClient } from '@sanity/client'
import { servicesData } from '../src/data/services-data'

// Cargar variables de entorno desde .env.local
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false
})

async function migrateServices() {
  console.log('🚀 Iniciando migración de servicios a Sanity...\n')

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: Faltan variables de entorno de Sanity')
    console.log('Asegúrate de configurar:')
    console.log('  - NEXT_PUBLIC_SANITY_PROJECT_ID')
    console.log('  - NEXT_PUBLIC_SANITY_DATASET')
    console.log('  - SANITY_API_TOKEN')
    process.exit(1)
  }

  for (const [index, service] of servicesData.entries()) {
    try {
      const doc = {
        _type: 'service',
        slug: {
          _type: 'slug',
          current: service.slug
        },
        title: service.title,
        shortDescription: service.shortDescription,
        heroImage: service.heroImage,
        icon: service.icon,
        accent: service.accent,
        glowColor: service.glowColor,
        order: index + 1,
        sections: service.sections.map(section => ({
          _type: section.type + 'Section',
          _key: Math.random().toString(36).substr(2, 9),
          type: section.type,
          title: section.title,
          content: section.content,
          imageUrl: section.imageUrl,
          videoUrl: section.videoUrl,
          images: section.images,
          imagePosition: section.imagePosition
        }))
      }

      const result = await client.create(doc)
      console.log(`✅ Migrado: ${service.title} (ID: ${result._id})`)
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log(`⚠️  Ya existe: ${service.title} (omitiendo)`)
      } else {
        console.error(`❌ Error migrando ${service.title}:`, error.message)
      }
    }
  }

  console.log(`\n✨ Migración completada!`)
  console.log(`📊 Total de servicios en datos originales: ${servicesData.length}`)
}

migrateServices().catch(error => {
  console.error('❌ Error fatal:', error)
  process.exit(1)
})
