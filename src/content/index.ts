import type { ChapterId, ContentChapter } from "@/types";
import { NIGHT_CHAPTERS } from "./chapters/night";

export { MONTAGE_SHOTS } from "./montage";
export {
  SUMMONS_FRAMES,
  THRESHOLD_FRAMES,
  CROSSING_FRAMES,
  LANDING_FRAMES,
} from "./screens";

const ALL_CHAPTERS: ContentChapter[] = [...NIGHT_CHAPTERS];

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

export { NIGHT_CHAPTERS, ALL_CHAPTERS };
