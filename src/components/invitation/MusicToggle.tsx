import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import musicAsset from "@/assets/wedding-song.mp3.asset.json";
import { cn } from "@/lib/utils";

/**
 * Floating background shehnai/wedding-music toggle.
 * Playback starts softly as soon as the invitation has been opened.
 */
export default function MusicToggle({
  start,
  pausedByModal = false,
}: {
  start: boolean;
  pausedByModal?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const userMutedRef = useRef(false);

  useEffect(() => {
    // Prefer direct static asset path /wedding-song.mp3 with fallback to asset json url
    const songUrl = "/wedding-song.mp3";
    const audio = new Audio(songUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    audio.onerror = () => {
      if (musicAsset?.url && audio.src !== musicAsset.url && musicAsset.url !== songUrl) {
        audio.src = musicAsset.url;
        audio.load();
      }
    };

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Handle start and unpausing
  useEffect(() => {
    if (!start) return;
    const audio = audioRef.current;
    if (!audio || userMutedRef.current || pausedByModal) return;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch((err) => {
        console.warn("Autoplay deferred until next touch/click interaction:", err);
        setPlaying(false);
      });
  }, [start, pausedByModal]);

  // Handle pause/resume from video modal
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !start) return;

    if (pausedByModal) {
      if (!audio.paused) {
        audio.pause();
        setPlaying(false);
      }
    } else if (!userMutedRef.current && audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }, [pausedByModal, start]);

  // Fallback: On mobile browsers, if autoplay was blocked, resume on first user interaction
  useEffect(() => {
    if (!start) return;

    const handleFirstTouch = () => {
      const audio = audioRef.current;
      if (audio && audio.paused && !userMutedRef.current && !pausedByModal) {
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstTouch, { passive: true });
    window.addEventListener("touchstart", handleFirstTouch, { passive: true });

    return () => {
      window.removeEventListener("click", handleFirstTouch);
      window.removeEventListener("touchstart", handleFirstTouch);
    };
  }, [start, pausedByModal]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userMutedRef.current = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.warn("Music play failed:", err);
        });
    } else {
      userMutedRef.current = true;
      audio.pause();
      setPlaying(false);
    }
  };

  if (!start) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute wedding music" : "Play wedding music"}
      title={playing ? "Wedding Music Playing (Tap to Mute)" : "Muted (Tap to Play)"}
      className={cn(
        "fixed right-4 top-4 z-40 flex items-center gap-2 rounded-full border border-primary/40 bg-card/90 px-3 py-2 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-secondary",
        playing && "ring-2 ring-primary/30"
      )}
    >
      {playing ? (
        <>
          <span className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span
              className="w-0.5 bg-accent rounded-full animate-bounce"
              style={{ height: "100%", animationDuration: "600ms" }}
            />
            <span
              className="w-0.5 bg-accent rounded-full animate-bounce"
              style={{ height: "60%", animationDuration: "800ms" }}
            />
            <span
              className="w-0.5 bg-accent rounded-full animate-bounce"
              style={{ height: "85%", animationDuration: "700ms" }}
            />
          </span>
          <Volume2 className="h-4 w-4 text-accent" aria-hidden="true" />
          <span className="hidden sm:inline text-[11px] font-semibold text-accent uppercase tracking-wider">
            Shehnai
          </span>
        </>
      ) : (
        <>
          <VolumeX className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="hidden sm:inline text-[11px] text-muted-foreground">
            Music Off
          </span>
        </>
      )}
    </button>
  );
}
