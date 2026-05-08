'use server'

import { auth } from "@/auth"
import { getListeningSnapshot, TimeRange } from "@/lib/snapshots"
import { computeMetrics } from "@/lib/metrics"
import { generateMusicProfile } from "@/lib/gemini"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export async function generateProfileAction(timeRange: TimeRange = "medium_term") {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id

  // 1. Get/Create Snapshot
  const snapshot = await getListeningSnapshot(userId, timeRange)
  
  // 2. Compute Metrics
  const metrics = computeMetrics(snapshot)

  // 3. Generate AI Profile
  const profileData = await generateMusicProfile(metrics, session.user.name || "Music Lover")

  // 4. Find the snapshot ID to link the profile
  const dbSnapshot = await db.snapshot.findFirst({
    where: { userId, timeRange },
    orderBy: { createdAt: 'desc' }
  })

  if (!dbSnapshot) throw new Error("Snapshot not found")

  // 5. Store Profile in DB
  const profile = await db.profile.create({
    data: {
      userId,
      snapshotId: dbSnapshot.id,
      data: JSON.stringify(profileData),
      isPublic: true, // Default to public for easy sharing in MVP
    }
  })

  // 6. Redirect to the new profile page
  redirect(`/profile/${profile.shareSlug}`)
}
