"use client";

import { useEffect, useState } from "react";

export function Topbar({ crumbs }: { crumbs: string[] }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("ckspc-theme")) as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ckspc-theme", next);
  };

  return (
    <header className="topbar">
      <nav className="crumb" aria-label="Breadcrumb">
        {crumbs.map((c, i) => (
          <span key={i}>
            <span className={i === crumbs.length - 1 ? "cur" : ""}>{c}</span>
            {i < crumbs.length - 1 && <span className="sep">/</span>}
          </span>
        ))}
      </nav>
      <div className="actions">
        <input className="search" placeholder="Search members, branches, sermons…" />
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
          <span className="swatch" />
          <span>{theme === "light" ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
}
