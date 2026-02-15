import { config } from 'dotenv'
import { createClient } from '@sanity/client'
import { servicesData } from '../src/data/services-data'

// Cargar variables de entorno desde .env.local
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false
})

async function validateMigration() {
  console.log('🔍 Validando migración de servicios...\n')

  try {
    const sanityServices = await client.fetch<any[]>('*[_type == "service"] | order(order asc)')

    console.log(`📦 Datos originales: ${servicesData.length} servicios`)
    console.log(`☁️  Datos en Sanity: ${sanityServices.length} servicios\n`)

    if (servicesData.length !== sanityServices.length) {
      console.error('❌ El número de servicios no coincide!')
      return false
    }

    let allValid = true

    for (const original of servicesData) {
      const sanityService = sanityServices.find(
        (s: any) => s.slug.current === original.slug
      )

      if (!sanityService) {
        console.error(`❌ Falta servicio: ${original.slug}`)
        allValid = false
        continue
      }

      if (sanityService.sections.length !== original.sections.length) {
        console.error(
          `❌ ${original.slug}: Número de secciones no coincide (original: ${original.sections.length}, Sanity: ${sanityService.sections.length})`
        )
        allValid = false
        continue
      }

      console.log(`✅ ${original.slug} - OK (${sanityService.sections.length} secciones)`)
    }

    console.log('\n' + (allValid ? '✨ Validación exitosa!' : '⚠️  Validación con errores'))
    return allValid
  } catch (error: any) {
    console.error('❌ Error durante validación:', error.message)
    return false
  }
}

validateMigration().catch(error => {
  console.error('❌ Error fatal:', error)
  process.exit(1)
})
