import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_WEBHOOK_SECRET)

    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401
      })
    }

    if (!body?._type) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({ message, body }), { status: 400 })
    }

    // Revalidar por tipo de documento
    if (body._type === 'service') {
      // Revalidar homepage (lista de servicios)
      revalidatePath('/')

      // Revalidar página específica del servicio si tiene slug
      if (body.slug?.current) {
        revalidatePath(`/servicios/${body.slug.current}`)
      }

      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        paths: ['/', body.slug?.current ? `/servicios/${body.slug.current}` : null].filter(Boolean)
      })
    }

    return NextResponse.json({
      revalidated: false,
      message: 'No matching type to revalidate'
    })
  } catch (err: any) {
    console.error('Error in revalidate API:', err)
    return new Response(err.message, { status: 500 })
  }
}
