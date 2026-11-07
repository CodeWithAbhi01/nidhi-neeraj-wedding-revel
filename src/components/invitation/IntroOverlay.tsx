import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import introVideo from "@/assets/intro-video.mp4.asset.json";

interface IntroOverlayProps {
  onOpened: () => void;
  onStarted?: () => void;
}

/**
 * Royal Wedding Intro Experience (Bride's Edition: Nidhi & Neeraj):
 * - Directly renders the video from Frame 0.
 * - 100% mobile responsive: object-contain with matching sky backdrop.
 * - Safe area support for iOS Dynamic Island, notches, and Android bars.
 * - Single tap seamlessly begins playing the film with audio.
 * - Robust error and autoplay fallback with "Enter Invitation ✕" skip button.
 */
export default function IntroOverlay({
  onOpened,
  onStarted,
}: IntroOverlayProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Guarantee scroll starts at the absolute top
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  const finish = () => {
    if (leaving || gone) return;

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    import("canvas-confetti").then(({ default: confetti }) => {
      const gold = ["#e63946", "#ff8500", "#ffb703", "#d4a537", "#fdf0d5", "#ffffff"];
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 }, colors: gold });
      window.setTimeout(
        () => confetti({ particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors: gold }),
        300
      );
      window.setTimeout(
        () => confetti({ particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors: gold }),
        500
      );
    });

    onOpened();
    setLeaving(true);
    window.setTimeout(() => {
      setGone(true);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 700);
  };

  const startVideo = () => {
    if (hasStarted) return;
    setHasStarted(true);
    try {
      onStarted?.();
    } catch (e) {
      console.warn("onStarted callback error:", e);
    }

    const v = videoRef.current;
    if (v) {
      v.muted = false;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Unmuted play blocked by browser, trying muted playback:", err);
          if (v) {
            v.muted = true;
            v.play().catch((e2) => {
              console.warn("Muted playback also blocked, entering invitation directly:", e2);
              finish();
            });
          }
        });
      }
    }
  };

  if (gone) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 select-none bg-gradient-to-b from-[#8ab9e3] via-[#bde1fa] to-[#8bb9e2] h-[100dvh] w-full",
        leaving && "pointer-events-none opacity-0 scale-105"
      )}
      role="dialog"
      aria-label="Wedding invitation opening"
    >
      {/* ── THE VIDEO ITSELF (Responsive: 16:9 contained, frame 0 decoded immediately) ── */}
      <div className="relative h-full w-full flex items-center justify-center p-0 sm:p-4">
        <video
          ref={videoRef}
          src={introVideo.url}
          className="w-full h-auto max-h-[100dvh] max-w-full aspect-video object-contain drop-shadow-2xl transition-transform duration-500"
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="auto"
          onLoadedMetadata={(e) => {
            try {
              e.currentTarget.currentTime = 0.01;
            } catch {
              // Ignore seek error
            }
          }}
          onEnded={finish}
          onError={() => {
            console.warn("Intro video could not load, transitioning directly to invitation.");
            finish();
          }}
        />

        {/* ── AFTER TAP: Quick "Enter Invitation ✕" button ── */}
        {hasStarted && !leaving && (
          <div className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-50">
            <button
              type="button"
              onClick={finish}
              aria-label="Enter invitation"
              className="flex items-center gap-1.5 rounded-full border border-amber-300/50 bg-amber-950/80 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-100 shadow-2xl backdrop-blur-md transition hover:bg-amber-900 hover:scale-105 active:scale-95"
            >
              <span>Enter Invitation ✕</span>
            </button>
          </div>
        )}

        {/* ── BEFORE TAP: Elegant Wedding Title & Central Responsive Tap Trigger ── */}
        {!hasStarted && (
          <div
            onClick={startVideo}
            className="absolute inset-0 z-20 flex flex-col items-center justify-between px-4 py-4 sm:p-10 cursor-pointer bg-black/10 backdrop-blur-[0.5px] transition-all hover:bg-black/5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          >
            {/* Top Invocation Header */}
            <div className="text-center pt-1 sm:pt-4">
              <p className="font-serif text-xs sm:text-base tracking-[0.25em] uppercase font-bold text-amber-950 drop-shadow-md">
                ॥ श्री गणेशाय नमः ॥
              </p>
              <p className="mt-1 font-display text-2xl sm:text-4xl font-extrabold text-[#2a170d] tracking-wider drop-shadow-md">
                Shubh Vivahotsav
              </p>
            </div>

            {/* Central Tap Button Over the Envelope */}
            <div className="flex flex-col items-center gap-2.5 sm:gap-3 my-auto pointer-events-auto max-w-[92vw]">
              <button
                type="button"
                onClick={startVideo}
                className="group flex items-center gap-2.5 sm:gap-3 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 px-6 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-base font-extrabold uppercase tracking-widest text-amber-100 shadow-[0_20px_45px_rgba(30,15,5,0.5)] ring-4 ring-amber-300/70 transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-amber-300" />
                <span>Tap to Open Invitation</span>
              </button>
              <span className="rounded-full bg-black/50 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-lg backdrop-blur-md text-center">
                ✦ Tap anywhere to play film with Shehnai ✦
              </span>
            </div>

            {/* Bottom Venue & Couple Note */}
            <div className="text-center pb-1 sm:pb-4">
              <p className="font-display text-lg sm:text-2xl font-extrabold text-[#2a170d] drop-shadow-md">
                Nidhi &amp; Neeraj
              </p>
              <p className="text-[11px] sm:text-sm font-bold text-amber-950/90 drop-shadow-sm">
                Sunday, 6 December 2026 · Sumangalam Resort, Gorakhpur
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
