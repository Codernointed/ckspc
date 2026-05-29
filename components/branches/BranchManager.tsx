"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  createBranch,
  updateBranch,
  deleteBranchForm,
  type BranchResult,
} from "@/lib/actions/branches";

type BranchRow = {
  id: number;
  slug: string;
  code: string;
  name: string;
  region: string | null;
  district: string | null;
  tier: string | null;
  pastor: string | null;
  address: string | null;
  area: string | null;
  serviceTimes: string | null;
  phone: string | null;
  email: string | null;
  imageUrl: string | null;
  isHq: boolean;
  members: number | null;
};

const TIERS = ["Main Campus", "Full Branch", "Outpost", "Cell Group"];

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}

export function BranchManager({
  branches,
  canManage,
}: {
  branches: BranchRow[];
  canManage: boolean;
}) {
  // null = list view, "new" = create, number = edit that id
  const [mode, setMode] = useState<null | "new" | number>(null);
  const editing =
    typeof mode === "number" ? branches.find((b) => b.id === mode) ?? null : null;

  if (!canManage) {
    return (
      <div className="restricted-banner">
        <span className="seal">✦</span>
        <div>
          <div className="title">Restricted</div>
          <div className="body">
            Managing branches requires a National Administrator, IT Administrator,
            Branch Pastor, or General Overseer role.
          </div>
        </div>
      </div>
    );
  }

  if (mode !== null) {
    return (
      <BranchForm
        key={editing?.id ?? "new"}
        editing={editing}
        onDone={() => setMode(null)}
      />
    );
  }

  return (
    <div>
      <div className="row between" style={{ marginBottom: "var(--space-5)", alignItems: "center" }}>
        <span className="muted" style={{ fontSize: "var(--fs-sm)" }}>
          {branches.length} branch{branches.length === 1 ? "" : "es"} · edits publish to the public website instantly
        </span>
        <button className="btn btn-primary" onClick={() => setMode("new")}>
          + Add branch
        </button>
      </div>

      <div className="three-col">
        {branches.map((b) => (
          <article key={b.id} className="card">
            <div
              style={{
                height: 120,
                borderRadius: "var(--r-sm)",
                overflow: "hidden",
                marginBottom: "var(--space-3)",
                background: "linear-gradient(135deg,#061168,#000666 60%,#00033a)",
              }}
            >
              {b.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={b.imageUrl}
                  alt={b.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <div className="card-head">
              <h3 style={{ fontSize: "var(--fs-md)" }}>{b.name}</h3>
              {b.isHq && <span className="chip">HQ</span>}
            </div>
            <p className="muted" style={{ fontSize: "var(--fs-sm)", marginTop: 2 }}>
              {b.tier} · {b.code}
            </p>
            <div style={{ fontSize: "var(--fs-sm)", marginTop: "var(--space-3)", lineHeight: 1.6 }}>
              <div>📍 {b.address || "—"}{b.area ? `, ${b.area}` : ""}</div>
              <div>👤 {b.pastor || "—"}</div>
              <div>⏰ {b.serviceTimes || "—"}</div>
              <div>📞 {b.phone || "—"}</div>
            </div>
            <div className="row between mt-6" style={{ paddingTop: "var(--space-3)", borderTop: "1px solid var(--border)" }}>
              <button className="btn btn-secondary" onClick={() => setMode(b.id)}>
                Edit
              </button>
              <form
                action={deleteBranchForm}
                onSubmit={(e) => {
                  if (!confirm(`Delete "${b.name}"? This cannot be undone.`)) e.preventDefault();
                }}
              >
                <input type="hidden" name="id" value={b.id} />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ color: "var(--ember-700)" }}
                >
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function BranchForm({
  editing,
  onDone,
}: {
  editing: BranchRow | null;
  onDone: () => void;
}) {
  const action = editing ? updateBranch : createBranch;
  const [state, formAction] = useFormState<BranchResult | null, FormData>(
    async (_prev, fd) => action(fd),
    null
  );
  const [imageUrl, setImageUrl] = useState(editing?.imageUrl ?? "");

  useEffect(() => {
    if (state?.ok) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [state, onDone]);

  return (
    <form action={formAction} className="card" style={{ maxWidth: 720 }}>
      {editing && <input type="hidden" name="id" value={editing.id} />}

      <div className="card-head" style={{ marginBottom: "var(--space-4)" }}>
        <h3 style={{ fontSize: "var(--fs-lg)" }}>
          {editing ? `Edit ${editing.name}` : "Add a new branch"}
        </h3>
        <button type="button" className="btn btn-secondary" onClick={onDone}>
          ← Back to list
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
        <Field label="Branch name *" name="name" defaultValue={editing?.name} required />
        <Field label="Code" name="code" defaultValue={editing?.code} placeholder="auto if blank" />
        <SelectField label="Tier" name="tier" defaultValue={editing?.tier ?? "Full Branch"} options={TIERS} />
        <Field label="Pastor" name="pastor" defaultValue={editing?.pastor ?? ""} />
        <Field label="Region" name="region" defaultValue={editing?.region ?? ""} />
        <Field label="District" name="district" defaultValue={editing?.district ?? ""} />
        <Field label="Address" name="address" defaultValue={editing?.address ?? ""} />
        <Field label="Area / landmark" name="area" defaultValue={editing?.area ?? ""} />
        <Field label="Service times" name="serviceTimes" defaultValue={editing?.serviceTimes ?? ""} />
        <Field label="Phone" name="phone" defaultValue={editing?.phone ?? ""} />
        <Field label="Email" name="email" defaultValue={editing?.email ?? ""} />
        <label style={{ display: "flex", alignItems: "center", gap: 8, alignSelf: "end", paddingBottom: 10 }}>
          <input type="checkbox" name="isHq" defaultChecked={editing?.isHq ?? false} />
          <span style={{ fontSize: "var(--fs-sm)" }}>This is the Headquarters</span>
        </label>
      </div>

      <div style={{ marginTop: "var(--space-4)" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: 6, fontSize: 11 }}>
          Image URL (paste a link to a photo)
        </span>
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://…"
          style={inputStyle}
        />
        {imageUrl && (
          <div style={{ marginTop: 10, height: 140, borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--border)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
      </div>

      <div className="row between" style={{ marginTop: "var(--space-5)", alignItems: "center" }}>
        <span
          style={{
            fontSize: "var(--fs-sm)",
            color: state?.ok ? "var(--vine-700)" : "var(--ember-700)",
          }}
        >
          {state?.message ?? ""}
        </span>
        <SubmitButton label={editing ? "Save changes" : "Create branch"} />
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "block" }}>
      <span className="eyebrow" style={{ display: "block", marginBottom: 6, fontSize: 11 }}>
        {label}
      </span>
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        style={inputStyle}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <label style={{ display: "block" }}>
      <span className="eyebrow" style={{ display: "block", marginBottom: 6, fontSize: 11 }}>
        {label}
      </span>
      <select name={name} defaultValue={defaultValue} style={inputStyle}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
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
