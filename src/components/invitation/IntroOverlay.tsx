import { useEffect, useState } from "react";
import { MailOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import envelopeCover from "@/assets/envelope-cover.jpg";

interface IntroOverlayProps {
  onOpened: () => void;
  onStarted?: () => void;
}

/**
 * Royal Wedding Envelope Opening Experience:
 * - Shows the luxury pink floral embossed envelope with N&N seal.
 * - Single tap seamlessly unseals and animates open with flower petal confetti.
 * - Triggers instant audio playback and smooth fade-out into the invitation.
 */
export default function IntroOverlay({
  onOpened,
  onStarted,
}: IntroOverlayProps) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

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

  const handleOpen = () => {
    if (opening || gone) return;
    setOpening(true);

    try {
      onStarted?.();
    } catch {
      // Ignore
    }

    // Trigger celebratory flower and gold confetti shower
    import("canvas-confetti").then(({ default: confetti }) => {
      const colors = ["#e63946", "#ff8500", "#ffb703", "#d4a537", "#fdf0d5", "#ffffff", "#ff70a6"];
      confetti({
        particleCount: 130,
        spread: 100,
        origin: { y: 0.55 },
        colors,
      });
      window.setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0.1, y: 0.65 },
          colors,
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 0.9, y: 0.65 },
          colors,
        });
      }, 200);
    });

    onOpened();

    // Smooth exit animation
    window.setTimeout(() => {
      setGone(true);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, 600);
  };

  if (gone) return null;

  return (
    <div
      onClick={handleOpen}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden transition-all duration-700 select-none bg-[#fde0e9] cursor-pointer",
        "pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] px-4",
        opening && "pointer-events-none opacity-0 scale-105"
      )}
      role="dialog"
      aria-label="Wedding invitation envelope"
    >
      {/* ── Top Auspicious Inscription ── */}
      <div className="text-center pt-2 sm:pt-4 transition-transform duration-500">
        <p className="font-serif text-xs sm:text-sm tracking-[0.28em] uppercase font-bold text-[#8b1e2b] drop-shadow-xs">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <p className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2c1015] tracking-wide drop-shadow-xs">
          Nidhi weds Neeraj
        </p>
        <div className="my-1.5 flex items-center justify-center gap-2 w-24 mx-auto" aria-hidden="true">
          <span className="h-px flex-1 bg-[#8b1e2b]/40" />
          <Sparkles className="h-3 w-3 text-[#8b1e2b]" />
          <span className="h-px flex-1 bg-[#8b1e2b]/40" />
        </div>
      </div>

      {/* ── Center Envelope Image with Soft Floating Animation ── */}
      <div className="relative my-auto flex items-center justify-center max-w-full px-2">
        <div
          className={cn(
            "relative max-w-xs sm:max-w-md md:max-w-lg w-full transition-all duration-500 ease-out",
            opening ? "scale-110 rotate-1 shadow-2xl" : "hover:scale-[1.02]"
          )}
        >
          <img
            src={envelopeCover}
            alt="Royal Pink Wedding Invitation Envelope with N&N Seal"
            className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_20px_40px_rgba(139,30,43,0.22)]"
          />
        </div>
      </div>

      {/* ── Bottom Prompt: Tap to Open ── */}
      <div className="text-center pb-2 sm:pb-4 flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-2.5 rounded-full bg-[#8b1e2b] px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-xl ring-4 ring-[#8b1e2b]/20 transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse">
          <MailOpen className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-amber-200" />
          <span>Tap to Open</span>
        </div>
        <p className="text-[11px] sm:text-xs font-serif font-medium text-[#8b1e2b]/80 tracking-wider">
          Tap anywhere to open wedding invitation
        </p>
      </div>
    </div>
  );
}
