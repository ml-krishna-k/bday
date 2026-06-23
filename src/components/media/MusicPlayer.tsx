"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/** The song — https://youtu.be/e4E01E-Q2Gk */
const VIDEO_ID = "e4E01E-Q2Gk";
const VOLUME = 45;

/* Minimal YouTube IFrame API typings. */
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
}
interface YTNamespace {
  Player: new (
    el: string | HTMLElement,
    opts: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number }) => void;
      };
    }
  ) => YTPlayer;
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * Background music via the YouTube IFrame API. Loops the track quietly under the story.
 * Attempts to start on the first user gesture (autoplay-with-sound requires one); a small
 * always-available toggle guarantees control if the browser blocks autostart.
 */
export function MusicPlayer() {
  const playerRef = useRef<YTPlayer | null>(null);
  const startedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Load the API and create a hidden player.
  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || playerRef.current || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player("yt-music-host", {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: VIDEO_ID, // required for loop to work
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(VOLUME);
            setReady(true);
          },
          onStateChange: (e) => {
            // YT.PlayerState: 1 = playing, 2 = paused, 0 = ended
            setPlaying(e.data === 1);
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(s);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Try to start playback on the first user gesture anywhere.
  useEffect(() => {
    const tryStart = () => {
      const p = playerRef.current;
      if (!p || startedRef.current) return;
      try {
        p.unMute();
        p.setVolume(VOLUME);
        p.playVideo();
        startedRef.current = true;
      } catch {
        /* will fall back to the visible toggle */
      }
    };
    window.addEventListener("pointerdown", tryStart);
    return () => window.removeEventListener("pointerdown", tryStart);
  }, [ready]);

  const toggle = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (playing) {
        p.pauseVideo();
      } else {
        p.unMute();
        p.setVolume(VOLUME);
        p.playVideo();
        startedRef.current = true;
      }
    } catch {
      /* ignore */
    }
  }, [playing]);

  return (
    <>
      {/* Hidden audio host — kept barely-present (not display:none) so playback isn't throttled. */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: 2,
          height: 2,
          opacity: 0.001,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div id="yt-music-host" />
      </div>

      {/* Subtle, always-available music toggle. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-40 flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 bg-ink/40 backdrop-blur-sm"
      >
        <span className="flex items-end gap-[2px]" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-[2px] rounded-full bg-amber"
              animate={
                playing
                  ? { height: [4, 11, 6, 13, 4] }
                  : { height: 4 }
              }
              transition={
                playing
                  ? { duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }
                  : { duration: 0.3 }
              }
              style={{ height: 4, opacity: playing ? 0.9 : 0.4 }}
            />
          ))}
        </span>
      </button>
    </>
  );
}
