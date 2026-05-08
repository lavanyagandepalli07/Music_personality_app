import { db } from "@/lib/db"
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Get all public profiles for indexing
  const profiles = await db.profile.findMany({
    where: { isPublic: true },
    select: { shareSlug: true, createdAt: true },
    take: 1000 // Limit to top 1000 for sitemap performance
  })

  const profileUrls = profiles.map((p) => ({
    url: `${baseUrl}/p/${p.shareSlug}`,
    lastModified: p.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...profileUrls,
  ]
}
