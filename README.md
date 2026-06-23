# Project Indumathi

A private, time-released birthday experience. Handcrafted, cinematic, deeply personal.
Built to deliver one feeling: *"...he noticed all of that."*

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · Vercel.

## Setup

```bash
npm install
cp .env.local.example .env.local   # then edit
npm run dev
```

Open http://localhost:3000.

## Configure the gift

Edit `.env.local`:

- `NEXT_PUBLIC_BIRTHDAY` — the birthday as `YYYY-MM-DD`. The experience's midnight is 00:00 of this date.
- `NEXT_PUBLIC_NAME` — her name (used at the climax).
- `CONDUCTOR_PASSCODE` — passcode for the hidden `/conductor` panel.
- `NEXT_PUBLIC_ALLOW_DEBUG` — `true` enables URL time-travel for previewing.

## How it flows (real time)

- **11:55 PM** the night before → the Summons appears.
- **12:00 AM** → the midnight crossing + the confession + the montage, then the landing.
- **8 AM → 4 PM** → one chapter unlocks each hour (the daytime memory book).
- **4 PM** → the Arrival foreshadows the real-world gift; use `/conductor` to sync it to the moment you're actually at the door.
- Any later visit → the Keepsake (the full book, hers forever).

## Previewing without waiting for midnight

With `NEXT_PUBLIC_ALLOW_DEBUG=true`:

- `/?phase=SUMMONED` — jump to the night flow.
- `/?phase=CROSSING` — the midnight bloom.
- `/?phase=CONFESSION` — the climax + montage.
- `/?phase=LANDED` — the landing.
- `/?phase=DAYTIME` — the daytime hub.
- `/?phase=KEEPSAKE` — the memory book.
- `/?simNow=2026-07-15T10:30:00` — simulate a specific moment (drives real unlock logic).

To experience the genuine sequence, set the real birthday and clear the debug flag.

## Architecture

- `src/engine/` — pure, testable logic: time math, unlock resolver, state machines, scheduler.
- `src/content/` — the locked story as data (screens, chapters, montage).
- `src/stores/` — Zustand state (time, experience, unlock, progress, settings, audio, mood).
- `src/hooks/` — time sync, midnight trigger, unlock engine, gestures, audio, etc.
- `src/components/` — the design-system primitives.
- `src/experience/` — phase orchestration + the single immersive surface.
- `app/` — routes (the surface, keepsake, conductor) and edge API routes.

Audio is asset-free (a warm Web Audio drone that follows the emotional zone). The montage is
text-led and asset-free; supply real media later via the montage manifest if desired.
