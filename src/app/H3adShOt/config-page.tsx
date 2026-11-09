"use client";

import { useMemo, useState } from "react";
import { player, sections, type JsonValue, type Section } from "./data";

type Obj = { [k: string]: JsonValue };
type ListRow = [string, string, { accent?: boolean }?];

const isObj = (v: JsonValue): v is Obj => typeof v === "object";
const has = (text: unknown, q: string) =>
  String(text).toLowerCase().includes(q);

function countLeaves(o: Obj): number {
  return Object.values(o).reduce<number>(
    (n, v) => n + (isObj(v) ? countLeaves(v) : 1),
    0,
  );
}

function filterObj(o: Obj, q: string): Obj {
  const out: Obj = {};
  for (const [k, v] of Object.entries(o)) {
    if (isObj(v)) {
      if (has(k, q)) out[k] = v;
      else {
        const inner = filterObj(v, q);
        if (Object.keys(inner).length) out[k] = inner;
      }
    } else if (has(k, q) || has(v, q)) out[k] = v;
  }
  return out;
}

type View =
  | { section: Section; kind: "list"; rows: ListRow[]; count: number }
  | { section: Section; kind: "json"; data: Obj; count: number }
  | { section: Section; kind: "line"; count: number };

function view(section: Section, q: string): View {
  const all = !q || has(section.title, q);
  if (section.kind === "list") {
    const rows = all
      ? section.rows
      : section.rows.filter(([l, v]) => has(l, q) || has(v, q));
    return { section, kind: "list", rows, count: rows.length };
  }
  if (section.kind === "json") {
    const data = all ? section.data : filterObj(section.data, q);
    return { section, kind: "json", data, count: countLeaves(data) };
  }
  const count = all || has(section.value, q) ? 1 : 0;
  return { section, kind: "line", count };
}

function Icon({ d }: { d: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}

function CopyButton({
  text,
  className = "",
  icon = true,
}: {
  text: string;
  className?: string;
  icon?: boolean;
}) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`hs-copy ${done ? "is-done" : ""} ${className}`}
    >
      {icon && (
        <Icon
          d={
            <>
              <rect x="9" y="9" width="11" height="11" />
              <path d="M5 15V5h10" />
            </>
          }
        />
      )}
      {done ? "Copied ✓" : "Copy code"}
    </button>
  );
}

