"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  createItem,
  updateItem,
  deleteItemForm,
  moveItemForm,
  type ItemResult,
} from "@/lib/actions/collections";

type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "image" | "select";
  options?: string[];
  optional?: boolean;
};

type Def = {
  key: string;
  title: string;
  description: string;
  fields: Field[];
};

type Row = {
  id: number;
  sort: number;
  visible: boolean;
  data: Record<string, string>;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}

export function CollectionManager({
  def,
  rows,
  canManage,
}: {
  def: Def;
  rows: Row[];
  canManage: boolean;
}) {
  const [mode, setMode] = useState<null | "new" | number>(null);
  const editing = typeof mode === "number" ? rows.find((r) => r.id === mode) ?? null : null;

  if (!canManage) {
    return (
      <div className="restricted-banner">
        <span className="seal">✦</span>
        <div>
          <div className="title">Restricted</div>
          <div className="body">Editing website content requires a Media Director, IT Administrator, or National Administrator role.</div>
        </div>
      </div>
    );
  }

  if (mode !== null) {
    return <ItemForm key={editing?.id ?? "new"} def={def} editing={editing} onDone={() => setMode(null)} />;
  }

  const titleField = def.fields[0]?.name;
  const imageField = def.fields.find((f) => f.type === "image")?.name;

  return (
    <div>
      <div className="row between" style={{ marginBottom: "var(--space-5)", alignItems: "center" }}>
        <span className="muted" style={{ fontSize: "var(--fs-sm)" }}>
          {rows.length} item{rows.length === 1 ? "" : "s"} · drag order with the arrows · publishes live
        </span>
        <button className="btn btn-primary" onClick={() => setMode("new")}>+ Add item</button>
      </div>

      <div style={{ display: "grid", gap: "var(--space-2)" }}>
        {rows.map((r, i) => {
          const img = imageField ? r.data[imageField] : "";
          return (
            <div
              key={r.id}
              className="card"
              style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3)" }}
            >
              <div style={{ width: 52, height: 52, borderRadius: "var(--r-sm)", overflow: "hidden", flexShrink: 0, background: "linear-gradient(135deg,#061168,#000666)" }}>
                {img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>
                  {r.data[titleField] || "(untitled)"}
                  {!r.visible && <span className="chip" style={{ marginLeft: 8 }}>hidden</span>}
                </div>
                <div className="muted" style={{ fontSize: "var(--fs-xs)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {def.fields.slice(1, 3).map((f) => r.data[f.name]).filter(Boolean).join(" · ")}
                </div>
              </div>
              <div className="row" style={{ gap: 4, alignItems: "center" }}>
                <ArrowForm id={r.id} collection={def.key} dir="up" disabled={i === 0} />
                <ArrowForm id={r.id} collection={def.key} dir="down" disabled={i === rows.length - 1} />
                <button className="btn btn-secondary" onClick={() => setMode(r.id)}>Edit</button>
                <form
                  action={deleteItemForm}
                  onSubmit={(e) => { if (!confirm("Delete this item?")) e.preventDefault(); }}
                >
                  <input type="hidden" name="id" value={r.id} />
                  <input type="hidden" name="__collection" value={def.key} />
                  <button type="submit" className="btn btn-secondary" style={{ color: "var(--ember-700)" }}>✕</button>
                </form>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && <p className="muted">No items yet. Click “Add item”.</p>}
      </div>
    </div>
  );
}

function ArrowForm({ id, collection, dir, disabled }: { id: number; collection: string; dir: "up" | "down"; disabled: boolean }) {
  return (
    <form action={moveItemForm}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="dir" value={dir} />
      <input type="hidden" name="__collection" value={collection} />
      <button
        type="submit"
        className="btn btn-secondary"
        disabled={disabled}
        style={{ padding: "4px 8px", opacity: disabled ? 0.3 : 1 }}
        aria-label={dir === "up" ? "Move up" : "Move down"}
      >
        {dir === "up" ? "↑" : "↓"}
      </button>
    </form>
  );
}

function ItemForm({ def, editing, onDone }: { def: Def; editing: Row | null; onDone: () => void }) {
  const action = editing ? updateItem : createItem;
  const [state, formAction] = useFormState<ItemResult | null, FormData>(action, null);
  const imageField = def.fields.find((f) => f.type === "image")?.name;
  const [imgVal, setImgVal] = useState(editing?.data[imageField ?? ""] ?? "");

  useEffect(() => {
    if (state?.ok) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [state, onDone]);

  return (
    <form action={formAction} className="card" style={{ maxWidth: 680 }}>
      <input type="hidden" name="__collection" value={def.key} />
      {editing && <input type="hidden" name="id" value={editing.id} />}

      <div className="card-head" style={{ marginBottom: "var(--space-4)" }}>
        <h3 style={{ fontSize: "var(--fs-lg)" }}>{editing ? "Edit item" : `Add to ${def.title}`}</h3>
        <button type="button" className="btn btn-secondary" onClick={onDone}>← Back</button>
      </div>

      <div style={{ display: "grid", gap: "var(--space-4)" }}>
        {def.fields.map((f) => (
          <label key={f.name} style={{ display: "block" }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 6, fontSize: 11 }}>{f.label}</span>
            {f.type === "textarea" ? (
              <textarea name={f.name} defaultValue={editing?.data[f.name] ?? ""} rows={3} style={inputStyle} />
            ) : f.type === "select" ? (
              <select name={f.name} defaultValue={editing?.data[f.name] ?? f.options?.[0] ?? ""} style={inputStyle}>
                {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === "image" ? (
              <>
                <input name={f.name} value={imgVal} onChange={(e) => setImgVal(e.target.value)} placeholder="https://…" style={inputStyle} />
                {imgVal && (
                  <div style={{ marginTop: 8, height: 120, borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--border)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgVal} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </>
            ) : (
              <input name={f.name} defaultValue={editing?.data[f.name] ?? ""} style={inputStyle} />
            )}
          </label>
        ))}

        {editing && (
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" name="visible" defaultChecked={editing.visible} />
            <span style={{ fontSize: "var(--fs-sm)" }}>Visible on the website</span>
          </label>
        )}
      </div>

      <div className="row between" style={{ marginTop: "var(--space-5)", alignItems: "center" }}>
        <span style={{ fontSize: "var(--fs-sm)", color: state?.ok ? "var(--vine-700)" : "var(--ember-700)" }}>{state?.message ?? ""}</span>
        <SubmitButton label={editing ? "Save changes" : "Add item"} />
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
