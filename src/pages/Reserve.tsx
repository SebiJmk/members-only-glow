import { FormEvent, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Instagram, MapPin, Phone, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { FloorMap } from "@/components/FloorMap";
import { tables, zones } from "@/data/floorplan";
import { toast } from "@/hooks/use-toast";

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

  useEffect(() => {
    document.title = "Reserve a Table — Members Only Bucharest";
  }, []);

  const previewId = selected ?? hovered;
  const previewTable = useMemo(
    () => tables.find((t) => t.id === previewId) ?? null,
    [previewId]
  );
  const previewZone = previewTable ? zones[previewTable.zone] : null;

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
      toast({
        title: "Request received",
        description: `Table ${selected} held — our host will confirm shortly.`,
      });
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <main
      className="relative min-h-screen text-foreground pb-safe-nav overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Centered purple-pink halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] -z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 30%, hsl(290 80% 45% / 0.28) 0%, hsl(330 90% 55% / 0.18) 35%, hsl(0 0% 4% / 0) 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[280px] h-[600px] w-[600px] rounded-full -z-0 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(280 90% 50% / 0.18) 0%, hsl(0 0% 4% / 0) 70%)",
        }}
      />

      <div className="relative z-10">
      <Navbar />

      {/* Title */}
      <section className="container mx-auto px-6 pt-32 md:pt-40 pb-10 md:pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.5em] text-primary mb-5">The Gates</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Choose your <em className="text-neon-soft not-italic">table.</em>
          </h1>
          <p className="mt-5 text-foreground/65 max-w-xl mx-auto">
            Tap any seat on the floor plan. The room knows where you sit.
          </p>
        </div>
      </section>

      {/* Two-column on desktop: map left, details right.  Stacked on mobile. */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          {/* LEFT — MAP + INFO PANEL */}
          <div className="space-y-8 lg:space-y-10 min-w-0">
            <FloorMap
              selected={selected}
              onSelect={setSelected}
              hovered={hovered}
              onHover={setHovered}
            />

            {/* INFO PANEL — sits below the map, well separated */}
            <article
              className="glass rounded-2xl p-6 md:p-8 transition-all duration-500"
              aria-live="polite"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/45 mb-4">
                Table info
              </p>
              {previewTable && previewZone ? (
                <div className="flex flex-col sm:flex-row gap-6 items-stretch animate-fade-in">
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
                        className="text-[10px] uppercase tracking-[0.4em]"
                        style={{ color: previewZone.stroke }}
                      >
                        {previewZone.name}
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                        Seats {previewTable.seats}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-gold mb-2">
                      {previewTable.title}
                    </h2>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {previewZone.description}
                    </p>
                    {selected === previewTable.id && (
                      <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-gold">
                        ✦ Held for your reservation
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-foreground/55 text-sm">
                  Hover or tap a table to see its vibe.
                </p>
              )}
            </article>
          </div>

          {/* RIGHT — RESERVATION FORM (sticky on desktop) */}
          <aside className="lg:sticky lg:top-28 mt-16 lg:mt-0 w-full max-w-lg lg:max-w-none mx-auto">
            <form
              onSubmit={onSubmit}
              className="glass-strong rounded-2xl p-7 md:p-10 space-y-6 w-full"
              style={{ borderColor: "hsl(var(--gold) / 0.18)" }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-primary mb-1">
                    Booking
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl">Your details</h2>
                </div>
                {selected && (
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 hover:text-neon-soft inline-flex items-center gap-1 transition"
                  >
                    <X className="h-3 w-3" /> Clear
                  </button>
                )}
              </div>

              {/* Selected table indicator */}
              <div
                className="rounded-xl px-4 py-3.5 text-sm flex items-center justify-between transition-all"
                style={{
                  border: selected
                    ? "1px solid hsl(var(--gold) / 0.7)"
                    : "1px dashed hsl(var(--border))",
                  boxShadow: selected ? "var(--glow-gold)" : undefined,
                  background: selected ? "hsl(var(--gold) / 0.06)" : "transparent",
                }}
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/55">
                  Selected table
                </span>
                <span
                  className={
                    selected ? "text-gold font-display text-xl" : "text-foreground/40"
                  }
                >
                  {selected ?? "— none —"}
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
                  className="block text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-2"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  maxLength={500}
                  className="w-full bg-transparent border px-4 py-3 text-foreground placeholder:text-foreground/30 transition rounded-lg focus:outline-none"
                  style={{ borderColor: "hsl(var(--gold) / 0.3)" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "hsl(var(--gold) / 0.7)";
                    e.currentTarget.style.boxShadow = "var(--glow-gold)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "hsl(var(--gold) / 0.3)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="Allergies, occasion, seating preference…"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !selected}
                className="w-full rounded-full px-8 py-4 text-sm font-medium tracking-[0.35em] uppercase transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: selected
                    ? "var(--gradient-gold)"
                    : "hsl(0 0% 100% / 0.04)",
                  color: selected ? "hsl(0 0% 7%)" : "hsl(0 0% 100% / 0.5)",
                  border: "1px solid hsl(var(--gold) / 0.6)",
                  boxShadow: selected ? "var(--glow-gold)" : undefined,
                }}
              >
                {submitting ? "Sending…" : "Reserve table"}
              </button>

              <div className="hairline" />

              <ul className="text-xs text-foreground/60 space-y-2.5">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=str.+Nicolae+G.+Caramfil+74A,+Bucharest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neon-soft"
                  >
                    str. Nicolae G. Caramfil 74A, Bucharest
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+40700000000" className="hover:text-neon-soft">
                    +40 700 000 000
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 text-primary" />
                  <a
                    href="https://instagram.com/membersonly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neon-soft"
                  >
                    @membersonly
                  </a>
                </li>
              </ul>
            </form>
          </aside>
        </div>

        {/* TABLE GRID — one card per individual table */}
        <div className="mt-20 md:mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[10px] uppercase tracking-[0.5em] text-primary mb-3">All tables</p>
            <h2 className="font-display text-3xl md:text-4xl">Browse every seat in the room.</h2>
            <p className="mt-3 text-sm text-foreground/60">
              Tap a card to hold that table. Each one keeps the vibe of its zone.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tables.map((t) => {
              const z = zones[t.zone];
              const isSelected = selected === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelected(t.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onMouseEnter={() => setHovered(t.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative text-left rounded-2xl overflow-hidden glass transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: isSelected
                      ? "1px solid hsl(var(--gold) / 0.8)"
                      : "1px solid hsl(0 0% 100% / 0.08)",
                    boxShadow: isSelected ? "var(--glow-gold)" : undefined,
                  }}
                >
                  <div
                    className="h-2 w-full"
                    style={{ background: z.stroke }}
                    aria-hidden="true"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-display text-2xl"
                        style={{ color: isSelected ? "hsl(var(--gold))" : z.stroke }}
                      >
                        {t.label}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/50">
                        Seats {t.seats}
                      </span>
                    </div>
                    <p
                      className="text-[9px] uppercase tracking-[0.35em] mb-2"
                      style={{ color: z.stroke }}
                    >
                      {z.name}
                    </p>
                    <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3">
                      {z.description}
                    </p>
                    {isSelected && (
                      <p className="mt-3 text-[9px] uppercase tracking-[0.4em] text-gold">
                        ✦ Held
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
      </div>
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
      className="block text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      {...rest}
      className="w-full bg-transparent border px-4 py-3 text-foreground placeholder:text-foreground/30 transition rounded-lg focus:outline-none"
      style={{ borderColor: "hsl(var(--gold) / 0.3)" }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "hsl(var(--gold) / 0.7)";
        e.currentTarget.style.boxShadow = "var(--glow-gold)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "hsl(var(--gold) / 0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  </div>
);

export default Reserve;
