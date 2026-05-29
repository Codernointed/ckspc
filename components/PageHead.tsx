import { ReactNode } from "react";

export function PageHead({
  eyebrow,
  title,
  emphasis,
  lede,
  actions,
}: {
  eyebrow?: string;
  title: string;
  emphasis?: string;
  lede?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 style={{ marginTop: eyebrow ? 8 : 0 }}>
          {title}
          {emphasis && <> <em>{emphasis}</em></>}
        </h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {actions && <div className="row" style={{ gap: 8 }}>{actions}</div>}
    </div>
  );
}
