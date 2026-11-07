import { useState } from "react";
import { Calendar, CalendarPlus, ChevronRight, ExternalLink, MapPin, Sparkles, X } from "lucide-react";
import Reveal from "./Reveal";
import ramayanImg from "@/assets/card-ramayan.png.asset.json";
import haldiImg from "@/assets/card-haldi.png.asset.json";
import pherasImg from "@/assets/card-pheras.png.asset.json";
import vidaaiImg from "@/assets/card-vidaai.png.asset.json";

export type Ceremony = {
  id: string;
  name: string;
  devanagariTag: string;
  date: string;
  time: string;
  subTime?: string;
  venue: string;
  addressShort: string;
  details?: string;
  image: string;
  mapsUrl: string;
  calendarUrl: string;
  overlayClasses: string;
};

const MAPS_URL = "https://goo.gl/maps/YNSL899qGM232YQ28?g_st=awb";

const CEREMONIES: Ceremony[] = [
  {
    id: "mehndi",
    name: "Shubh Mehndi Ceremony",
    devanagariTag: "॥ शुभ मेहंदी ॥",
    date: "Friday, 4 December 2026",
    time: "5:00 PM onwards",
    venue: "Bride's Residence (Home)",
    addressShort: "Gorakhpur, Uttar Pradesh",
    details:
      "Intricate henna adornments, joyful sangeet melodies, and festive blessings for our beloved bride Nidhi.",
    image: ramayanImg.url,
    mapsUrl: MAPS_URL,
    calendarUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shubh+Mehndi+Ceremony+-+Nidhi+weds+Neeraj&dates=20261204T170000/20261204T220000&details=Shubh+Mehndi+Ceremony+at+Bride%27s+Residence.+Celebrations+begin+at+5:00+PM.&location=Bride%27s+Residence,+Gorakhpur",
    overlayClasses: "inset-x-[6%] sm:inset-x-[8%] top-[40%] bottom-[25%]",
  },
  {
    id: "haldi",
    name: "Auspicious Haldi Ceremony",
    devanagariTag: "॥ शुभ हल्दी ॥",
    date: "Sunday, 6 December 2026",
    time: "Morning, 10:00 AM onwards",
    venue: "Sumangalam Resort",
    addressShort: "Transport Nagar, Pathra Tola, Shivpuri New Colony, Gorakhpur",
    details: "Sacred turmeric blessings, traditional music, and joyful pre-wedding celebrations.",
    image: haldiImg.url,
    mapsUrl: MAPS_URL,
    calendarUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Auspicious+Haldi+Ceremony+-+Nidhi+weds+Neeraj&dates=20261206T100000/20261206T140000&details=Auspicious+Haldi+Ceremony+at+Sumangalam+Resort.&location=Sumangalam+Resort,+Transport+Nagar,+Pathra+Tola,+Shivpuri+New+Colony,+Gorakhpur",
    overlayClasses: "inset-x-[8%] sm:inset-x-[10%] top-[23%] bottom-[27%]",
  },
  {
    id: "pheras",
    name: "Wedding Ceremony & Sacred Pheras",
    devanagariTag: "॥ शुभ विवाह ॥",
    date: "Sunday, 6 December 2026",
    time: "Evening & Night (Shubh Lagna)",
    subTime: "Baarat Reception & Varmala: 7:00 PM onwards",
    venue: "Sumangalam Resort",
    addressShort: "Transport Nagar, Pathra Tola, Shivpuri New Colony, Gorakhpur",
    details: "Grand reception of the Baarat, auspicious Varmala, and sacred nuptial vows around the holy agni.",
    image: pherasImg.url,
    mapsUrl: MAPS_URL,
    calendarUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Ceremony+%26+Sacred+Pheras+-+Nidhi+weds+Neeraj&dates=20261206T190000/20261207T040000&details=Wedding+ceremony+and+sacred+pheras+of+Nidhi+and+Neeraj.&location=Sumangalam+Resort,+Transport+Nagar,+Pathra+Tola,+Shivpuri+New+Colony,+Gorakhpur",
    overlayClasses: "inset-x-[8%] sm:inset-x-[10%] top-[23%] bottom-[49%]",
  },
  {
    id: "vidaai",
    name: "Milni and Bidaai Ceremony",
    devanagariTag: "॥ मिलनी एवं विदाई ॥",
    date: "Monday, 7 December 2026",
    time: "Early morning",
    venue: "Sumangalam Resort",
    addressShort: "Gorakhpur, Uttar Pradesh",
    details: "Heartfelt Milni followed by loving blessings and emotional farewell as Nidhi embarks on her new journey with Neeraj.",
    image: vidaaiImg.url,
    mapsUrl: MAPS_URL,
    calendarUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Milni+and+Bidaai+-+Nidhi+weds+Neeraj&dates=20261207T070000/20261207T110000&details=Milni+and+Bidaai+ceremony+at+Sumangalam+Resort.&location=Sumangalam+Resort,+Gorakhpur",
    overlayClasses: "inset-x-[10%] sm:inset-x-[12%] top-[19%] bottom-[33%]",
  },
];

