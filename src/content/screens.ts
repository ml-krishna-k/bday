import type { ContentFrame } from "@/types";
import { HER_NAME } from "@/lib/constants";

/** SUM — The opening. A quiet invitation into the story. */
export const SUMMONS_FRAMES: ContentFrame[] = [
  {
    id: "sum-1",
    lines: [{ text: "Before you do anything else —" }],
    interaction: "tap",
    mood: "night",
  },
  {
    id: "sum-2",
    lines: [{ text: "I made you something.", italic: true }, { text: "Read it slowly." }],
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

/** CROSSING — the emotional turn into the confession (a narrative bloom, not a clock). */
export const CROSSING_FRAMES: ContentFrame[] = [
  {
    id: "cross-name",
    lines: [{ text: HER_NAME, emphasis: true }],
    interaction: "auto",
    autoAdvanceMs: 4200,
    mood: "bloom",
  },
  {
    id: "cross-yours",
    lines: [{ text: "All of this is yours." }],
    interaction: "auto",
    autoAdvanceMs: 4200,
    mood: "bloom",
  },
  {
    id: "cross-hb",
    lines: [{ text: "happy birthday", italic: true }],
    interaction: "auto",
    autoAdvanceMs: 4600,
    mood: "bloom",
  },
  {
    id: "cross-bridge",
    lines: [{ text: "There's a sentence I never finished. Let me finish it now." }],
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
      lines: [{ text: "(stay as long as you like.)", italic: true }],
    },
  },
  {
    id: "lnd-5",
    lines: [{ text: `Happy birthday, ${HER_NAME}.`, italic: true }],
    interaction: "none",
    mood: "still",
  },
];
