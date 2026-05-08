import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { computeMetrics } from "@/lib/metrics"
import { computeCompatibility } from "@/lib/compatibility"
import { analyzeCompatibility } from "@/lib/gemini"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, Users, Music2, AlertCircle } from "lucide-react"

export default async function ComparisonPage({ 
  params 
}: { 
  params: { slugA: string; slugB: string } 
}) {
  const { slugA, slugB } = params

  // 1. Fetch both profiles
  const [profileA, profileB] = await Promise.all([
    db.profile.findUnique({ where: { shareSlug: slugA }, include: { user: true } }),
    db.profile.findUnique({ where: { shareSlug: slugB }, include: { user: true } })
  ])

  if (!profileA || !profileB) notFound()

  // 2. Fetch snapshots linked to these profiles
  const [snapA, snapB] = await Promise.all([
    db.snapshot.findUnique({ where: { id: profileA.snapshotId } }),
    db.snapshot.findUnique({ where: { id: profileB.snapshotId } })
  ])

  if (!snapA || !snapB) throw new Error("Snapshots missing")

  const dataA = JSON.parse(snapA.data)
  const dataB = JSON.parse(snapB.data)

  // 3. Compute Metrics & Compatibility
  const metricsA = computeMetrics(dataA)
  const metricsB = computeMetrics(dataB)
  
  const deterministic = computeCompatibility(dataA, dataB)
  const aiAnalysis = await analyzeCompatibility(
    metricsA, 
    metricsB, 
    profileA.user.name || "User A", 
    profileB.user.name || "User B"
  )

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 pt-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Comparison Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-8 mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 w-20 rounded-full ring-2 ring-primary/40 overflow-hidden">
                <img src={profileA.user.image || ""} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="font-bold">{profileA.user.name?.split(' ')[0]}</span>
            </div>
            <ArrowLeftRight className="w-10 h-10 text-primary animate-pulse" />
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 w-20 rounded-full ring-2 ring-primary/40 overflow-hidden">
                <img src={profileB.user.image || ""} alt="" className="h-full w-full object-cover" />
              </div>
              <span className="font-bold">{profileB.user.name?.split(' ')[0]}</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold mb-4">Vibe Check</h1>
          <div className="relative h-32 w-32 flex items-center justify-center">
             <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
             <span className="text-5xl font-black text-primary z-10">{deterministic.score}%</span>
          </div>
          <Badge className="mt-4 px-6 py-1 text-lg uppercase tracking-widest bg-primary text-primary-foreground">
            {aiAnalysis.verdict}
          </Badge>
        </div>

        {/* AI Vibe Analysis */}
        <Card className="p-8 mb-12 border-primary/20 bg-primary/5 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-24 h-24" />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
             <Sparkles className="w-5 h-5 text-primary" />
             The AI Verdict
          </h3>
          <p className="text-xl leading-relaxed text-foreground italic">
            &quot;{aiAnalysis.vibeCheck}&quot;
          </p>
          <div className="mt-6 pt-6 border-t border-primary/10">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2 font-bold">Shared Obsession</p>
            <p className="text-lg font-bold text-primary">{aiAnalysis.sharedObsession}</p>
          </div>
        </Card>

        {/* Overlap Stats */}
        <div className="grid sm:grid-cols-2 gap-8">
          <Card className="p-6 bg-white/5 border-white/10">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-primary" />
              Common Ground
            </h4>
            <div className="flex flex-wrap gap-2">
              {deterministic.commonArtists.length > 0 ? (
                deterministic.commonArtists.map((artist, i) => (
                  <Badge key={i} variant="secondary">{artist}</Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No shared top artists... yet.</p>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-white/5 pt-6">
              {deterministic.commonGenres.map((genre, i) => (
                <Badge key={i} variant="outline" className="opacity-70">{genre}</Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white/5 border-white/10">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              The Gap
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Your mainstream compatibility is <span className="text-foreground font-bold">{100 - Math.abs(metricsA.mainstreamScore - metricsB.mainstreamScore)}%</span>
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 uppercase text-muted-foreground">
                  <span>Diversity Gap</span>
                  <span>{Math.abs(metricsA.genreDiversity - metricsB.genreDiversity)}%</span>
                </div>
                <Progress value={Math.abs(metricsA.genreDiversity - metricsB.genreDiversity)} className="h-1" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
