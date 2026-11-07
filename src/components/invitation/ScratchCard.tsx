import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sparkles, Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Luxury Metallic Gold Scratch-to-Reveal Card:
 * - Scratches smoothly under pointer/finger with larger, responsive touch radius
 * - Spawns real-time floating flower petal particles as you scratch!
 * - When cleared (or tapped), triggers celebratory Pushp Varsha (flower shower)
 * - Includes a 1-tap "Scratch to Reveal 🌸" helper for effortless mobile discovery
 */
export default function ScratchCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const meta = useRef({ lastCheck: 0, done: false, strokeCount: 0 });

  // Fire celebratory flower shower (roses, marigolds, gold flakes)
  const fireFlowerShower = () => {
    import("canvas-confetti").then(({ default: confetti }) => {
      const petals = ["#e63946", "#ff8500", "#ffb703", "#d4a537", "#fdf0d5", "#ffffff"];
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: petals,
        ticks: 200,
        gravity: 0.85,
      });
      window.setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.65 },
          colors: petals,
        });
      }, 200);
      window.setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.65 },
          colors: petals,
        });
      }, 350);
    });
  };

  const triggerReveal = () => {
    if (meta.current.done) return;
    meta.current.done = true;
    setRevealed(true);
    fireFlowerShower();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    // Luxurious 24K Molten Gold Gradient
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#f7df94");
    g.addColorStop(0.2, "#cf9a2c");
    g.addColorStop(0.42, "#faebba");
    g.addColorStop(0.65, "#b3801b");
    g.addColorStop(0.85, "#ebcf7c");
    g.addColorStop(1, "#c99e30");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Diagonal Shimmer Highlights
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 5;
    for (let x = -h; x < w + h; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }

    // Elegant Gold Foil Border
    ctx.strokeStyle = "rgba(120, 75, 10, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // Decorative Floral Corner Accents
    ctx.fillStyle = "rgba(100, 60, 5, 0.45)";
    ctx.font = "bold 13px serif";
    ctx.fillText("🌸", 18, 26);
    ctx.fillText("🌸", w - 30, 26);
    ctx.fillText("🌸", 18, h - 16);
    ctx.fillText("🌸", w - 30, h - 16);

    // Center Gold Stamped Text
    ctx.fillStyle = "rgba(70, 38, 2, 0.75)";
    ctx.font = "bold 15px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch or Tap to Reveal ✦", w / 2, h / 2 - 2);

    ctx.fillStyle = "rgba(110, 65, 15, 0.6)";
    ctx.font = "italic 11px 'Playfair Display', Georgia, serif";
    ctx.fillText("🌸 With Fragrant Blessings 🌸", w / 2, h / 2 + 18);
  }, []);

  // Check how much foil has been cleared
  const checkCleared = () => {
    const canvas = canvasRef.current;
    if (!canvas || meta.current.done) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let transparent = 0;
    let total = 0;
    // Fast sampling
    for (let i = 3; i < data.length; i += 48) {
      total++;
      if (data[i] === 0) transparent++;
    }
    // Responsive threshold: 30% cleared triggers celebration!
    if (total > 0 && transparent / total > 0.3) {
      triggerReveal();
    }
  };

  // Erase with generous touch radius and flower spark feedback
  const erase = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (meta.current.done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    // Generous, smooth 38px erase radius for easy scratching on all devices
    ctx.arc(x, y, 38, 0, Math.PI * 2);
    ctx.fill();

    meta.current.strokeCount++;

    // Trigger flower spark on scratch
    if (meta.current.strokeCount % 12 === 0) {
      import("canvas-confetti").then(({ default: confetti }) => {
        const clientOriginX = e.clientX / window.innerWidth;
        const clientOriginY = e.clientY / window.innerHeight;
        confetti({
          particleCount: 8,
          spread: 45,
          startVelocity: 15,
          ticks: 60,
          origin: { x: clientOriginX, y: clientOriginY },
          colors: ["#ffb703", "#e63946", "#ffd166"],
          gravity: 0.9,
        });
      });
    }

    const ts = Date.now();
    if (ts - meta.current.lastCheck > 160) {
      meta.current.lastCheck = ts;
      checkCleared();
    }
  };

  return (
    <div ref={containerRef} className={cn("relative select-none group", className)}>
      {children}
      <canvas
        ref={canvasRef}
        className={cn(
          "foil-sheen absolute inset-0 h-full w-full touch-none rounded-2xl cursor-pointer transition-opacity duration-700 shadow-xl",
          revealed && "pointer-events-none opacity-0"
        )}
        onPointerDown={(e) => {
          e.preventDefault();
          e.currentTarget.setPointerCapture(e.pointerId);
          erase(e);
        }}
        onPointerMove={erase}
        onClick={() => {
          // Direct tap instantly triggers reveal with celebratory flower shower!
          triggerReveal();
        }}
      />

      {/* 1-Tap Reveal Button Overlay */}
      {!revealed && (
        <button
          type="button"
          onClick={triggerReveal}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-card/95 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent shadow-md backdrop-blur-md transition hover:scale-105 hover:bg-secondary"
        >
          <Flower2 className="h-3 w-3 text-amber-600 animate-spin" style={{ animationDuration: "8s" }} />
          <span>Tap to Reveal with Flowers</span>
          <Sparkles className="h-3 w-3 text-primary" />
        </button>
      )}
    </div>
  );
}
