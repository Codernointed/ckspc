"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { navGroups, branches } from "../lib/mock-data";
import { canAccess, roleLabel, type ModuleKey } from "../lib/auth/rbac";
import { useState } from "react";

type SidebarUser = {
  name?: string | null;
  role?: string | null;
  branch?: string | null;
};

/** Derive the RBAC module key from a nav href (first path segment). */
function moduleFromHref(href: string): ModuleKey {
  const seg = href.split("/").filter(Boolean)[0] ?? "hq";
  // The branch directory + per-branch view both map to the "branch" module.
  if (seg === "branches") return "branch";
  return seg as ModuleKey;
}

export function Sidebar({ user }: { user?: SidebarUser }) {
  const pathname = usePathname();
  const [openBranch, setOpenBranch] = useState(false);
  const activeBranch =
    branches.find((b) => b.name === user?.branch) ?? branches[0];

  const role = user?.role ?? "member";
  const initial = (user?.name ?? "?").trim().charAt(0).toUpperCase();

  // Filter nav groups by what this role can reach.
  const visibleGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canAccess(role, moduleFromHref(item.href))),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="logo">
          <Image src="/brand/logo.jpg" alt="CKSPC" width={40} height={40} />
        </div>
        <div>
          <div className="name">CKSPC <span className="flame" /></div>
          <div className="sub">Sacred Flow · platform</div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <button className="branch-pill" onClick={() => setOpenBranch((v) => !v)} aria-haspopup="listbox" aria-expanded={openBranch}>
          <span className="star">✦</span>
          <div className="info">
            <span className="name">{activeBranch.name}</span>
            <span className="sub">{activeBranch.tier} · {activeBranch.code}</span>
          </div>
          <span className="chev">▾</span>
        </button>
        {openBranch && (
          <ul role="listbox" style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "var(--bg-raised)", color: "var(--fg)",
            border: "1px solid var(--border)", borderRadius: "var(--r-md)",
            marginTop: "var(--space-2)", padding: "var(--space-2)",
            listStyle: "none", zIndex: 20, boxShadow: "var(--shadow-md)",
          }}>
            <li style={{ padding: "var(--space-2) var(--space-3)", fontSize: 10, color: "var(--fg-subtle)", letterSpacing: "var(--tracking-wider)", textTransform: "uppercase" }}>
              Switch branch
            </li>
            {branches.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/branch/${b.slug}`}
                  onClick={() => setOpenBranch(false)}
                  style={{
                    display: "flex", justifyContent: "space-between", gap: 8,
                    padding: "var(--space-2) var(--space-3)",
                    borderRadius: "var(--r-sm)",
                    color: "var(--fg)", fontSize: "var(--fs-sm)",
                    textDecoration: "none",
                    background: b.slug === activeBranch.slug ? "var(--brand-soft)" : "transparent",
                  }}
                >
                  <span>{b.name}</span>
                  <span className="mono" style={{ color: "var(--fg-subtle)", fontSize: 10 }}>{b.code}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {visibleGroups.map((group) => (
        <nav key={group.heading} className="nav-group">
          <div className="heading">{group.heading}</div>
          {group.items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item${isActive ? " active" : ""}`}
              >
                <Glyph />
                <span>{item.label}</span>
                {item.count && <span className="count">{item.count}</span>}
              </Link>
            );
          })}
        </nav>
      ))}

      <div className="user-row">
        <div className="avatar">{initial}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="name">{user?.name ?? "Unknown user"}</div>
          <div className="role">{roleLabel(role)}</div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Sign out"
          aria-label="Sign out"
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--fg-subtle)",
            borderRadius: "var(--r-sm)",
            padding: "4px 8px",
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          ⎋
        </button>
      </div>
    </aside>
  );
}

function Glyph() {
  return (
    <svg className="glyph" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