function CeremonyCard({
  c,
  index,
  onOpenModal,
}: {
  c: Ceremony;
  index: number;
  onOpenModal: (c: Ceremony) => void;
}) {
  return (
    <Reveal delay={(index % 2) * 120}>
      <div className="group flex flex-col h-full rounded-2xl border border-primary/40 bg-card shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-primary/60">
        {/* ── CARD ARTWORK: Uniform aspect-[9/16] ── */}
        <div
          onClick={() => onOpenModal(c)}
          className="relative aspect-[9/16] w-full overflow-hidden rounded-t-2xl bg-secondary/30 cursor-pointer"
        >
          <img
            src={c.image}
            alt={c.name}
            loading="lazy"
            width={900}
            height={1600}
            className="w-full h-full object-cover object-center block transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Precise Overlay in designated artwork space */}
          <div
            className={`absolute ${c.overlayClasses} flex flex-col items-center justify-center text-center p-2 sm:p-3 select-none`}
          >
            {/* Auspicious Tag */}
            <p className="font-serif text-[11px] sm:text-xs md:text-sm tracking-[0.25em] text-accent font-bold uppercase drop-shadow-xs">
              {c.devanagariTag}
            </p>

            {/* Ceremony Title */}
            <h3 className="mt-1 font-display text-lg sm:text-xl md:text-2xl leading-tight text-[#3d0d14] dark:text-amber-100 font-extrabold tracking-wide drop-shadow-xs">
              {c.name}
            </h3>

            {/* Golden Divider */}
            <div className="my-1.5 sm:my-2 flex items-center justify-center gap-2 w-full max-w-[120px]" aria-hidden="true">
              <span className="h-px flex-1 bg-primary/70" />
              <Sparkles className="h-2.5 w-2.5 text-primary shrink-0" />
              <span className="h-px flex-1 bg-primary/70" />
            </div>

            {/* Date */}
            <p className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-wide text-accent drop-shadow-xs">
              {c.date}
            </p>

            {/* Time */}
            <p className="mt-0.5 font-serif text-[11px] sm:text-xs md:text-sm font-bold text-foreground">
              {c.time}
            </p>
            {c.subTime && (
              <p className="font-serif text-[10px] sm:text-[11px] md:text-xs font-semibold text-foreground/85">
                {c.subTime}
              </p>
            )}

            {/* Venue */}
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-foreground/90">
              <MapPin className="h-3 w-3 text-primary shrink-0" />
              <span>{c.venue}</span>
            </p>
          </div>
        </div>

        {/* ── INTERACTIVE ACTION FOOTER ── */}
        <div className="mt-auto border-t border-primary/20 bg-secondary/50 p-3 sm:p-4 rounded-b-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Add to Calendar */}
            <a
              href={c.calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm transition hover:bg-primary hover:text-primary-foreground hover:scale-102"
              title="Add this ceremony to Google Calendar"
            >
              <CalendarPlus className="h-3.5 w-3.5 text-accent" />
              <span>Add to Calendar</span>
            </a>

            {/* Get Directions */}
            <a
              href={c.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm transition hover:bg-primary hover:text-primary-foreground hover:scale-102"
              title="Open venue location in Google Maps"
            >
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>Directions</span>
            </a>

            {/* Details / Zoom button */}
            <button
              type="button"
              onClick={() => onOpenModal(c)}
              className="inline-flex items-center gap-1 text-xs font-bold text-accent transition hover:underline"
            >
              <span>View Details</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function CeremonySection() {
  const [activeModal, setActiveModal] = useState<Ceremony | null>(null);

  return (
    <section className="px-4 sm:px-6 py-12 max-w-6xl mx-auto">
      <Reveal>
        <div className="text-center mb-10">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-accent font-bold">
            ॥ मांगलिक कार्यक्रम ॥
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-bold tracking-wide">
            Wedding Celebrations
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-3 w-40" aria-hidden="true">
            <span className="h-px flex-1 bg-primary/70" />
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="h-px flex-1 bg-primary/70" />
          </div>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-foreground/85 font-serif">
            With the divine blessings of Lord Ganesha, we invite you to join us across these auspicious ceremonies
            as Nidhi &amp; Neeraj embark upon their sacred journey.
          </p>
        </div>
      </Reveal>

      {/* Grid: 2 columns on tablet/desktop, 1 column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {CEREMONIES.map((c, index) => (
          <CeremonyCard
            key={c.id}
            c={c}
            index={index}
            onOpenModal={(selected) => setActiveModal(selected)}
          />
        ))}
      </div>

      {/* ── CEREMONY DETAIL POPUP MODAL ── */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-label={activeModal.name}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-primary/50 bg-card p-6 sm:p-8 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 rounded-full border border-primary/30 p-2 text-foreground/70 hover:bg-secondary hover:text-foreground transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="font-serif text-xs uppercase tracking-[0.3em] text-accent font-bold">
              {activeModal.devanagariTag}
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl text-foreground font-bold tracking-wide">
              {activeModal.name}
            </h3>

            <div className="my-3 flex items-center justify-center gap-2 w-32 mx-auto" aria-hidden="true">
              <span className="h-px flex-1 bg-primary/70" />
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="h-px flex-1 bg-primary/70" />
            </div>

            <p className="font-serif text-base sm:text-lg font-bold text-accent">
              {activeModal.date}
            </p>
            <p className="mt-1 font-serif text-sm sm:text-base font-semibold text-foreground">
              {activeModal.time}
            </p>
            {activeModal.subTime && (
              <p className="font-serif text-xs sm:text-sm font-medium text-foreground/80">
                {activeModal.subTime}
              </p>
            )}

            <div className="mt-4 rounded-xl border border-primary/25 bg-secondary/50 p-4">
              <p className="flex items-center justify-center gap-1.5 text-sm sm:text-base font-bold text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {activeModal.venue}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                {activeModal.addressShort}
              </p>
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-foreground/85 font-serif italic">
              "{activeModal.details}"
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={activeModal.calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow transition hover:bg-accent/90 hover:scale-102"
              >
                <CalendarPlus className="h-4 w-4" />
                <span>Add to Calendar</span>
              </a>
              <a
                href={activeModal.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:bg-primary hover:text-primary-foreground hover:scale-102"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span>Directions in Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
