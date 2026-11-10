import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Phone,
  Sparkles,
  CalendarPlus,
  Play,
  Film,
  Copy,
  Check,
  X,
  Heart,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import IntroOverlay from "@/components/invitation/IntroOverlay";
import MusicToggle from "@/components/invitation/MusicToggle";
import Countdown from "@/components/invitation/Countdown";
import ScratchCard from "@/components/invitation/ScratchCard";
import Reveal from "@/components/invitation/Reveal";
import CeremonySection from "@/components/invitation/CeremonySection";
import cardShadi from "@/assets/card-shadi.jpg";
import cardVenueLocation from "@/assets/card-venue-location.jpg";
import cardRegardsFormal from "@/assets/card-regards-formal.jpg";
import introVideo from "@/assets/intro-video.mp4";
import nnLogo from "@/assets/nn-logo.png";
import closingCouplePhoto from "@/assets/closing-couple.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Nidhi weds Neeraj · Shubh Vivahotsav — 6 December 2026",
      },
      {
        name: "description",
        content:
          "With the divine blessings of the Almighty, Shri Awadh Narayan Gupta cordially invites you to celebrate the wedding of beloved daughter Nidhi Gupta with Neeraj Gupta on Sunday, 6 December 2026 at Sumangalam Resort, Gorakhpur.",
      },
      {
        property: "og:title",
        content: "Nidhi weds Neeraj · Shubh Vivahotsav",
      },
      {
        property: "og:description",
        content:
          "Wedding celebrations from 4 to 7 December 2026: Mehndi at Bride's Home, Haldi, Shubh Vivah & Bidaai at Sumangalam Resort, Gorakhpur. Tap to open your invitation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MAPS_URL = "https://goo.gl/maps/YNSL899qGM232YQ28?g_st=awb";

const WEDDING_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nidhi+weds+Neeraj+-+Shubh+Vivahotsav&dates=20261206T180000/20261207T040000&details=Grand+wedding+celebration+of+Nidhi+Gupta+and+Neeraj+Gupta.+Baarat+reception+and+Varmala+at+7:00+PM.&location=Sumangalam+Resort,+Transport+Nagar,+Pathra+Tola,+Shivpuri+New+Colony,+Gorakhpur,+Uttar+Pradesh";

const PHONES = ["+91 9967662018", "+91 9920806387"];

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-3" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
      <Sparkles className="h-4 w-4 text-primary" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
    </div>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Celebratory flower & gold confetti shower
  const triggerFlowerShower = () => {
    import("canvas-confetti").then(({ default: confetti }) => {
      const petalColors = ["#e63946", "#ffb703", "#fb8500", "#d4a537", "#f3e5c0", "#ffffff"];
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.5 },
        colors: petalColors,
        ticks: 200,
        gravity: 0.8,
      });
      window.setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.6 },
          colors: petalColors,
        });
      }, 250);
      window.setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.6 },
          colors: petalColors,
        });
      }, 450);
    });
    toast.success("🌸 Pushp Varsha! May God bless the couple!");
  };

  const copyResortAddress = () => {
    navigator.clipboard.writeText(
      "Sumangalam Resort, Transport Nagar, Pathra Tola, Shivpuri New Colony, Gorakhpur, Uttar Pradesh"
    );
    setCopiedAddress(true);
    toast.success("Venue address copied to clipboard!");
    window.setTimeout(() => setCopiedAddress(false), 2500);
  };

  const shareInvitation = async () => {
    const shareData = {
      title: "Nidhi weds Neeraj · Shubh Vivahotsav",
      text: "We cordially invite you to celebrate the wedding of Nidhi Gupta & Neeraj Gupta on 6 December 2026 at Sumangalam Resort, Gorakhpur!",
      url: typeof window !== "undefined" ? window.location.href : "https://nidhi-neeraj.lovable.app",
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User dismissed
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      toast.success("Invitation link copied to clipboard!");
    }
  };

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

  const handleOpened = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    setOpened(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/30">
      <Toaster position="bottom-center" />

      {/* ── Direct Tap Intro Video Overlay ── */}
      <IntroOverlay onOpened={handleOpened} onStarted={() => {}} />

      {/* ── Top Floating Controls (Music + Replay Film) ── */}
      {opened && (
        <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
          {/* Re-watch Video Button */}
          <button
            type="button"
            onClick={() => setVideoModalOpen(true)}
            aria-label="Watch invitation film again"
            title="Watch Invitation Film"
            className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-card/90 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-accent shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-secondary"
          >
            <Film className="h-4 w-4 text-accent" />
            <span className="hidden sm:inline">Film</span>
          </button>

          {/* Background Shehnai Audio Toggle */}
          <MusicToggle start={opened} pausedByModal={videoModalOpen} />
        </div>
      )}

      {/* ── Floating "Pushp Varsha / Shower Flowers" Button ── */}
      {opened && (
        <button
          type="button"
          onClick={triggerFlowerShower}
          aria-label="Shower flowers and blessings"
          title="Shower Flowers & Blessings (पुष्प वर्षा)"
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border border-primary/50 bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-accent/90"
        >
          <span className="text-base">🌸</span>
          <span className="hidden sm:inline">Shower Flowers</span>
        </button>
      )}

      {/* ── Main Invitation Website ── */}
      <main
        className={cn(
          "transition-opacity duration-1000",
          opened ? "opacity-100" : "opacity-0"
        )}
      >
        {/* ── Hero: The Main Royal Invitation Card (New Shadi Artwork from User) ── */}
        <section className="px-4 pb-6 pt-8">
          <Reveal>
            <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl shadow-2xl ring-1 ring-primary/40 bg-card">
              <img
                src={cardShadi}
                alt="Nidhi weds Neeraj Shadi wedding invitation artwork"
                className="block h-auto w-full object-cover"
                width={738}
                height={1040}
              />
              {/* Text placed inside the archway of the artwork */}
              <div className="absolute inset-x-[10%] sm:inset-x-[14%] top-[25%] bottom-[35%] flex flex-col items-center justify-center text-center p-2 select-none">
                <p className="font-serif text-xs sm:text-sm text-accent font-bold uppercase tracking-[0.25em] drop-shadow-xs">
                  ॥ श्री गणेशाय नमः ॥
                </p>
                <p className="mt-1 max-w-[34ch] text-[10px] sm:text-xs leading-relaxed text-[#2c1015]/90 font-semibold">
                  मंगलम भगवान विष्णु मंगलम गरुडध्वज ।<br />
                  मंगलम पुण्डरीकाक्षः मंगलाय तनो हरि ॥
                </p>
                <p className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-accent font-bold">
                  Shubh Vivahotsav
                </p>
                <h1 className="mt-0.5 sm:mt-1 font-display text-xl sm:text-3xl leading-tight text-[#2c1015] font-extrabold tracking-wide drop-shadow-xs">
                  Nidhi weds Neeraj
                </h1>
                <div className="my-1.5 sm:my-2 h-px w-20 sm:w-28 bg-primary/70" aria-hidden="true" />
                <p className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-wide text-accent drop-shadow-xs">
                  Sunday, 6 December 2026
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  title="Open Sumangalam Resort in Google Maps"
                  className="mt-1 text-[11px] sm:text-xs text-[#2c1015] hover:text-accent flex items-center justify-center gap-1 font-bold transition-colors"
                >
                  <MapPin className="h-3 w-3 text-primary inline" /> Sumangalam Resort, Gorakhpur
                </a>
              </div>
            </div>

            {/* Quick Interactive Actions below Hero Card */}
            <div className="mx-auto mt-6 flex max-w-lg flex-wrap items-center justify-center gap-2.5 px-2">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent shadow-sm transition hover:bg-secondary hover:scale-102"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Watch Invitation Film
              </button>
              <a
                href={WEDDING_CALENDAR_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow transition hover:bg-accent/90 hover:scale-102"
              >
                <CalendarPlus className="h-3.5 w-3.5" />
                Save the Date
              </a>
              <button
                type="button"
                onClick={triggerFlowerShower}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-card px-4 py-2 text-xs font-bold text-foreground shadow-sm transition hover:bg-secondary hover:scale-102"
              >
                <span>🌸 Shower Blessings</span>
              </button>
            </div>
          </Reveal>
        </section>

        {/* ── Countdown with Metallic Scratch Foil ──────────────────────────── */}
        <section className="px-6 py-10 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-accent font-bold">
              Counting down to
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-bold tracking-wide">
              The Big Day
            </h2>
            <ScratchCard className="mx-auto mt-6 max-w-md">
              <div className="rounded-2xl border border-primary/30 bg-card px-4 py-4 shadow-xl">
                <Countdown />
              </div>
            </ScratchCard>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              ✦ Scratch the golden foil to reveal the live countdown ✦
            </p>
            <p className="mt-3 text-sm sm:text-base text-foreground/85 font-semibold">
              Mehndi: 4 Dec · Haldi &amp; Wedding: 6 Dec · Sumangalam Resort, Gorakhpur
            </p>
          </Reveal>
        </section>

        {/* ── Formal Invitation (From Bride's Parents & Family - PDF Page 2) ── */}
        <section className="px-4 sm:px-6 pb-6">
          <Reveal>
            <div className="mx-auto max-w-xl rounded-2xl border border-primary/40 bg-card p-6 text-center shadow-xl sm:p-10">
              <p className="font-serif text-xs sm:text-sm tracking-[0.3em] uppercase text-accent font-bold">
                ॥ श्री गणेशाय नमः ॥
              </p>
              <p className="mt-1 font-serif text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
                मंगलम भगवान विष्णु मंगलम गरुडध्वज ।<br />
                मंगलम पुण्डरीकाक्षः मंगलाय तनो हरि ॥
              </p>
              <GoldDivider />
              <p className="text-base sm:text-lg font-serif font-bold text-accent">
                Dear Relatives and Friends,
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90 sm:text-base font-serif">
                With the divine blessings of the Almighty, we cordially invite you to the auspicious occasion of the wedding ceremony of our beloved daughter
              </p>
              
              {/* Bride Details */}
              <p className="mt-5 font-display text-3xl sm:text-4xl text-foreground font-extrabold tracking-wide">
                Nidhi Gupta
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
                Granddaughter of Late Smt. Kalpati Devi and Shri Shivprasad
              </p>
              <p className="mt-0.5 text-xs sm:text-sm text-foreground/85 font-semibold">
                Daughter of Smt. Sheela Devi and Shri Awadh Narayan Gupta (Dholai)
              </p>

              {/* ── Royal Circular Monogram Emblem ── */}
              <div className="my-6 flex items-center justify-center" aria-hidden="true">
                <div className="group relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-primary/50 bg-gradient-to-b from-card via-secondary/70 to-card p-3 shadow-md ring-2 ring-primary/25 ring-offset-2 ring-offset-card transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="pointer-events-none absolute inset-1 rounded-full border border-primary/25" />
                  <img
                    src={nnLogo}
                    alt="Nidhi and Neeraj Monogram"
                    loading="lazy"
                    className="h-full w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <p className="text-xs uppercase tracking-[0.25em] text-accent font-bold">
                with
              </p>

              {/* Groom Details */}
              <p className="mt-2 font-display text-3xl sm:text-4xl text-foreground font-extrabold tracking-wide">
                Neeraj Gupta
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
                Son of Smt. Indira Devi and Shri Chandrabhan Kasodhan
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Bagaha Baba Mandir, M.N. - 13th, Ramkrishna Nagar, Sarvodaya Nagar, Gorakhpur (Uttar Pradesh)
              </p>

              <GoldDivider />

              <p className="font-serif text-sm uppercase tracking-wider text-accent font-bold">
                TO CELEBRATE THEIR WEDDING
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90 sm:text-base font-serif">
                On this joyous occasion, we seek your gracious presence, love &amp; blessing as the couple begins their beautiful journey of togetherness. Your presence will make this celebration truly special and memorable.
              </p>

              <div className="mt-6 pt-4 border-t border-primary/30">
                <p className="font-serif text-xs uppercase tracking-widest text-muted-foreground font-bold">
                  With Regards,
                </p>
                <p className="mt-1 font-serif text-lg sm:text-xl font-bold text-accent">
                  Shri Awadh Narayan Gupta &amp; Family
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Auspicious Ceremonies (New Mehndi, Haldi, Shadi & Bidaai Backgrounds) ── */}
        <CeremonySection />

        {/* ── Venue & Location Card ("Isme location and all" Background from User) ── */}
        <section className="px-4 sm:px-6 py-10">
          <Reveal>
            <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-2xl">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                title="Open Sumangalam Resort in Google Maps"
                className="block relative aspect-[738/1040] w-full overflow-hidden bg-secondary/30 group cursor-pointer"
              >
                <img
                  src={cardVenueLocation}
                  alt="Scenic mountain garden pavilion artwork for wedding location"
                  loading="lazy"
                  width={738}
                  height={1040}
                  className="w-full h-full object-cover object-center block transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-[8%] sm:inset-x-[12%] top-[24%] bottom-[32%] flex flex-col items-center justify-center text-center p-2 select-none">
                  <p className="font-serif text-xs sm:text-sm tracking-[0.3em] uppercase text-accent font-bold drop-shadow-xs">
                    ॥ शुभ विवाह स्थल ॥
                  </p>
                  <h2 className="mt-1 font-display text-xl sm:text-3xl md:text-4xl leading-tight text-[#2c1015] font-extrabold drop-shadow-xs max-w-[18ch]">
                    The Wedding Venue
                  </h2>
                  <div className="my-2 flex items-center justify-center gap-2 w-28" aria-hidden="true">
                    <span className="h-px flex-1 bg-primary/70" />
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span className="h-px flex-1 bg-primary/70" />
                  </div>
                  <p className="font-serif text-sm sm:text-base md:text-lg font-bold tracking-wide text-accent drop-shadow-xs">
                    Sunday, 6 December 2026 · 7:00 PM
                  </p>
                  <p className="mt-1 max-w-[32ch] text-xs sm:text-sm text-[#2c1015]/90 font-bold leading-relaxed">
                    Cordially Welcoming the Groom, Baarat &amp; Kasodhan Family at Sumangalam Resort
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-[#2c1015]/10 px-3.5 py-1 text-xs font-bold text-[#2c1015] shadow-xs backdrop-blur-xs">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>Tap for Directions ↗</span>
                  </div>
                </div>
              </a>

              {/* Venue details and action bar */}
              <div className="border-t border-primary/20 bg-secondary/50 p-5 text-center sm:p-6">
                <div className="rounded-xl border border-primary/30 bg-card p-4 shadow-sm">
                  <p className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-bold text-foreground">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    Sumangalam Resort, Gorakhpur
                  </p>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium">
                    Transport Nagar, Pathra Tola, Shivpuri New Colony, Gorakhpur, Uttar Pradesh
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-accent-foreground shadow transition hover:bg-accent/90 hover:scale-102"
                    >
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      Open in Google Maps
                    </a>
                    <button
                      type="button"
                      onClick={copyResortAddress}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:bg-secondary hover:scale-102"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-primary" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── With Best Regards & Compliments ("Isme with best regards" Background from User) ── */}
        <section className="px-4 sm:px-6 py-10 text-center">
          <Reveal>
            <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-2xl">
              <div className="relative aspect-[738/1040] w-full overflow-hidden bg-secondary/30">
                <img
                  src={cardRegardsFormal}
                  alt="Royal arch artwork for with best regards and family wishes"
                  loading="lazy"
                  width={738}
                  height={1040}
                  className="w-full h-full object-cover object-center block"
                />
                
                {/* Text inside the royal arch */}
                <div className="absolute inset-x-[10%] sm:inset-x-[14%] top-[25%] bottom-[26%] flex flex-col items-center justify-between text-center p-3 sm:p-5 select-none">
                  <div>
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent font-bold">
                      ॥ सप्रेम स्नेह व आशीर्वाद ॥
                    </p>
                    <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl text-[#2c1015] font-extrabold tracking-wide">
                      With Best Regards
                    </h2>
                    <div className="my-1.5 flex items-center justify-center gap-2 w-24 mx-auto" aria-hidden="true">
                      <span className="h-px flex-1 bg-primary/70" />
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="h-px flex-1 bg-primary/70" />
                    </div>
                  </div>

                  {/* Highlighted Names from user message */}
                  <div className="space-y-1.5 my-auto">
                    <p className="font-serif text-lg sm:text-2xl font-bold text-[#2c1015]">
                      Shri Awadh Narayan Gupta
                    </p>
                    <p className="font-serif text-base sm:text-xl font-bold text-accent">
                      Nitin Awadh Narayan Gupta
                    </p>
                    <p className="font-serif text-sm sm:text-base font-semibold text-[#2c1015]/90">
                      Riya Awadh Narayan Gupta
                    </p>
                  </div>

                  {/* Family wishes note */}
                  <div>
                    <p className="text-xs sm:text-sm font-serif text-accent font-bold">
                      &amp; The Entire Gupta Family, Relatives &amp; Friends
                    </p>
                  </div>
                </div>
              </div>

              {/* Extended wishes, young siblings poem & relatives list */}
              <div className="border-t border-primary/20 bg-secondary/50 p-5 sm:p-7 text-center space-y-4">
                <div>
                  <p className="text-xs font-serif font-bold tracking-wider uppercase text-accent">
                    With Best Wishes From:
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-foreground/90 font-serif font-medium">
                    Keshav, Bhairav, Pappu, Santosh, Mahajan, Baijnath, Durga, Ramesh, Rahul, Titir, Rajesh, Deepak, Pradeep, Anil, Sanjay, Manish, Amit, Ajay
                  </p>
                </div>

                <div className="rounded-xl border border-primary/30 bg-card p-4 text-center">
                  <p className="font-serif italic text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    "The moon will rise with a twinkle, the stars will smile with joy,<br />
                    Our hearts will be filled with happiness if you join us for the wedding of my dear sister."
                  </p>
                  <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 text-xs font-serif font-bold text-accent">
                    <span>Nitya,</span>
                    <span>Aarvi,</span>
                    <span>Navya,</span>
                    <span>Arnav,</span>
                    <span>Harsh,</span>
                    <span>Kittu,</span>
                    <span>Aarvi,</span>
                    <span>Riyansh</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Contact Section (From Bride's Father - PDF Page 1) ───────────── */}
        <section className="px-4 sm:px-6 pb-12 pt-4">
          <Reveal>
            <div className="mx-auto max-w-xl rounded-2xl border border-primary/40 bg-card p-6 text-center shadow-xl sm:p-8">
              <h2 className="font-display text-2xl sm:text-3xl text-foreground font-bold tracking-wide">
                Reach Out to Us
              </h2>
              <GoldDivider />
              <p className="text-sm sm:text-base text-foreground/90 font-medium">
                Sender: <span className="font-bold text-accent">Shri Awadh Narayan Gupta</span>
              </p>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium max-w-[42ch] mx-auto">
                305 F Wing Shatrunjay Giriraj Complex, Tanaji Chowk, New Mill Road, Kurla West, Mumbai - 400070
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {PHONES.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-secondary px-5 py-2.5 text-sm font-bold text-secondary-foreground shadow-sm transition hover:bg-primary hover:text-primary-foreground hover:scale-102"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Closing: The Couple ──────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-12 pt-6">
          <Reveal>
            <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-2 border-primary/50 bg-gradient-to-b from-card via-card to-secondary/40 p-4 sm:p-7 shadow-2xl relative">
              <div className="text-center mb-5 sm:mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-secondary/80 px-4 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-accent shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>TOGETHER FOREVER</span>
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-wide">
                  A Beautiful Journey Begins
                </h2>
                <p className="mt-1.5 font-serif text-sm sm:text-base text-accent font-semibold tracking-wide">
                  Walking into a lifetime of love, laughter &amp; togetherness
                </p>
                <div className="mx-auto mt-2.5 flex items-center justify-center gap-2 w-28" aria-hidden="true">
                  <span className="h-px flex-1 bg-primary/60" />
                  <Heart className="h-3 w-3 text-accent fill-accent" />
                  <span className="h-px flex-1 bg-primary/60" />
                </div>
              </div>

              {/* Masterpiece Couple Artwork */}
              <div 
                className="group relative overflow-hidden rounded-2xl border border-primary/40 shadow-2xl bg-secondary/30 cursor-pointer"
                onClick={triggerFlowerShower}
                title="Tap anywhere to shower blessings!"
              >
                <img
                  src={closingCouplePhoto}
                  alt="Nidhi and Neeraj Wedding Invitation Artwork"
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </div>

              {/* Celebratory Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={triggerFlowerShower}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent via-rose-700 to-accent px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent-foreground shadow-lg transition hover:scale-105 active:scale-95 hover:shadow-xl cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Shower Blessings</span>
                  <Heart className="h-4 w-4 fill-rose-300 text-rose-300" />
                </button>

                <button
                  type="button"
                  onClick={shareInvitation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-secondary px-5 py-3 text-xs sm:text-sm font-semibold text-secondary-foreground shadow-sm transition hover:bg-primary hover:text-primary-foreground hover:scale-102 cursor-pointer"
                >
                  <Share2 className="h-4 w-4 text-accent" />
                  <span>Share Invitation</span>
                </button>
              </div>

            </div>
          </Reveal>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="border-t border-primary/30 bg-secondary/60 px-6 py-12 text-center relative overflow-hidden">
          <div className="mx-auto mb-4 flex items-center justify-center" aria-hidden="true">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-card/80 p-2 shadow-sm ring-1 ring-primary/20 ring-offset-2 ring-offset-secondary transition hover:scale-105">
              <img
                src={nnLogo}
                alt="NN Monogram"
                loading="lazy"
                className="h-full w-full object-contain opacity-95"
              />
            </div>
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-accent font-bold">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <p className="mt-2 font-display text-2xl sm:text-3xl text-foreground font-extrabold tracking-wider">
            Shubh Vivahotsav
          </p>
          <p className="mt-1.5 text-sm sm:text-base text-accent font-serif font-bold">
            Nidhi weds Neeraj · 6 December 2026 · Gorakhpur
          </p>
          <div className="mx-auto my-4 flex items-center justify-center gap-3 w-40" aria-hidden="true">
            <span className="h-px flex-1 bg-primary/40" />
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="h-px flex-1 bg-primary/40" />
          </div>
          <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase font-serif font-bold">
            WITH LOVE &amp; REGARDS · THE GUPTA &amp; KASODHAN FAMILIES
          </p>
        </footer>
      </main>

      {/* ── POPUP VIDEO MODAL ── */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#8ab9e3] via-[#bde1fa] to-[#8bb9e2] transition-opacity duration-300 p-2 sm:p-6 h-[100dvh] w-full"
          onClick={() => setVideoModalOpen(false)}
          role="dialog"
          aria-label="Invitation Video Player"
        >
          <button
            type="button"
            onClick={() => setVideoModalOpen(false)}
            className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-50 flex items-center gap-1.5 rounded-full border border-white/60 bg-black/45 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-2xl backdrop-blur-md transition hover:bg-black/65 hover:scale-105 active:scale-95"
          >
            <X className="h-4 w-4" />
            <span>Close ✕</span>
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[85dvh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={introVideo}
              className="w-full h-auto max-h-[85dvh] aspect-video object-contain rounded-xl sm:rounded-2xl drop-shadow-2xl shadow-[0_20px_50px_rgba(20,40,70,0.3)]"
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              autoPlay
              controls
            />
          </div>
        </div>
      )}
    </div>
  );
}
