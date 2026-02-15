import { defineType, defineField } from 'sanity'

export const imageSection = defineType({
  name: 'imageSection',
  title: 'Sección de Imagen',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'image',
      hidden: true
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.max(150)
    }),
    defineField({
      name: 'imageUrl',
      title: 'URL de la Imagen',
      type: 'url',
      description: 'URL externa de la imagen',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      })
    })
  ],
  preview: {
    select: {
      title: 'title',
      imageUrl: 'imageUrl'
    },
    prepare({ title, imageUrl }) {
      return {
        title: title || 'Sección de Imagen',
        subtitle: imageUrl
      }
    }
  }
})
