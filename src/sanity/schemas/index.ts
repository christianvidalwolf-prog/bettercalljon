import { serviceSchema } from './service'
import { textSection } from './sections/textSection'
import { imageSection } from './sections/imageSection'
import { videoSection } from './sections/videoSection'
import { gallerySection } from './sections/gallerySection'
import { textImageSection } from './sections/textImageSection'

export const schemaTypes = [
  // Document types
  serviceSchema,

  // Object types (sections)
  textSection,
  imageSection,
  videoSection,
  gallerySection,
  textImageSection
]
