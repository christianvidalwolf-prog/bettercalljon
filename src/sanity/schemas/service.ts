import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug único para la URL (ej: tour-manager)',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[áàäâ]/g, 'a')
          .replace(/[éèëê]/g, 'e')
          .replace(/[íìïî]/g, 'i')
          .replace(/[óòöô]/g, 'o')
          .replace(/[úùüû]/g, 'u')
          .replace(/ñ/g, 'n')
          .replace(/[^\w\-]+/g, '')
      }
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(100)
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
      description: 'Descripción breve que aparece en la tarjeta del servicio',
      validation: Rule => Rule.required().min(50).max(300)
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen Hero (URL Externa)',
      type: 'url',
      description: 'URL externa de la imagen hero que aparece en la parte superior de la página',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'icon',
      title: 'Icono (URL Externa)',
      type: 'url',
      description: 'URL externa del icono del servicio',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'accent',
      title: 'Gradiente Accent',
      type: 'string',
      description: 'Clases Tailwind CSS para el gradiente (ej: from-stage-magenta to-pink-600)',
      validation: Rule => Rule.required(),
      initialValue: 'from-gray-400 to-gray-600',
      options: {
        list: [
          { title: 'Magenta → Pink', value: 'from-stage-magenta to-pink-600' },
          { title: 'Cyan → Blue', value: 'from-stage-cyan to-blue-600' },
          { title: 'Amber → Orange', value: 'from-stage-amber to-orange-600' },
          { title: 'Magenta → Cyan', value: 'from-stage-magenta to-stage-cyan' },
          { title: 'Gray', value: 'from-gray-400 to-gray-600' }
        ]
      }
    }),
    defineField({
      name: 'glowColor',
      title: 'Color de Glow',
      type: 'string',
      description: 'Color RGBA para el efecto de glow (ej: rgba(224, 64, 251, 0.3))',
      validation: Rule => Rule.required().regex(/^rgba?\([\d\s,.]+\)$/, {
        name: 'RGBA color',
        invert: false
      }),
      initialValue: 'rgba(200, 200, 200, 0.15)',
      options: {
        list: [
          { title: 'Magenta', value: 'rgba(224, 64, 251, 0.3)' },
          { title: 'Cyan', value: 'rgba(0, 229, 255, 0.3)' },
          { title: 'Amber', value: 'rgba(255, 171, 0, 0.3)' },
          { title: 'Magenta (suave)', value: 'rgba(224, 64, 251, 0.2)' },
          { title: 'Gray', value: 'rgba(200, 200, 220, 0.15)' }
        ]
      }
    }),
    defineField({
      name: 'sections',
      title: 'Secciones de Contenido',
      type: 'array',
      description: 'Secciones que componen el contenido del servicio',
      of: [
        { type: 'textSection' },
        { type: 'imageSection' },
        { type: 'videoSection' },
        { type: 'gallerySection' },
        { type: 'textImageSection' }
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'order',
      title: 'Orden de Visualización',
      type: 'number',
      description: 'Orden en que aparece en la lista de servicios (1 = primero)',
      validation: Rule => Rule.required().integer().positive().max(100)
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      order: 'order'
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: subtitle?.slice(0, 60) + '...'
      }
    }
  },
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Título A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
})
