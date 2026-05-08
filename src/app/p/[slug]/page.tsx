import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { ProfileReveal, ProfileData } from "@/components/profile-reveal"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const profile = await db.profile.findUnique({
    where: { shareSlug: params.slug },
    include: { user: true }
  })

  if (!profile) return {}

  const data = JSON.parse(profile.data) as ProfileData
  
  return {
    title: `${profile.user.name}'s Music Personality: ${data.archetype.title}`,
    description: data.archetype.tagline,
    openGraph: {
      title: `${profile.user.name} is a ${data.archetype.title}`,
      description: data.archetype.tagline,
      images: [`/api/og/${params.slug}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.user.name} is a ${data.archetype.title}`,
      description: data.archetype.tagline,
      images: [`/api/og/${params.slug}`],
    },
  }
}

import { auth } from "@/auth"

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const session = await auth()

  const [profile, currentUserProfile] = await Promise.all([
    db.profile.findUnique({
      where: { shareSlug: slug },
      include: { user: true }
    }),
    session?.user?.id 
      ? db.profile.findFirst({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' } })
      : null
  ])

  if (!profile || !profile.isPublic) {
    notFound()
  }

  const data = JSON.parse(profile.data) as ProfileData

  return (
    <ProfileReveal 
      data={data} 
      userName={profile.user.name || "Music Lover"} 
      userImage={profile.user.image}
      isOwner={session?.user?.id === profile.userId}
      shareSlug={profile.shareSlug}
      currentUserProfileSlug={currentUserProfile?.shareSlug}
    />
  )
}
