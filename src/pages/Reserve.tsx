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
  email: z.string().trim().email("Invalid email").max(160).optional().or(z.literal("")),
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

  const previewId = hovered ?? selected;
  const previewTable = useMemo(
    () => tables.find((t) => t.id === previewId) ?? null,
    [previewId]
  );
  const previewZone = previewTable ? zones[previewTable.zone] : null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    (data as any).table = selected;

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
    <main className="min-h-screen bg-background text-foreground pb-32">
      <Navbar />

      <section className="container mx-auto px-6 pt-32 md:pt-40 pb-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.5em] text-copper mb-5">The Gates</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Choose your <em className="text-neon-soft not-italic">table.</em>
          </h1>
          <p className="mt-5 text-foreground/65 max-w-xl">
            Tap any table on the floor plan. The room knows where you sit.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        {/* Map + preview */}
        <div className="lg:col-span-3 space-y-5">
          <FloorMap
            selected={selected}
            onSelect={setSelected}
            hovered={hovered}
            onHover={setHovered}
          />

          {previewTable && previewZone && (
            <div className="glass rounded-2xl p-5 flex gap-4 items-stretch animate-fade-in">
              <img
                src={previewZone.image}
                alt={previewZone.name}
                width={120}
                height={120}
                loading="lazy"
                className="h-24 w-24 md:h-28 md:w-28 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-copper">
                    {previewZone.name}
                  </p>
                  <span className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                    Seats {previewTable.seats}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-gold mb-1">Table {previewTable.label}</h3>
                <p className="text-sm text-foreground/65 leading-snug">{previewZone.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="lg:col-span-2 glass-strong rounded-2xl p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Your details</h2>
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

          <div
            className="rounded-xl px-4 py-3 text-sm flex items-center justify-between"
            style={{
              border: selected
                ? "1px solid hsl(var(--gold) / 0.6)"
                : "1px dashed hsl(var(--border))",
              boxShadow: selected ? "var(--glow-gold)" : undefined,
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/55">Selected table</span>
            <span className={selected ? "text-gold font-display text-xl" : "text-foreground/40"}>
              {selected ?? "— none —"}
            </span>
          </div>

          <Field name="name" label="Name" type="text" required maxLength={80} />
          <Field name="phone" label="Phone" type="tel" required maxLength={30} />
          <Field name="email" label="Email (optional)" type="email" maxLength={160} />
          <div className="grid grid-cols-3 gap-3">
            <Field name="date" label="Date" type="date" required />
            <Field name="time" label="Time" type="time" required />
            <Field name="guests" label="Guests" type="number" defaultValue={2} min={1} max={20} required />
          </div>
          <div>
            <label htmlFor="notes" className="block text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              maxLength={500}
              className="w-full bg-transparent border border-border focus:border-neon/60 focus:outline-none px-4 py-3 text-foreground placeholder:text-foreground/30 transition rounded-lg"
              placeholder="Allergies, occasion, seating preference…"
            />
          </div>

          <button type="submit" disabled={submitting || !selected} className="btn-neon w-full disabled:opacity-40 disabled:cursor-not-allowed rounded-full">
            {submitting ? "Sending…" : selected ? `Reserve table ${selected}` : "Select a table first"}
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
              <a href="tel:+40700000000" className="hover:text-neon-soft">+40 700 000 000</a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-copper" />
              <a href="https://instagram.com/membersonly" target="_blank" rel="noopener noreferrer" className="hover:text-neon-soft">
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
    <label htmlFor={name} className="block text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      {...rest}
      className="w-full bg-transparent border border-border focus:border-neon/60 focus:outline-none px-4 py-3 text-foreground placeholder:text-foreground/30 transition rounded-lg"
    />
  </div>
);

export default Reserve;
