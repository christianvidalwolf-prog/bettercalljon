import { defineType, defineField } from 'sanity'

export const videoSection = defineType({
  name: 'videoSection',
  title: 'Sección de Video',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'video',
      hidden: true
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.max(150)
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del Video',
      type: 'url',
      description: 'URL de YouTube embed o Vimeo (ej: https://www.youtube.com/embed/VIDEO_ID)',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      }).custom((url) => {
        if (!url) return true
        const isYouTube = url.includes('youtube.com/embed') || url.includes('youtu.be')
        const isVimeo = url.includes('vimeo.com')
        if (!isYouTube && !isVimeo) {
          return 'Debe ser una URL de YouTube embed o Vimeo'
        }
        return true
      })
    })
  ],
  preview: {
    select: {
      title: 'title',
      videoUrl: 'videoUrl'
    },
    prepare({ title, videoUrl }) {
      return {
        title: title || 'Sección de Video',
        subtitle: videoUrl
      }
    }
  }
})
