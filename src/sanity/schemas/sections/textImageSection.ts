import { defineType, defineField } from 'sanity'

export const textImageSection = defineType({
  name: 'textImageSection',
  title: 'Sección de Texto + Imagen',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'text-image',
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
    }),
    defineField({
      name: 'imageUrl',
      title: 'URL de la Imagen',
      type: 'url',
      description: 'URL externa de la imagen',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'imagePosition',
      title: 'Posición de la Imagen',
      type: 'string',
      options: {
        list: [
          { title: 'Izquierda', value: 'left' },
          { title: 'Derecha', value: 'right' }
        ],
        layout: 'radio'
      },
      initialValue: 'right'
    })
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
      imagePosition: 'imagePosition'
    },
    prepare({ title, content, imagePosition }) {
      return {
        title: title || 'Sección de Texto + Imagen',
        subtitle: `Imagen a la ${imagePosition === 'left' ? 'izquierda' : 'derecha'} - ${content?.slice(0, 40)}...`
      }
    }
  }
})
