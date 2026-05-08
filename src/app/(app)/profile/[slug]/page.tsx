import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { ProfileReveal, ProfileData } from "@/components/profile-reveal"

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const session = await auth()

  const profile = await db.profile.findUnique({
    where: { shareSlug: slug },
    include: { user: true }
  })

  if (!profile) {
    notFound()
  }

  const data = JSON.parse(profile.data) as ProfileData
  const isOwner = session?.user?.id === profile.userId

  return (
    <ProfileReveal 
      data={data} 
      userName={profile.user.name || "Music Lover"} 
      userImage={profile.user.image}
      isOwner={isOwner}
    />
  )
}
