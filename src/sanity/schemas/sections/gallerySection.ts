import { defineType, defineField } from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Sección de Galería',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'gallery',
      hidden: true
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.max(150)
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{
        type: 'url',
        validation: Rule => Rule.uri({
          scheme: ['http', 'https']
        })
      }],
      validation: Rule => Rule.required().min(1).max(12)
    })
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images'
    },
    prepare({ title, images }) {
      return {
        title: title || 'Sección de Galería',
        subtitle: `${images?.length || 0} imágenes`
      }
    }
  }
})
