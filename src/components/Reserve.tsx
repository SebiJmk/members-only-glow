import { Instagram, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "@/hooks/use-toast";

export const Reserve = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Request received",
        description: "Our host will confirm your reservation shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <section id="reserve" className="relative py-32 md:py-48">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <p className="text-xs uppercase tracking-[0.5em] text-copper mb-5">The Gates</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Reserve your <em className="text-neon-soft not-italic">place.</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Name" name="name" type="text" required />
              <Field label="Phone" name="phone" type="tel" required />
            </div>
            <Field label="Email" name="email" type="email" required />
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Date" name="date" type="date" required />
              <Field label="Time" name="time" type="time" required />
            </div>
            <Field label="Guests" name="guests" type="number" min={1} max={20} defaultValue={2} required />
            <div>
              <label className="block text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-3">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                className="w-full bg-transparent border border-border focus:border-neon/60 focus:outline-none px-4 py-3 text-foreground placeholder:text-foreground/30 transition"
                placeholder="Allergies, occasion, seating preference…"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-neon w-full sm:w-auto">
              {submitting ? "Sending…" : "Request reservation"}
            </button>
          </form>

          {/* Contact + Map */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-copper mt-1 shrink-0" />
                <address className="not-italic">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=str.+Nicolae+G.+Caramfil+74A,+Bucharest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neon-soft transition-colors"
                  >
                    str. Nicolae G. Caramfil 74A
                    <br />
                    Bucharest, Romania
                  </a>
                </address>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-copper shrink-0" />
                <a href="tel:+40700000000" className="hover:text-neon-soft transition-colors">
                  +40 700 000 000
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="h-5 w-5 text-copper shrink-0" />
                <a
                  href="https://instagram.com/membersonly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neon-soft transition-colors"
                >
                  @membersonly
                </a>
              </div>
            </div>

            <div className="hairline" />

            <div className="relative overflow-hidden border border-border" style={{ height: 360 }}>
              <iframe
                title="Members Only location map"
                src="https://www.google.com/maps?q=Strada+Nicolae+G.+Caramfil+74A,+Bucuresti&output=embed"
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
                style={{ filter: "invert(0.92) hue-rotate(180deg) contrast(0.85) saturate(0.8)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  name,
  type,
  ...rest
}: {
  label: string;
  name: string;
  type: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label htmlFor={name} className="block text-[10px] uppercase tracking-[0.4em] text-foreground/60 mb-3">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      {...rest}
      className="w-full bg-transparent border border-border focus:border-neon/60 focus:outline-none px-4 py-3 text-foreground placeholder:text-foreground/30 transition"
    />
  </div>
);
