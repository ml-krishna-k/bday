import type { ContentFrame } from "@/types";
import { HER_NAME } from "@/lib/constants";

/** SUM — The Summons (11:55 PM). Turn a notification into a ritual. */
export const SUMMONS_FRAMES: ContentFrame[] = [
  {
    id: "sum-1",
    lines: [{ text: "Don't sleep yet." }],
    interaction: "tap",
    mood: "night",
  },
  {
    id: "sum-2",
    lines: [{ text: "Five minutes.", italic: true }, { text: "Stay with me." }],
    interaction: "tap",
    mood: "night",
  },
];

/** THR — The Threshold. Her own question, pointed back at her. Hold to begin. */
export const THRESHOLD_FRAMES: ContentFrame[] = [
  {
    id: "thr-1",
    lines: [{ text: "You always ask me where I am.", italic: true }],
    interaction: "tap",
    mood: "night",
  },
  {
    id: "thr-2",
    lines: [
      { text: "Tonight, I'm asking you." },
      { text: `Where are you, ${HER_NAME}?`, italic: true, emphasis: true },
    ],
    interaction: "hold",
    holdLabel: "hold to begin",
    dwellMs: 2200,
    mood: "night",
  },
];

/** HELD — The Held Breath. The designed waiting state before midnight. */
export const HELD_FRAMES: ContentFrame[] = [
  {
    id: "held-1",
    lines: [{ text: "almost.", italic: true }, { text: "stay with me." }],
    interaction: "none",
    mood: "still",
  },
];

/** MID — Midnight crossing copy (rendered with the bloom). */
export const MIDNIGHT_FRAMES: ContentFrame[] = [
  {
    id: "mid-name",
    lines: [{ text: HER_NAME, emphasis: true }],
    interaction: "auto",
    autoAdvanceMs: 4200,
    mood: "bloom",
  },
  {
    id: "mid-yours",
    lines: [{ text: "It's yours now. The whole day." }],
    interaction: "auto",
    autoAdvanceMs: 4200,
    mood: "bloom",
  },
  {
    id: "mid-hb",
    lines: [{ text: "happy birthday", italic: true }],
    interaction: "auto",
    autoAdvanceMs: 4600,
    mood: "bloom",
  },
  {
    id: "mid-bridge",
    lines: [{ text: "I've been waiting for midnight to finish a sentence." }],
    interaction: "auto",
    autoAdvanceMs: 4200,
    mood: "warm",
  },
];

/** LND — The Landing. Catch her, send her to sleep loved. */
export const LANDING_FRAMES: ContentFrame[] = [
  {
    id: "lnd-1",
    lines: [{ text: "That's everything I never said." }],
    interaction: "tap",
    mood: "warm",
  },
  {
    id: "lnd-2",
    lines: [
      { text: "You can stay here as long as you want." },
      { text: "Nothing's going anywhere.", italic: true },
    ],
    interaction: "tap",
    mood: "warm",
  },
  {
    id: "lnd-3",
    lines: [{ text: "And the next time you ask where I am —" }],
    interaction: "tap",
    mood: "warm",
  },
  {
    id: "lnd-4",
    lines: [
      {
        text: "— you already know. I'm wherever your future is.",
        italic: true,
        emphasis: true,
      },
    ],
    interaction: "tap",
    dwellMs: 2600,
    mood: "warm",
    discover: {
      lines: [{ text: "(there's more. all day long.)", italic: true }],
    },
  },
  {
    id: "lnd-5",
    lines: [{ text: `Goodnight, ${HER_NAME}. Happy birthday.`, italic: true }],
    interaction: "none",
    mood: "still",
  },
];
