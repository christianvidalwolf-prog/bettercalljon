import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { serviceDetailQuery, allServiceSlugsQuery } from '@/sanity/lib/queries'
import { ServicePageClient } from './ServicePageClient'
import type { ServiceContent } from '@/data/services-data'

// Generar params estáticos en build time
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allServiceSlugsQuery)
  return slugs.map(slug => ({ slug }))
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await client.fetch<ServiceContent | null>(serviceDetailQuery, {
    slug
  })

  if (!service) {
    return {
      title: 'Servicio no encontrado | Better Call Jon'
    }
  }

  return {
    title: `${service.title} | Better Call Jon`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Better Call Jon`,
      description: service.shortDescription,
      images: service.heroImage ? [service.heroImage] : []
    }
  }
}

// Server Component principal
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await client.fetch<ServiceContent | null>(serviceDetailQuery, {
    slug
  })

  if (!service) {
    notFound()
  }

  // Pasar datos al Client Component (para animaciones)
  return <ServicePageClient service={service} />
}
