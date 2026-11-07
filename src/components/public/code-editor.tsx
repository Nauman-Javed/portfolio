type Kind = "kw" | "str" | "fn" | "plain";
type Token = [Kind, string];

const tone: Record<Kind, string> = {
  kw: "text-teal",
  str: "text-warn-fg",
  fn: "text-teal-light",
  plain: "text-codefg",
};

const str = (value: string): Token => ["str", `"${value}"`];

export function CodeEditor({
  name,
  role,
  location,
  years,
  email,
  available,
}: {
  name: string;
  role: string;
  location: string | null;
  years: number;
  email: string;
  available: boolean;
}) {
  const lines: Token[][] = [
    [
      ["kw", "import"],
      ["plain", " { "],
      ["fn", "ship"],
      ["plain", " } "],
      ["kw", "from"],
      ["plain", " "],
      str("./craft"),
      ["plain", ";"],
    ],
    [],
    [
      ["kw", "export const"],
      ["plain", " engineer = {"],
    ],
    [["plain", "  name: "], str(name), ["plain", ","]],
    [["plain", "  role: "], str(role), ["plain", ","]],
    ...(location
      ? [[["plain", "  base: "], str(location), ["plain", ","]] as Token[]]
      : []),
    ...(years > 0
      ? [
          [
            ["plain", "  experience: "],
            str(`${years}+ years`),
            ["plain", ","],
          ] as Token[],
        ]
      : []),
    [
      ["plain", "  openToWork: "],
      ["kw", String(available)],
      ["plain", ","],
    ],
    [["plain", "};"]],
    [],
    [
      ["kw", "export function"],
      ["plain", " "],
      ["fn", "getInTouch"],
      ["plain", "() {"],
    ],
    [
      ["plain", "  "],
      ["kw", "return"],
      ["plain", " "],
      ["fn", "ship"],
      ["plain", "("],
      str(email),
      ["plain", ");"],
    ],
    [["plain", "}"]],
  ];

  return (
    <div
      aria-hidden="true"
      className="dark border-hairline bg-codebg shadow-float overflow-hidden rounded-[10px] border"
    >
      <div className="bg-topbar border-hairline flex items-center gap-4 border-b px-4">
        <div className="flex gap-1.5 py-3">
          <span className="bg-rose size-2.5 rounded-full" />
          <span className="bg-warn-fg size-2.5 rounded-full" />
          <span className="bg-teal size-2.5 rounded-full" />
        </div>
        <div className="flex gap-1 font-mono text-xs">
          <span className="bg-codebg text-fg border-hairline rounded-t-md border border-b-0 px-3 py-2">
            server.ts
          </span>
        </div>
      </div>
      <div className="overflow-hidden p-4 pb-16 font-mono text-[13px] leading-[1.85]">
        {lines.map((tokens, i) => {
          const text = tokens.map(([, v]) => v).join("");
          return (
            <div key={i} className="flex gap-4">
              <span className="text-fg3 w-5 shrink-0 text-right select-none">
                {i + 1}
              </span>
              <span
                className="anim-type block overflow-hidden whitespace-pre"
                style={
                  {
                    "--w": `${Math.max(text.length, 1)}ch`,
                    "--n": Math.max(text.length, 1),
                    "--d": `${0.4 + i * 0.4}s`,
                  } as React.CSSProperties
                }
              >
                {tokens.map(([kind, value], j) => (
                  <span key={j} className={tone[kind]}>
                    {value}
                  </span>
                ))}
                {tokens.length === 0 && " "}
              </span>
            </div>
          );
        })}
        <div className="flex gap-4">
          <span className="text-fg3 w-5 shrink-0 text-right select-none">
            {lines.length + 1}
          </span>
          <span className="anim-caret bg-teal inline-block h-[1.1em] w-[7px] translate-y-[3px]" />
        </div>
      </div>
    </div>
  );
}
