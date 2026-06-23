import type { ContentChapter } from "@/types";
import { HER_NAME } from "@/lib/constants";

/** Chapter 1 — The Girl I Never Spoke To. */
export const NC1: ContentChapter = {
  id: "nc1",
  title: "The Girl I Never Spoke To",
  phase: "night",
  frames: [
    { id: "nc1-1", lines: [{ text: "We went to the same school." }], interaction: "tap", mood: "memory" },
    { id: "nc1-2", lines: [{ text: "For years, we breathed the same hallways." }], interaction: "tap", mood: "memory" },
    {
      id: "nc1-3",
      lines: [{ text: "And never said a single word to each other." }],
      interaction: "tap",
      dwellMs: 2200,
      mood: "memory",
    },
    { id: "nc1-4", lines: [{ text: "You were just a girl I didn't know yet." }], interaction: "tap", mood: "memory" },
    {
      id: "nc1-5",
      lines: [{ text: "We almost missed each other entirely.", italic: true, emphasis: true }],
      interaction: "hold",
      holdLabel: "hold to continue",
      dwellMs: 2400,
      mood: "memory",
    },
  ],
};

/** Chapter 2 — The Bus. The origin question becomes everything. */
export const NC2: ContentChapter = {
  id: "nc2",
  title: "The Bus",
  phase: "night",
  frames: [
    { id: "nc2-1", lines: [{ text: "Then, college. The same one." }], interaction: "tap", mood: "memory" },
    { id: "nc2-2", lines: [{ text: "Like the timing had been waiting for us." }], interaction: "tap", mood: "warm" },
    { id: "nc2-3", lines: [{ text: "And we finally started talking." }], interaction: "tap", mood: "warm" },
    { id: "nc2-4", lines: [{ text: "About nothing, mostly. About one thing, constantly —" }], interaction: "tap", mood: "warm" },
    {
      id: "nc2-5",
      lines: [{ text: "“Where is the bus?”", italic: true }],
      interaction: "discover",
      discover: { lines: [{ text: "a hundred times. a thousand.", italic: true }] },
      mood: "warm",
    },
    { id: "nc2-6", lines: [{ text: "Until one day, the question quietly changed." }], interaction: "tap", mood: "warm" },
    {
      id: "nc2-7",
      lines: [{ text: "“Where are you?”", italic: true, emphasis: true }],
      interaction: "hold",
      holdLabel: "hold to continue",
      morph: { from: "“Where is the bus?”", to: "“Where are you?”" },
      dwellMs: 2400,
      mood: "warm",
    },
  ],
};

/** Chapter 3 — The Things You Think I Don't Notice. */
export const NC3: ContentChapter = {
  id: "nc3",
  title: "The Things You Think I Don't Notice",
  phase: "night",
  frames: [
    { id: "nc3-1", lines: [{ text: "You think I don't notice. So let me show you." }], interaction: "tap", mood: "warm" },
    { id: "nc3-2", lines: [{ text: "You ask if I've eaten — before you ask anything else." }], interaction: "tap", mood: "warm" },
    { id: "nc3-3", lines: [{ text: "You ask if I've slept. You can tell when I'm lying about it." }], interaction: "tap", mood: "warm" },
    { id: "nc3-4", lines: [{ text: "You check if I finished my work, like my deadlines are yours too." }], interaction: "tap", mood: "warm" },
    { id: "nc3-5", lines: [{ text: "You worry about me more than I worry about myself." }], interaction: "tap", mood: "warm" },
    {
      id: "nc3-6",
      lines: [{ text: "You take care of me even when you're angry at me.", emphasis: true }],
      interaction: "hold",
      holdLabel: "hold to keep this",
      dwellMs: 2400,
      mood: "warm",
    },
    {
      id: "nc3-7",
      lines: [{ text: "None of that was nagging. I always knew it was love.", italic: true }],
      interaction: "tap",
      discover: { lines: [{ text: "and I noticed every single time.", italic: true }] },
      mood: "warm",
    },
  ],
};