function Json({ data, level = 0 }: { data: Obj; level?: number }) {
  const entries = Object.entries(data);
  return (
    <>
      {entries.map(([k, v], i) => {
        const comma = i < entries.length - 1 ? "," : "";
        return (
          <div key={k} style={{ paddingLeft: level ? 18 : 0 }}>
            <span className="j-key">&quot;{k}&quot;</span>
            <span className="j-p">: </span>
            {isObj(v) ? (
              <>
                <span className="j-p">{"{"}</span>
                <Json data={v} level={level + 1} />
                <span className="j-p">
                  {"}"}
                  {comma}
                </span>
              </>
            ) : (
              <>
                <span
                  className={
                    typeof v === "number"
                      ? "j-num"
                      : typeof v === "boolean"
                        ? "j-bool"
                        : "j-str"
                  }
                >
                  {typeof v === "string" ? `"${v}"` : String(v)}
                </span>
                <span className="j-p">{comma}</span>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export function ConfigPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const views = useMemo(() => sections.map((s) => view(s, q)), [q]);
  const total = views.reduce((n, v) => n + v.count, 0);

  const edpi = Math.round(player.sensitivity * player.dpi);
  const cm360 = (
    (360 / (0.022 * player.sensitivity * player.dpi)) *
    2.54
  ).toFixed(1);
  const stats: [string, string, string, boolean?][] = [
    ["Sensitivity", "In-game", String(player.sensitivity)],
    ["eDPI", "Sens × DPI", String(edpi), true],
    ["DPI", "1000 Hz polling", String(player.dpi)],
    ["cm / 360°", "Mouse travel per turn", cm360],
    ["Resolution", "4:3 stretched", "1280×960"],
    ["Refresh rate", "Max FPS 723", "180 Hz"],
  ];

  return (
    <div id="top">
      <header className="hs-header">
        <a href="#top" className="hs-logo">
          <span className="hs-diamond" aria-hidden="true" />
          <span>
            cfg<b>lab</b>
          </span>
        </a>
        <span className="hs-meta">Counter-Strike 2</span>
      </header>

      <section className="hs-hero" aria-label="Profile">
        <div className="hs-hero-in">
          <div className="hs-eyebrow">
            <span className="hs-pill">CS2</span>
            <span>Player config</span>
            <span className="hs-dim">{"//"}</span>
            <span>Updated {player.updated}</span>
          </div>
          <h1>{player.name}</h1>
          <div className="hs-chips">
            {(
              [
                ["Premier", player.rank],
                ["FACEIT", player.faceit],
              ] as const
            ).map(([l, v]) => (
              <span key={l} className="hs-chip">
                <b>{l}</b> {v}
              </span>
            ))}
          </div>
          <div className="hs-links">
            <a className="hs-outline" href={player.steamUrl}>
              Steam ↗
            </a>
            <a className="hs-outline" href={player.faceitUrl}>
              FACEIT ↗
            </a>
          </div>
          <div className="hs-xhair">
            <span className="hs-label">Crosshair code</span>
            <div className="hs-xrow">
              <code>{player.crosshairCode}</code>
              <CopyButton
                text={player.crosshairCode}
                icon={false}
                className="hs-angled"
              />
            </div>
            <p>In CS2: Settings › Game › Crosshair › Share or import</p>
          </div>
        </div>
      </section>

      <div className="hs-body">
        <aside className="hs-side" aria-label="Config navigation">
          <div role="search">
            <div className="hs-search">
              <span className="hs-search-ico">
                <Icon
                  d={
                    <>
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </>
                  }
                />
              </span>
              <label htmlFor="hs-q" className="hs-sr">
                Search settings
              </label>
              <input
                id="hs-q"
                type="search"
                placeholder="Search settings"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="hs-clear"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <Icon d={<path d="M6 6l12 12M18 6 6 18" />} />
                </button>
              )}
            </div>
            <p className="hs-count" aria-live="polite">
              {q && `${total} ${total === 1 ? "match" : "matches"}`}
            </p>
          </div>

          <nav aria-label="Sections">
            <span className="hs-label">Sections</span>
            {views.map((v, i) => (
              <a
                key={v.section.id}
                href={`#${v.section.id}`}
                className={q ? (v.count ? "hit" : "miss") : ""}
              >
                <i>{String(i + 1).padStart(2, "0")}</i>
                <span>{v.section.title}</span>
                <i>{v.count}</i>
              </a>
            ))}
          </nav>
        </aside>

        <main className="hs-content">
          <div className="hs-inner">
            <div className="hs-stats">
              {stats.map(([l, s, v, accent]) => (
                <div key={l} className="hs-stat">
                  <div>
                    <span className="hs-label">{l}</span>
                    <small>{s}</small>
                  </div>
                  <strong className={accent ? "acc" : ""}>{v}</strong>
                </div>
              ))}
            </div>

            {views.map((v, i) => {
              if (q && v.count === 0) return null;
              const s = v.section;
              return (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-h`}
                  className="hs-section"
                >
                  <div className="hs-sh">
                    <span className="hs-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 id={`${s.id}-h`}>{s.title}</h2>
                    <span className="hs-rule" />
                    <span className="hs-path">{s.path}</span>
                  </div>

                  {v.kind === "list" && (
                    <dl className="hs-list">
                      {v.rows.map(([l, val, o]) => (
                        <div key={l} className="hs-row">
                          <dt>{l}</dt>
                          <dd className={o?.accent ? "acc" : ""}>{val}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {v.kind === "json" && s.kind === "json" && (
                    <div className="hs-json">
                      <div className="hs-bar">
                        <span>{s.file}</span>
                        <CopyButton text={JSON.stringify(s.data, null, 2)} />
                      </div>
                      <pre>
                        <code>
                          <span className="j-p">{"{"}</span>
                          <div style={{ paddingLeft: 18 }}>
                            <Json data={v.data} />
                          </div>
                          <span className="j-p">{"}"}</span>
                        </code>
                      </pre>
                    </div>
                  )}

                  {v.kind === "line" && s.kind === "line" && (
                    <div className="hs-line">
                      <code>{s.value}</code>
                      <CopyButton text={s.value} />
                    </div>
                  )}
                </section>
              );
            })}

            {q && total === 0 && (
              <div className="hs-empty">
                <h2>No settings found</h2>
                <p>
                  Nothing matches &quot;{query.trim()}&quot;. Try another word.
                </p>
                <button
                  type="button"
                  className="hs-outline acc-btn"
                  onClick={() => setQuery("")}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="hs-footer">
        <span>© CFGLAB</span>
        <span>
          Not affiliated with Valve. Counter-Strike 2 is a trademark of Valve
          Corporation.
        </span>
      </footer>
    </div>
  );
}
