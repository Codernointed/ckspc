"use client";

import { useFormState, useFormStatus } from "react-dom";
import { saveHomeSection, type SaveResult } from "@/lib/actions/content";
import type { SectionSchema } from "@/lib/content";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

export function SectionEditor({
  schema,
  values,
}: {
  schema: SectionSchema;
  values: Record<string, string>;
}) {
  const [state, formAction] = useFormState<SaveResult | null, FormData>(
    saveHomeSection,
    null
  );

  return (
    <form action={formAction} className="card" style={{ marginBottom: "var(--space-5)" }}>
      <input type="hidden" name="__section" value={schema.key} />

      <div className="card-head" style={{ marginBottom: "var(--space-3)" }}>
        <div>
          <h3 style={{ fontSize: "var(--fs-md)" }}>{schema.title}</h3>
          <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>{schema.description}</p>
        </div>
        <span className="chip">home · {schema.key}</span>
      </div>

      <div style={{ display: "grid", gap: "var(--space-4)" }}>
        {schema.fields.map((field) => (
          <label key={field.name} style={{ display: "block" }}>
            <span
              className="eyebrow"
              style={{ display: "block", marginBottom: 6, fontSize: 11 }}
            >
              {field.label}
            </span>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                defaultValue={values[field.name] ?? ""}
                rows={3}
                style={textareaStyle}
              />
            ) : (
              <input
                name={field.name}
                defaultValue={values[field.name] ?? ""}
                style={inputStyle}
              />
            )}
          </label>
        ))}
      </div>

      <div
        className="row between"
        style={{ marginTop: "var(--space-4)", alignItems: "center" }}
      >
        <span
          style={{
            fontSize: "var(--fs-sm)",
            color: state?.ok ? "var(--vine-700)" : "var(--ember-700)",
          }}
        >
          {state?.message ?? ""}
        </span>
        <SubmitButton />
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "var(--r-sm)",
  border: "1px solid var(--border)",
  background: "var(--bg)",
  color: "var(--fg)",
  fontSize: "var(--fs-sm)",
  fontFamily: "inherit",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  lineHeight: 1.5,
};
