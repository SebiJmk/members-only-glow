import { FormEvent, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Instagram, MapPin, Phone, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { FloorMap } from "@/components/FloorMap";
import { tables, zones } from "@/data/floorplan";
import { toast } from "@/hooks/use-toast";
import bgExterior from "@/assets/members-exterior.jpg";

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone")
    .max(30)
    .regex(/^[+\d\s().-]+$/, "Phone contains invalid characters"),
  guests: z.coerce.number().int().min(1).max(20),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  notes: z.string().max(500).optional(),
  table: z.string().min(1, "Select a table on the map"),
});

const Reserve = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.title = "Reserve a Table — Members Only Bucharest";
  }, []);

  const previewId = selected ?? hovered;
  const previewTable = useMemo(
    () => tables.find((t) => t.id === previewId) ?? null,
    [previewId]
  );
  const previewZone = previewTable ? zones[previewTable.zone] : null;
  const selectedTable = useMemo(
    () => tables.find((t) => t.id === selected) ?? null,
    [selected]
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    data.table = selected ?? "";

    const result = reservationSchema.safeParse(data);
    if (!result.success) {
      toast({
        title: "Check the form",
        description: result.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormOpen(false);
      toast({
        title: "Request received",
        description: `Table ${selected} held — our host will confirm shortly.`,
      });
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <main className="relative min-h-screen text-foreground pb-safe-nav overflow-hidden">
      {/* Background — MEMBERS exterior */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgExterior})` }}
      />
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 0% / 0.55) 0%, hsl(0 0% 3% / 0.88) 45%, hsl(0 0% 2% / 0.96) 100%)",
        }}
      />

      <Navbar />

      {/* Title */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="container mx-auto px-6 pt-32 md:pt-40 pb-10 md:pb-14"
      >
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.5em] text-[hsl(var(--neon-blue))] mb-5">
            The Gates
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Choose your{" "}
            <em
              className="not-italic"
              style={{
                color: "hsl(var(--neon-blue))",
                textShadow: "var(--glow-blue)",
              }}
            >
              table.
            </em>
          </h1>
          <p className="mt-5 text-foreground/70 max-w-xl font-sans">
            Tap a seat on the floor plan. Pinch to zoom, swipe to explore.
          </p>
        </div>
      </motion.section>

      {/* Map + Info */}
      <section className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <FloorMap
            selected={selected}
            onSelect={(id) => {
              setSelected(id);
            }}
            hovered={hovered}
            onHover={setHovered}
          />

          {/* INFO PANEL */}
          <article
            className="glass rounded-2xl p-6 md:p-8 transition-all duration-500"
            aria-live="polite"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/45 mb-4 font-sans">
              Table info
            </p>
            <AnimatePresence mode="wait">
              {previewTable && previewZone ? (
                <motion.div
                  key={previewTable.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col sm:flex-row gap-6 items-stretch"
                >
                  <img
                    src={previewZone.image}
                    alt={previewZone.name}
                    width={320}
                    height={200}
                    loading="lazy"
                    className="h-44 sm:h-36 sm:w-48 w-full object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p
                        className="text-[10px] uppercase tracking-[0.4em] font-sans"
                        style={{ color: previewZone.stroke }}
                      >
                        {previewZone.name}
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 font-sans">
                        Seats {previewTable.seats}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-gold mb-2">
                      {previewTable.title}
                    </h2>
                    <p className="text-sm text-foreground/70 leading-relaxed font-sans">
                      {previewZone.description}
                    </p>
                    {selected === previewTable.id && (
                      <p
                        className="mt-3 text-[10px] uppercase tracking-[0.4em] font-sans"
                        style={{
                          color: "hsl(var(--neon-blue))",
                          textShadow: "var(--glow-blue)",
                        }}
                      >
                        ✦ Held for your reservation
                      </p>
                    )}
                  </div>
                </motion.div>
              ) : (
                <p className="text-foreground/55 text-sm font-sans">
                  Tap a table to see its vibe.
                </p>
              )}
            </AnimatePresence>
          </article>
        </motion.div>
      </section>

      {/* Floating Action Button — appears when a table is selected */}
      <AnimatePresence>
        {selected && !formOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-md"
            style={{
              bottom: "calc(5.5rem + env(safe-area-inset-bottom))",
            }}
          >
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="w-full rounded-full px-7 py-4 text-xs font-medium tracking-[0.35em] uppercase font-sans transition-all duration-300 flex items-center justify-center gap-3"
              style={{
                color: "hsl(0 0% 100%)",
                background:
                  "linear-gradient(135deg, hsl(var(--neon-blue) / 0.95), hsl(var(--neon-blue) / 0.7))",
                border: "1px solid hsl(var(--neon-blue))",
                boxShadow: "var(--glow-blue)",
              }}
            >
              <Check className="h-4 w-4" strokeWidth={2} />
              <span>Confirmă rezervarea · {selected}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation form modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setFormOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%", opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
              className="relative w-full max-w-lg mx-auto md:rounded-2xl rounded-t-3xl glass-strong p-6 md:p-8 max-h-[92vh] overflow-y-auto no-scrollbar"
              style={{ borderColor: "hsl(var(--neon-blue) / 0.3)" }}
            >
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-[hsl(var(--neon-blue))] mb-1 font-sans">
                      Booking
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl">
                      Your details
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    aria-label="Close"
                    className="p-2 rounded-full hover:bg-white/5 text-foreground/60 hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Selected table chip */}
                <div
                  className="rounded-xl px-4 py-3.5 text-sm flex items-center justify-between"
                  style={{
                    border: "1px solid hsl(var(--neon-blue) / 0.6)",
                    background: "hsl(var(--neon-blue) / 0.08)",
                    boxShadow: "var(--glow-blue)",
                  }}
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60 font-sans">
                    Selected · {selectedTable?.title ?? selected}
                  </span>
                  <span
                    className="font-display text-xl"
                    style={{ color: "hsl(var(--neon-blue))" }}
                  >
                    {selected}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field name="name" label="Name" type="text" required maxLength={80} />
                  <Field name="phone" label="Phone" type="tel" required maxLength={30} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Field name="date" label="Date" type="date" required />
                  <Field name="time" label="Time" type="time" required />
                  <Field
                    name="guests"
                    label="Guests"
                    type="number"
                    defaultValue={2}
                    min={1}
                    max={20}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-2 font-sans"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    maxLength={500}
                    className="w-full bg-transparent border px-4 py-3 text-foreground placeholder:text-foreground/30 transition rounded-lg focus:outline-none font-sans"
                    style={{ borderColor: "hsl(var(--neon-blue) / 0.3)" }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "hsl(var(--neon-blue) / 0.7)";
                      e.currentTarget.style.boxShadow = "var(--glow-blue)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "hsl(var(--neon-blue) / 0.3)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    placeholder="Allergies, occasion, seating preference…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !selected}
                  className="w-full rounded-full px-8 py-4 text-sm font-medium tracking-[0.35em] uppercase transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed font-sans"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--neon-blue) / 0.7))",
                    color: "hsl(0 0% 100%)",
                    border: "1px solid hsl(var(--neon-blue))",
                    boxShadow: "var(--glow-blue)",
                  }}
                >
                  {submitting ? "Sending…" : "Confirm reservation"}
                </button>

                <div className="hairline" />

                <ul className="text-xs text-foreground/60 space-y-2.5 font-sans">
                  <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4" style={{ color: "hsl(var(--neon-blue))" }} />
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=str.+Nicolae+G.+Caramfil+74A,+Bucharest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[hsl(var(--neon-blue))]"
                    >
                      str. Nicolae G. Caramfil 74A, Bucharest
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4" style={{ color: "hsl(var(--neon-blue))" }} />
                    <a href="tel:+40700000000" className="hover:text-[hsl(var(--neon-blue))]">
                      +40 700 000 000
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Instagram className="h-4 w-4" style={{ color: "hsl(var(--neon-blue))" }} />
                    <a
                      href="https://instagram.com/membersonly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[hsl(var(--neon-blue))]"
                    >
                      @membersonly
                    </a>
                  </li>
                </ul>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <BottomNav />
    </main>
  );
};

const Field = ({
  label,
  name,
  ...rest
}: {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label
      htmlFor={name}
      className="block text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-2 font-sans"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      {...rest}
      className="w-full bg-transparent border px-4 py-3 text-foreground placeholder:text-foreground/30 transition rounded-lg focus:outline-none font-sans"
      style={{ borderColor: "hsl(var(--neon-blue) / 0.3)" }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "hsl(var(--neon-blue) / 0.7)";
        e.currentTarget.style.boxShadow = "var(--glow-blue)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "hsl(var(--neon-blue) / 0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  </div>
);

export default Reserve;
