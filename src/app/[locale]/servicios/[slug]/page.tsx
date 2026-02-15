import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { serviceDetailQuery, allServiceSlugsQuery } from '@/sanity/lib/queries'
import { ServicePageClient } from './ServicePageClient'
import type { ServiceContent } from '@/data/services-data'

export async function generateStaticParams() {
  if (!client) return []
  const slugs = await client.fetch<string[]>(allServiceSlugsQuery)
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!client) return { title: 'Better Call Jon' }
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!client) notFound()
  const service = await client.fetch<ServiceContent | null>(serviceDetailQuery, {
    slug
  })

  if (!service) {
    notFound()
  }

  return <ServicePageClient service={service} />
}
