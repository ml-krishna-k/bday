import type { ChapterId, ContentChapter } from "@/types";
import { NIGHT_CHAPTERS } from "./chapters/night";
import { DAY_CHAPTERS } from "./chapters/day";

export { MONTAGE_SHOTS } from "./montage";
export {
  SUMMONS_FRAMES,
  THRESHOLD_FRAMES,
  HELD_FRAMES,
  MIDNIGHT_FRAMES,
  LANDING_FRAMES,
} from "./screens";

const ALL_CHAPTERS: ContentChapter[] = [...NIGHT_CHAPTERS, ...DAY_CHAPTERS];

const REGISTRY: Map<ChapterId, ContentChapter> = new Map(
  ALL_CHAPTERS.map((c) => [c.id, c])
);

export function getChapter(id: ChapterId): ContentChapter {
  const chapter = REGISTRY.get(id);
  if (!chapter) {
    throw new Error(`Unknown chapter id: ${id}`);
  }
  return chapter;
}

export function tryGetChapter(id: ChapterId): ContentChapter | undefined {
  return REGISTRY.get(id);
}

export { NIGHT_CHAPTERS, DAY_CHAPTERS, ALL_CHAPTERS };