/** Chapter 4 — The Things I Never Explain Properly. (The valley.) */
export const NC4: ContentChapter = {
  id: "nc4",
  title: "The Things I Never Explain Properly",
  phase: "night",
  frames: [
    { id: "nc4-1", lines: [{ text: "Now the part I've never said well." }], interaction: "tap", mood: "valley" },
    { id: "nc4-2", lines: [{ text: "When you're happy, I'm “Hello Cutie.”", italic: true }], interaction: "tap", mood: "valley" },
    { id: "nc4-3", lines: [{ text: "When you're angry, I'm “Idiot.”", italic: true }], interaction: "tap", mood: "valley" },
    { id: "nc4-4", lines: [{ text: "You say “I hate you,” and cut the call." }], interaction: "tap", mood: "valley" },
    { id: "nc4-5", lines: [{ text: "And then you wait. Secretly. For me to call back." }], interaction: "tap", dwellMs: 2200, mood: "valley" },
    {
      id: "nc4-6",
      lines: [{ text: "I always knew you were waiting. I always knew you didn't mean it.", emphasis: true }],
      interaction: "hold",
      holdLabel: "hold to keep this",
      dwellMs: 2600,
      mood: "valley",
    },
    { id: "nc4-7", lines: [{ text: "I struggle to say what I feel. I message less than you deserve." }], interaction: "tap", mood: "valley" },
    {
      id: "nc4-8",
      lines: [
        { text: "You forgave me for both." },
        { text: "I never told you what that forgiveness meant.", italic: true },
      ],
      interaction: "tap",
      mood: "valley",
    },
  ],
};

/** Chapter 5 — The Future (seed). Ends on an unfinished sentence. */
export const NC5: ContentChapter = {
  id: "nc5",
  title: "The Future",
  phase: "night",
  frames: [
    { id: "nc5-1", lines: [{ text: "You worry about our future. About placements. About whether you're enough." }], interaction: "tap", mood: "rise" },
    { id: "nc5-2", lines: [{ text: "You are stronger than you think. More capable than you let yourself believe." }], interaction: "tap", mood: "rise" },
    {
      id: "nc5-3",
      lines: [{ text: "I'm not saying it to comfort you. I've watched it be true.", emphasis: true }],
      interaction: "hold",
      holdLabel: "hold to keep this",
      dwellMs: 2400,
      mood: "rise",
    },
    { id: "nc5-4", lines: [{ text: "You ask where this is going." }], interaction: "tap", mood: "rise" },
    {
      id: "nc5-5",
      lines: [{ text: "So here's what I never managed to say —", italic: true }],
      interaction: "tap",
      dwellMs: 2600,
      mood: "still",
    },
  ],
};

/** Chapter 7 — The Truth (the confession / climax). */
export const NC7: ContentChapter = {
  id: "nc7",
  title: "The Truth",
  phase: "night",
  frames: [
    { id: "nc7-1", lines: [{ text: "You always felt I didn't give you enough time." }], interaction: "tap", mood: "still" },
    {
      id: "nc7-2",
      lines: [{ text: "You were right to feel that. I'm sorry." }],
      interaction: "hold",
      holdLabel: "hold",
      dwellMs: 2600,
      mood: "still",
    },
    { id: "nc7-3", lines: [{ text: "The problem was never that I didn't notice." }], interaction: "tap", dwellMs: 2200, mood: "still" },
    {
      id: "nc7-4",
      lines: [{ text: "The problem was that I didn't say it.", emphasis: true }],
      interaction: "tap",
      dwellMs: 3400,
      mood: "still",
    },
    { id: "nc7-5", lines: [{ text: "So — where am I?" }], interaction: "tap", mood: "warm" },
    {
      id: "nc7-6",
      lines: [{ text: "I'm in every future I've ever imagined. You were already in all of them." }],
      interaction: "tap",
      mood: "warm",
    },
    {
      id: "nc7-7",
      lines: [
        { text: `${HER_NAME} — you were never part of my plan.` },
        { text: "You were the plan.", italic: true, emphasis: true },
      ],
      interaction: "hold",
      holdLabel: "press and hold to keep this",
      dwellMs: 3600,
      mood: "warm",
    },
  ],
};

export const NIGHT_CHAPTERS: ContentChapter[] = [NC1, NC2, NC3, NC4, NC5, NC7];
