import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import { TAGS } from '@/lib/queries'

// On-demand revalidation endpoint. Sanity posts here whenever content is
// published; we invalidate only the affected cache tags so pages refresh
// immediately without any time-based ISR rewrites.
export async function POST(req) {
  try {
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    const type = body?._type
    const slug = body?.slug?.current

    const tags = []
    if (type === 'siteSettings') {
      tags.push(TAGS.siteSettings)
    } else if (type === 'page') {
      tags.push(TAGS.page)
      if (slug) tags.push(TAGS.pageSlug(slug))
    }

    if (tags.length === 0) {
      return NextResponse.json({ revalidated: false, reason: 'no matching tags', type })
    }

    for (const tag of tags) revalidateTag(tag)

    return NextResponse.json({ revalidated: true, tags, now: Date.now() })
  } catch (err) {
    console.error('Revalidate webhook error:', err)
    return new Response(err.message, { status: 500 })
  }
}
