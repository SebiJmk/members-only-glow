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
      className="min-h-screen text-foreground pb-safe-nav"
      style={{ background: "#050505" }}
    >
      <Navbar />

      {/* Title */}
      <section className="container mx-auto px-6 pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.5em] text-copper mb-5">The Gates</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Choose your <em className="text-neon-soft not-italic">table.</em>
          </h1>
          <p className="mt-5 text-foreground/65 max-w-xl">
            Tap any seat on the floor plan. The room knows where you sit.
          </p>
        </div>
      </section>

      {/* Stack: Map → Info Card → Form */}
      <section className="container mx-auto px-4 sm:px-6 space-y-6 md:space-y-8">
        {/* MAP */}
        <FloorMap
          selected={selected}
          onSelect={setSelected}
          hovered={hovered}
          onHover={setHovered}
        />

        {/* INFO CARD — always visible, never overlaps the map */}
        <article
          className="glass rounded-2xl p-5 md:p-6 transition-all duration-500"
          aria-live="polite"
        >
          {previewTable && previewZone ? (
            <div className="flex flex-col sm:flex-row gap-5 items-stretch animate-fade-in">
              <img
                src={previewZone.image}
                alt={previewZone.name}
                width={280}
                height={180}
                loading="lazy"
                className="h-40 sm:h-32 sm:w-44 w-full object-cover rounded-xl shrink-0"
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
            <div className="text-center py-3">
              <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-1">
                Info card
              </p>
              <p className="text-foreground/55 text-sm">
                Hover or tap a table to see its vibe.
              </p>
            </div>
          )}
        </article>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="glass-strong rounded-2xl p-6 md:p-10 space-y-5 max-w-3xl mx-auto w-full"
          style={{ borderColor: "hsl(var(--gold) / 0.15)" }}
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-display text-2xl md:text-3xl">Your details</h2>
            {selected && (
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 hover:text-neon-soft inline-flex items-center gap-1 transition"
              >
                <X className="h-3 w-3" /> Clear table
              </button>
            )}
          </div>

          {/* Selected table indicator */}
          <div
            className="rounded-xl px-4 py-3 text-sm flex items-center justify-between transition-all"
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
              style={{
                borderColor: "hsl(var(--gold) / 0.3)",
              }}
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
              <MapPin className="h-4 w-4 text-copper" />
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
              <Phone className="h-4 w-4 text-copper" />
              <a href="tel:+40700000000" className="hover:text-neon-soft">
                +40 700 000 000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-copper" />
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
      </section>

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
