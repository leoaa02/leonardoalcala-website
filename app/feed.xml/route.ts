import { client } from "@/sanity/lib/client"
import { postsQuery } from "@/sanity/lib/queries"
import type { Post } from "@/lib/types"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://leonardoalcala.com"

export async function GET() {
  let posts: Post[] = []
  
  try {
    posts = await client.fetch<Post[]>(postsQuery)
  } catch {
    // Sanity not configured, use empty array
  }

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Leonardo Alcala</title>
    <link>${baseUrl}</link>
    <description>Technology, writing and creativity. Articles about programming, productivity, and storytelling.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts?.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug.current}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug.current}</guid>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
      ${post.categories?.map((cat) => `<category>${cat.title}</category>`).join("") || ""}
    </item>`).join("") || ""}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
