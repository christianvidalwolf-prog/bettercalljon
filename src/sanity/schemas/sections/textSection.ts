import { defineType, defineField } from 'sanity'

export const textSection = defineType({
  name: 'textSection',
  title: 'Sección de Texto',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'text',
      hidden: true
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.max(150)
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required().min(20).max(2000)
    })
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content'
    },
    prepare({ title, content }) {
      return {
        title: title || 'Sección de Texto',
        subtitle: content?.slice(0, 60) + '...'
      }
    }
  }
})
