import { groq } from 'next-sanity'

// Query para obtener la lista de servicios (usado en el grid de la homepage)
export const servicesListQuery = groq`
  *[_type == "service"] | order(order asc) {
    "slug": slug.current,
    title,
    shortDescription,
    icon,
    accent,
    glowColor
  }
`

// Query para obtener el detalle completo de un servicio (usado en la página individual)
export const serviceDetailQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    shortDescription,
    heroImage,
    icon,
    accent,
    glowColor,
    sections[] {
      _type,
      type,
      title,
      content,
      imageUrl,
      videoUrl,
      images,
      imagePosition
    }
  }
`

// Query para obtener todos los slugs (usado en generateStaticParams)
export const allServiceSlugsQuery = groq`
  *[_type == "service"].slug.current
`

// Query para contar servicios (útil para validación)
export const serviceCountQuery = groq`
  count(*[_type == "service"])
`
