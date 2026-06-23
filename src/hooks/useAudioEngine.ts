"use client";

import { useCallback, useEffect, useRef } from "react";
import { supportsAudioContext } from "@/lib/featureDetect";
import { useAudioStore, type AudioZone } from "@/stores/audioStore";
import { useSettingsStore } from "@/stores/settingsStore";

/**
 * Asset-free ambient audio. A pair of softly-detuned oscillators through a lowpass and
 * a slow gain produce a warm drone whose pitch/level follows the emotional zone.
 * Audio is rationed: silent zones fade to near-zero; the bloom is the warm peak.
 * Must be unlocked by a user gesture (autoplay policy).
 */
export function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const oscARef = useRef<OscillatorNode | null>(null);
  const oscBRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const zone = useAudioStore((s) => s.zone);
  const muted = useAudioStore((s) => s.muted);
  const setUnlocked = useAudioStore((s) => s.setUnlocked);
  const audioEnabled = useSettingsStore((s) => s.audioEnabled);

  const targetForZone = useCallback(
    (z: AudioZone): { freq: number; gain: number; cutoff: number } => {
      switch (z) {
        case "night":
          return { freq: 110, gain: 0.04, cutoff: 420 };
        case "warm":
          return { freq: 146.83, gain: 0.05, cutoff: 600 };
        case "valley":
          return { freq: 98, gain: 0.045, cutoff: 360 };
        case "bloom":
          return { freq: 174.61, gain: 0.07, cutoff: 900 };
        case "silent":
        default:
          return { freq: 110, gain: 0.0, cutoff: 300 };
      }
    },
    []
  );

  const unlock = useCallback(() => {
    if (!supportsAudioContext()) return;
    if (ctxRef.current) {
      void ctxRef.current.resume();
      return;
    }
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctor();

    const gain = ctx.createGain();
    gain.gain.value = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 300;

    const oscA = ctx.createOscillator();
    oscA.type = "sine";
    oscA.frequency.value = 110;

    const oscB = ctx.createOscillator();
    oscB.type = "sine";
    oscB.frequency.value = 110 * 1.003; // gentle detune for warmth

    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    oscA.start();
    oscB.start();

    ctxRef.current = ctx;
    oscARef.current = oscA;
    oscBRef.current = oscB;
    filterRef.current = filter;
    gainRef.current = gain;
    setUnlocked(true);
  }, [setUnlocked]);

  /** A short, soft tone for emotional cues (midnight, key holds). */
  const cue = useCallback(
    (freq = 220) => {
      const ctx = ctxRef.current;
      if (!ctx || muted || !audioEnabled) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.value = 0;
      o.connect(g);
      g.connect(ctx.destination);
      const t = ctx.currentTime;
      g.gain.linearRampToValueAtTime(0.05, t + 0.4);
      g.gain.linearRampToValueAtTime(0, t + 2.2);
      o.start(t);
      o.stop(t + 2.4);
    },
    [muted, audioEnabled]
  );

  // React to zone / mute / enabled changes with slow ramps.
  useEffect(() => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    const filter = filterRef.current;
    const oscA = oscARef.current;
    const oscB = oscBRef.current;
    if (!ctx || !gain || !filter || !oscA || !oscB) return;

    const target = targetForZone(zone);
    const effectiveGain = muted || !audioEnabled ? 0 : target.gain;
    const t = ctx.currentTime;
    gain.gain.cancelScheduledValues(t);
    gain.gain.linearRampToValueAtTime(effectiveGain, t + 3.2);
    filter.frequency.linearRampToValueAtTime(target.cutoff, t + 3.2);
    oscA.frequency.linearRampToValueAtTime(target.freq, t + 3.2);
    oscB.frequency.linearRampToValueAtTime(target.freq * 1.003, t + 3.2);
  }, [zone, muted, audioEnabled, targetForZone]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      try {
        oscARef.current?.stop();
        oscBRef.current?.stop();
        void ctxRef.current?.close();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return { unlock, cue };
}
