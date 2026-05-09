# 🎵 Music Personality App

A cinematic, AI-powered music analysis platform that turns your Spotify listening habits into a unique "Music Archetype."

## 🚀 Features

- **Spotify Integration**: Securely connect your Spotify account to analyze listening history.
- **Deterministic Metrics Engine**: Analyzes your top 50 artists and tracks to calculate Mainstream Score, Genre Entropy, and Era Bias.
- **Gemini AI Personalities**: Uses Google's Gemini 1.5 Flash to generate a cinematic profile, custom "Aura", and "Music DNA" breakdown.
- **Vibe Match**: Compare your music DNA with friends to see your compatibility score.
- **Explore Gallery**: Discover trending archetypes from the community.
- **Dynamic Sharing**: Generate dynamic Open Graph images and shareable public profile links.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v4, Framer Motion, shadcn/ui
- **Backend & Database**: Prisma ORM, PostgreSQL (via Supabase)
- **Authentication**: Auth.js (NextAuth v5)
- **AI**: Google Gemini 1.5 Flash API

## 🏗 Build Phases

The application was architected and deployed through the following structured phases:

1. **Phase 1: Foundation & Auth Setup** 
   - Initialized Next.js 15 App Router and Tailwind v4.
   - Integrated Auth.js (NextAuth v5) for Spotify OAuth.
2. **Phase 2: Database Architecture** 
   - Configured Prisma with PostgreSQL.
   - Designed schema for Users, Profiles, and Analytics.
3. **Phase 3: Spotify Data Extraction** 
   - Implemented server-side data fetching for Spotify Top Tracks and Artists.
   - Built the Deterministic Metrics Engine (calculating entropy, era bias, etc.).
4. **Phase 4: AI Integration** 
   - Integrated Gemini 1.5 Flash to interpret raw Spotify data into cinematic user archetypes and "Roast & Praise" summaries.
5. **Phase 5: UI/UX & Motion Design** 
   - Built interactive dashboards, profile pages, and the "Vibe Check" comparison tool using Framer Motion and shadcn/ui.
6. **Phase 6: Production Deployment** 
   - Migrated local development database to a hosted Supabase PostgreSQL cloud instance.
   - Configured environment variables and successfully deployed the application via Vercel.
