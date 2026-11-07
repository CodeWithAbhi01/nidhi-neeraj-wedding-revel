import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TARGET = new Date("2026-12-06T18:00:00+05:30").getTime();

function tile(value: string, label: string) {
  return (
    <div
      key={label}
      className="flex w-[4.4rem] flex-col items-center rounded-xl border border-primary/35 bg-card py-3 shadow-md sm:w-20 sm:py-4"
    >
      <span className="text-3xl font-semibold tabular-nums text-accent sm:text-4xl">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = now === null ? null : Math.max(0, TARGET - now);
  const d = diff === null ? "--" : String(Math.floor(diff / 86_400_000));
  const h = diff === null ? "--" : String(Math.floor(diff / 3_600_000) % 24).padStart(2, "0");
  const m = diff === null ? "--" : String(Math.floor(diff / 60_000) % 60).padStart(2, "0");
  const s = diff === null ? "--" : String(Math.floor(diff / 1000) % 60).padStart(2, "0");

  return (
    <div className={cn("flex items-start justify-center gap-3 sm:gap-4")}>
      {tile(d, "Days")}
      {tile(h, "Hours")}
      {tile(m, "Mins")}
      {tile(s, "Secs")}
    </div>
  );
}
