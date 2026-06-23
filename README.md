# Project Indumathi — Version 1

A private birthday experience. Handcrafted, cinematic, deeply personal.
One continuous story you can open and complete **immediately** — no clock, no waiting.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · Vercel.

## Setup

```bash
npm install
cp .env.local.example .env.local   # then edit NEXT_PUBLIC_NAME
npm run dev
```

Open http://localhost:3000 — it begins right away.

## The flow (instant, no time gating)

Opening → Threshold → five chapters
(The Girl I Never Spoke To · The Bus · The Things You Think I Don't Notice ·
The Things I Never Explain Properly · The Future) → the bloom (a narrative turn) →
The Truth (the confession) → the Montage → the final message.

Tap anywhere to advance. Press-and-hold the bold lines. Progress is saved locally,
so a return visit lands gently on the ending (with a quiet "read it again").

## Preview a specific beat

With `NEXT_PUBLIC_ALLOW_DEBUG=true`:

- `/?phase=STORY` — from the opening
- `/?phase=CROSSING` — the bloom
- `/?phase=CONFESSION` — the climax + montage
- `/?phase=LANDED` — the ending

## Configure

`.env.local`:

- `NEXT_PUBLIC_NAME` — her name (used at the climax).
- `NEXT_PUBLIC_ALLOW_DEBUG` — enable the `?phase=` preview override.

## Deploy to Vercel

Push to a repo → import in Vercel → set `NEXT_PUBLIC_NAME` → deploy. No other config needed.

## Architecture (V1)

- `src/engine/experienceMachine.ts` — pure phase transitions (STORY → CROSSING → CONFESSION → LANDED).
- `src/content/` — the locked story as data (opening/threshold/crossing/landing + chapters + montage).
- `src/stores/` — Zustand state (experience, progress [persisted], settings, audio, mood).
- `src/hooks/` — gestures (tap/hold/linger), reduced-motion, haptics, audio.
- `src/components/` — the design-system primitives.
- `src/experience/` — phase orchestration + the single immersive surface.
- `app/` — the surface route and an edge health route.

Audio is asset-free (a warm Web Audio drone that follows the emotional zone). The montage
is text-led and asset-free; supply real media later via the montage manifest if desired.
