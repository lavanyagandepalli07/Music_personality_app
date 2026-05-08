'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Music2, Sparkles, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-foreground">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3 ring-1 ring-primary/20">
            <Music2 className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="max-w-2xl text-5xl font-extrabold tracking-tight sm:text-7xl">
          Your Sound, <br />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Visualized.
          </span>
        </h1>
        
        <p className="mx-auto mt-8 max-w-lg text-lg text-muted-foreground sm:text-xl">
          Go beyond the genres. Discover the DNA of your music personality through deterministic metrics and AI-driven archetypes.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/login">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Connect Spotify
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold transition-all hover:bg-primary/5">
            Learn More
          </Button>
        </div>
      </motion.div>

      {/* Feature Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:max-w-5xl"
      >
        <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
          <div className="mb-4 rounded-2xl bg-primary/10 p-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">AI Archetypes</h3>
          <p className="mt-2 text-sm text-muted-foreground">Unique personalities generated from your listening data.</p>
        </div>
        
        <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
          <div className="mb-4 rounded-2xl bg-primary/10 p-4">
            <Music2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Deep Metrics</h3>
          <p className="mt-2 text-sm text-muted-foreground">Deterministic scores for genre entropy and era bias.</p>
        </div>

        <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
          <div className="mb-4 rounded-2xl bg-primary/10 p-4">
            <Share2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Cinematic Share</h3>
          <p className="mt-2 text-sm text-muted-foreground">Beautiful social cards designed for your aesthetic.</p>
        </div>
      </motion.div>
    </div>
  )
}
