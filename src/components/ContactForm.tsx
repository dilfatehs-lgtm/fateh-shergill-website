"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";

type Field = "name" | "email" | "phone" | "intent" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const intents = [
  { value: "", label: "Select one…" },
  { value: "buying", label: "I'm looking to buy" },
  { value: "selling", label: "I'm thinking about selling" },
  { value: "both", label: "Buying and selling" },
  { value: "valuation", label: "I'd like a home valuation" },
  { value: "general", label: "Something else" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns a human error with a recovery path, or undefined when valid. */
function validate(field: Field, value: string): string | undefined {
  switch (field) {
    case "name":
      if (!value.trim()) return "Please enter your name so I know who I'm speaking with.";
      return;
    case "email":
      if (!value.trim()) return "An email address is required so I can reply.";
      if (!EMAIL_RE.test(value.trim()))
        return "That doesn't look like a complete email address — check for a typo.";
      return;
    case "phone":
      if (!value.trim()) return; // optional
      if (value.replace(/\D/g, "").length < 10)
        return "Phone numbers need at least 10 digits, including area code.";
      return;
    case "intent":
      if (!value) return "Let me know what you're after so I can reply usefully.";
      return;
    case "message":
      if (!value.trim()) return "Add a short note about what you're looking for.";
      if (value.trim().length < 12)
        return "A little more detail helps — a sentence or two is plenty.";
      return;
  }
}

const ALL: Field[] = ["name", "email", "phone", "intent", "message"];

export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    phone: "",
    intent: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  /**
   * CASL requires express, opt-in consent for commercial electronic messages.
   * This starts false and must never be pre-checked — a pre-ticked box is not
   * express consent.
   */
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reduced = useReducedMotion();

  const configured = Boolean(site.formAccessKey);

  function setValue(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    // Only re-validate live once the field has already been blurred once,
    // so users are never scolded mid-keystroke on first entry.
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validate(field, value) }));
    }
  }

  function onBlur(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validate(field, values[field]) }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const next: Errors = {};
    for (const field of ALL) {
      const err = validate(field, values[field]);
      if (err) next[field] = err;
    }
    setErrors(next);
    setTouched(Object.fromEntries(ALL.map((f) => [f, true])));

    const firstInvalid = ALL.find((f) => next[f]);
    if (firstInvalid) {
      // Move focus to the first problem field (WCAG 3.3.x)
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: site.formAccessKey,
          subject: `New enquiry from ${values.name} — fatehshergill.com`,
          from_name: "Website Enquiry",
          name: values.name,
          email: values.email,
          phone: values.phone || "Not provided",
          enquiry_type:
            intents.find((i) => i.value === values.intent)?.label ??
            values.intent,
          message: values.message,
          marketing_consent: marketingOptIn
            ? "YES — express consent given via website form"
            : "No — enquiry reply only",
          consent_captured_at: new Date().toISOString(),
        }),
      });

      const data: { success?: boolean; message?: string } = await res
        .json()
        .catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setValues({ name: "", email: "", phone: "", intent: "", message: "" });
        setTouched({});
        setMarketingOptIn(false);
      } else {
        setStatus("error");
        setServerError(
          data.message ?? "The message didn't go through. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setServerError(
        "Couldn't reach the mail service — check your connection and try again.",
      );
    }
  }

  const fieldBase =
    "w-full min-h-[52px] border bg-ink-soft px-4 py-3 text-fg placeholder:text-fg-muted/70 transition-colors duration-200 focus:outline-none focus-visible:border-brass";

  function classFor(field: Field) {
    return `${fieldBase} ${
      touched[field] && errors[field]
        ? "border-danger"
        : "border-field-line hover:border-brass/70"
    }`;
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        role="status"
        aria-live="polite"
        className="flex min-h-[420px] flex-col items-center justify-center border border-line-invert bg-ink-soft px-8 py-16 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full border border-brass">
          <Check className="size-6 text-brass" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="mt-7 font-display text-3xl font-light text-fg">
          Message sent
        </h3>
        <p className="mt-4 max-w-sm text-sm text-fg-muted">
          Thank you — I&rsquo;ve received your note and will respond personally,
          usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 min-h-[48px] cursor-pointer border border-line-invert px-6 text-sm text-fg transition-colors hover:border-brass hover:text-brass"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from people, catches naive bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {!configured && (
        <p className="border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-fg-muted">
          <span className="text-fg">Setup needed:</span> add your
          Web3Forms key to <code className="text-brass">.env.local</code> to
          activate this form. Until then, email{" "}
          <a
            href={`mailto:${site.email}`}
            className="cursor-pointer text-brass underline underline-offset-4"
          >
            {site.email}
          </a>{" "}
          directly.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Full name"
          required
          error={touched.name ? errors.name : undefined}
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValue("name", e.target.value)}
            onBlur={() => onBlur("name")}
            aria-required="true"
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            className={classFor("name")}
          />
        </Field>

        <Field
          id="email"
          label="Email"
          required
          error={touched.email ? errors.email : undefined}
        >
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValue("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-required="true"
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            className={classFor("email")}
          />
        </Field>

        <Field
          id="phone"
          label="Phone"
          hint="Optional — fastest way to reach you"
          error={touched.phone ? errors.phone : undefined}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setValue("phone", e.target.value)}
            onBlur={() => onBlur("phone")}
            aria-invalid={Boolean(touched.phone && errors.phone)}
            aria-describedby={
              touched.phone && errors.phone ? "phone-error" : "phone-hint"
            }
            className={classFor("phone")}
          />
        </Field>

        <Field
          id="intent"
          label="How can I help?"
          required
          error={touched.intent ? errors.intent : undefined}
        >
          <select
            id="intent"
            name="intent"
            value={values.intent}
            onChange={(e) => setValue("intent", e.target.value)}
            onBlur={() => onBlur("intent")}
            aria-required="true"
            aria-invalid={Boolean(touched.intent && errors.intent)}
            aria-describedby={
              touched.intent && errors.intent ? "intent-error" : undefined
            }
            className={`${classFor("intent")} cursor-pointer appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-11`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23a9a093' stroke-width='1.5'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
            }}
          >
            {intents.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label="Your message"
        required
        hint="Neighbourhood, timeline, budget — whatever's useful."
        error={touched.message ? errors.message : undefined}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValue("message", e.target.value)}
          onBlur={() => onBlur("message")}
          aria-required="true"
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby={
            touched.message && errors.message ? "message-error" : "message-hint"
          }
          className={`${classFor("message")} resize-y`}
        />
      </Field>

      {/* Server-side failure — announced, with a working fallback */}
      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.p
            role="alert"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-2.5 border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          >
            <AlertCircle
              className="mt-0.5 size-4 shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>
              {serverError} You can also email{" "}
              <a
                href={`mailto:${site.email}`}
                className="cursor-pointer underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Express opt-in, separate from the enquiry itself (CASL s.6). */}
      <div className="flex items-start gap-3 border-t border-line-invert pt-6">
        <input
          id="marketing"
          name="marketing"
          type="checkbox"
          checked={marketingOptIn}
          onChange={(e) => setMarketingOptIn(e.target.checked)}
          className="mt-1 size-5 shrink-0 cursor-pointer accent-brass"
        />
        <label
          htmlFor="marketing"
          className="cursor-pointer text-sm text-fg-muted"
        >
          Optional — send me occasional market updates and new listings. You
          can unsubscribe from any message. Leaving this unticked still gets
          your enquiry answered.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting" || !configured}
        className="group inline-flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2.5 bg-brass px-8 text-sm tracking-wide text-ink transition-colors duration-200 hover:bg-brass-soft disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2
              className="size-4 animate-spin"
              strokeWidth={2}
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Send message
          </>
        )}
      </button>

      <p className="text-xs text-fg-muted">
        Fields marked <span className="text-brass">*</span> are required. Your
        details are used only to answer this enquiry and are never sold or
        shared for third-party marketing — see the{" "}
        <Link
          href="/privacy"
          className="cursor-pointer underline underline-offset-4 hover:text-brass"
        >
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

/** Label + hint + inline error, wired together by id for screen readers. */
function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.68rem] tracking-[0.16em] text-fg-muted uppercase"
      >
        {label}
        {required && (
          <span className="ml-1 text-brass" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-fg-muted">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs text-danger"
        >
          <AlertCircle
            className="mt-0.5 size-3.5 shrink-0"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}
