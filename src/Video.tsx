import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  interpolateColors,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import timeline from "../public/timeline.json";

const C = {
  bg: "#0A0E14",
  panel: "#131A24",
  line: "#243041",
  muted: "#6B7789",
  text: "#EAF0F7",
  amber: "#FFB020",
  cyan: "#3DD6F5",
  red: "#FF5C5C",
  green: "#4ADE80",
  ghost: "#2A3340",
};
const FONT = "'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const fade = (f: number, start: number, dur = 12) =>
  interpolate(f, [start, start + dur], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
const rise = (f: number, start: number, dist = 40) =>
  interpolate(f, [start, start + 16], [dist, 0], { ...clamp, easing: Easing.out(Easing.cubic) });

const Center: React.FC<{ children: React.ReactNode; top?: number; height?: number }> = ({
  children,
  top = 250,
  height = 980,
}) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top,
      height,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
    }}
  >
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; opacity?: number }> = ({
  children,
  color = C.muted,
  size = 34,
  opacity = 1,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontSize: size,
      fontWeight: 700,
      letterSpacing: 6,
      textTransform: "uppercase",
      color,
      opacity,
    }}
  >
    {children}
  </div>
);

const Seat: React.FC<{ color: string; size?: number; opacity?: number; outline?: boolean }> = ({
  color,
  size = 110,
  opacity = 1,
  outline = false,
}) => (
  <div style={{ width: size, height: size, position: "relative", opacity }}>
    <div
      style={{
        position: "absolute",
        top: size * 0.14,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: size * 0.24,
        background: outline ? "transparent" : color,
        border: outline ? `4px dashed ${color}` : "none",
        boxSizing: "border-box",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: size * 0.2,
        right: size * 0.2,
        height: size * 0.18,
        borderRadius: size * 0.09,
        background: outline ? "transparent" : color,
        border: outline ? `4px dashed ${color}` : "none",
        filter: outline ? "none" : "brightness(0.78)",
        boxSizing: "border-box",
      }}
    />
  </div>
);

const Person: React.FC<{ color: string; size?: number; opacity?: number; ghost?: boolean }> = ({
  color,
  size = 120,
  opacity = 1,
  ghost = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
    <circle cx="50" cy="32" r="18" fill={ghost ? "none" : color} stroke={color} strokeWidth={ghost ? 4 : 0} strokeDasharray={ghost ? "7 6" : undefined} />
    <path
      d="M16 92 C16 62 34 54 50 54 C66 54 84 62 84 92 Z"
      fill={ghost ? "none" : color}
      stroke={color}
      strokeWidth={ghost ? 4 : 0}
      strokeDasharray={ghost ? "7 6" : undefined}
    />
  </svg>
);

/* ---------- Scene 1: hook ---------- */
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const sold = Math.round(interpolate(f, [50, 80], [10, 12], clamp));
  const over = sold > 10;
  return (
    <Center>
      <div style={{ display: "flex", gap: 120 }}>
        <div style={{ textAlign: "center", opacity: fade(f, 0) }}>
          <Label>Seats</Label>
          <div style={{ fontFamily: FONT, fontSize: 190, fontWeight: 800, color: C.text, lineHeight: 1.05 }}>10</div>
        </div>
        <div style={{ textAlign: "center", opacity: fade(f, 8) }}>
          <Label>Tickets sold</Label>
          <div style={{ fontFamily: FONT, fontSize: 190, fontWeight: 800, color: over ? C.red : C.text, lineHeight: 1.05 }}>
            {sold}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 70 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 110px)", gap: 28 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ opacity: fade(f, 4 + i * 3), transform: `scale(${0.7 + 0.3 * fade(f, 4 + i * 3)})` }}>
              <Seat color={C.amber} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                opacity: fade(f, 55 + i * 12),
                transform: `translateX(${rise(f, 55 + i * 12, 120)}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Seat color={C.red} outline />
              <Label color={C.red} size={24}>
                No seat
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Center>
  );
};

/* ---------- Scene 2: perishable seat ---------- */
const Perishable: React.FC = () => {
  const f = useCurrentFrame();
  const progress = interpolate(f, [20, 150], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const seatColor = interpolateColors(f, [140, 165], [C.amber, C.ghost]);
  const zero = fade(f, 160);
  return (
    <Center>
      <div style={{ opacity: fade(f, 0), transform: `scale(${1 + 0.05 * Math.sin(f / 6) * (1 - zero)})` }}>
        <Seat color={seatColor} size={300} />
      </div>
      <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 140, color: C.red, opacity: zero, transform: `translateY(${rise(f, 160, 30)}px)` }}>
          $0
        </div>
      </div>
      <div style={{ width: 820, opacity: fade(f, 6) }}>
        <div style={{ position: "relative", height: 14, borderRadius: 7, background: C.line }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress * 100}%`, borderRadius: 7, background: C.amber }} />
          <div
            style={{
              position: "absolute",
              top: -17,
              left: `calc(${progress * 100}% - 24px)`,
              width: 48,
              height: 48,
              borderRadius: 24,
              background: C.text,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
          <Label size={28}>Boarding</Label>
          <Label size={28} color={progress > 0.97 ? C.red : C.muted}>
            Takeoff
          </Label>
        </div>
      </div>
    </Center>
  );
};

/* ---------- Scene 3: no-shows ---------- */
const NoShow: React.FC = () => {
  const f = useCurrentFrame();
  const missing = [
    { idx: 2, at: 40, label: "Missed connection" },
    { idx: 6, at: 95, label: "Changed plans" },
    { idx: 9, at: 150, label: "Traffic" },
  ];
  return (
    <Center>
      <Label color={C.cyan} opacity={fade(f, 0)}>
        Boarding gate
      </Label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 170px)", gap: 30 }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const m = missing.find((x) => x.idx === i);
          const gone = m ? fade(f, m.at, 14) : 0;
          return (
            <div key={i} style={{ opacity: fade(f, i * 2), display: "flex", justifyContent: "center" }}>
              {gone > 0.5 ? (
                <Person color={C.muted} ghost size={140} opacity={0.9} />
              ) : (
                <Person color={C.text} size={140} opacity={1} />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start", width: 640, minHeight: 200 }}>
        {missing.map((m) => (
          <div
            key={m.label}
            style={{
              opacity: fade(f, m.at + 4),
              transform: `translateX(${rise(f, m.at + 4, 40)}px)`,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 44,
              color: C.red,
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <span style={{ width: 16, height: 16, borderRadius: 8, background: C.red, display: "inline-block" }} />
            {m.label}
          </div>
        ))}
      </div>
    </Center>
  );
};

/* ---------- Scene 4: data / prediction ---------- */
const DataScene: React.FC = () => {
  const f = useCurrentFrame();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const vals = [0.45, 0.58, 0.4, 0.66, 0.84, 0.95, 0.7];
  const W = 900;
  const H = 520;
  const barW = 90;
  const gap = (W - barW * 7) / 6;
  const pts = vals.map((v, i) => [i * (barW + gap) + barW / 2, H - v * H] as const);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const draw = interpolate(f, [90, 150], [1, 0], clamp);
  return (
    <Center>
      <Label color={C.cyan} opacity={fade(f, 0)}>
        Predicted no-shows
      </Label>
      <div style={{ position: "relative", width: W, height: H + 70 }}>
        {vals.map((v, i) => {
          const h = interpolate(f, [8 + i * 6, 38 + i * 6], [0, v * H], { ...clamp, easing: Easing.out(Easing.cubic) });
          return (
            <div key={i} style={{ position: "absolute", left: i * (barW + gap), bottom: 70, width: barW }}>
              <div style={{ height: h, borderRadius: 16, background: C.panel, border: `3px solid ${C.cyan}`, boxSizing: "border-box" }} />
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Label size={26}>{days[i]}</Label>
              </div>
            </div>
          );
        })}
        <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <path d={path} fill="none" stroke={C.amber} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={draw} transform="translate(0,0)" />
        </svg>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {["Route", "Day", "Hour"].map((t, i) => (
          <div
            key={t}
            style={{
              opacity: fade(f, 110 + i * 14),
              transform: `scale(${0.8 + 0.2 * fade(f, 110 + i * 14)})`,
              padding: "18px 38px",
              borderRadius: 50,
              border: `3px solid ${C.amber}`,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 40,
              color: C.amber,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </Center>
  );
};

/* ---------- Scene 5: extra tickets ---------- */
const Extra: React.FC = () => {
  const f = useCurrentFrame();
  const out = (i: number) => fade(f, 85 + (i - 10) * 8, 12);
  const showUp = f > 100 ? 10 : 12;
  return (
    <Center>
      <div style={{ opacity: fade(f, 0), fontFamily: FONT, fontWeight: 800, fontSize: 84, color: C.text, textAlign: "center", lineHeight: 1.15 }}>
        <span style={{ color: C.amber }}>10</span> seats <span style={{ color: C.muted }}>+</span> <span style={{ color: C.cyan }}>2</span> extra
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 120px)", gap: 28 }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const isExtra = i >= 10;
          const gone = isExtra ? out(i) : 0;
          return (
            <div key={i} style={{ opacity: fade(f, 6 + i * 3), display: "flex", justifyContent: "center" }}>
              <Person color={isExtra ? C.cyan : C.amber} size={120} ghost={gone > 0.5} opacity={gone > 0.5 ? 0.8 : 1} />
            </div>
          );
        })}
      </div>
      <div style={{ opacity: fade(f, 100), textAlign: "center" }}>
        <Label color={C.green} size={40}>
          {showUp} show up · 10 seats
        </Label>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 150, color: C.green, lineHeight: 1.1, transform: `scale(${0.7 + 0.3 * fade(f, 104)})` }}>✓</div>
      </div>
    </Center>
  );
};

/* ---------- Scene 6: volunteers ---------- */
const Volunteers: React.FC = () => {
  const f = useCurrentFrame();
  const offers = [
    { amt: "$200", at: 15 },
    { amt: "$400", at: 75 },
    { amt: "$600", at: 135 },
  ];
  const accepted = fade(f, 195);
  return (
    <Center>
      <Label color={C.amber} opacity={fade(f, 0)}>
        Any volunteers?
      </Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 820 }}>
        {offers.map((o, i) => {
          const isLast = i === offers.length - 1;
          const next = offers[i + 1];
          const dim = next ? fade(f, next.at) * 0.55 : 0;
          const border = isLast && accepted > 0.5 ? C.green : C.line;
          return (
            <div
              key={o.amt}
              style={{
                opacity: fade(f, o.at) * (1 - dim),
                transform: `translateY(${rise(f, o.at, 60)}px)`,
                padding: "34px 48px",
                borderRadius: 30,
                background: C.panel,
                border: `4px solid ${border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Label size={30}>Offer {i + 1}</Label>
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 100, color: isLast && accepted > 0.5 ? C.green : C.text }}>{o.amt}</div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 90, textAlign: "center" }}>
        <div style={{ opacity: accepted, transform: `translateY(${rise(f, 195, 24)}px)`, fontFamily: FONT, fontWeight: 800, fontSize: 56, color: C.green }}>
          Someone says yes
        </div>
      </div>
      <Label size={22} opacity={fade(f, 20) * 0.8}>
        Illustrative amounts
      </Label>
    </Center>
  );
};

/* ---------- Scene 7: payoff ---------- */
const Payoff: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Center>
      <div style={{ opacity: fade(f, 4), transform: `translateY(${rise(f, 4)}px)`, fontFamily: FONT, fontWeight: 800, fontSize: 88, color: C.muted, textAlign: "center", lineHeight: 1.1 }}>
        Not a mistake.
      </div>
      <div style={{ opacity: fade(f, 50), transform: `translateY(${rise(f, 50)}px)`, fontFamily: FONT, fontWeight: 800, fontSize: 104, color: C.amber, textAlign: "center", lineHeight: 1.1, padding: "0 70px" }}>
        A bet on human unreliability.
      </div>
      <div style={{ opacity: fade(f, 120), marginTop: 60 }}>
        <Label color={C.text} size={44}>
          The Mechanism
        </Label>
      </div>
    </Center>
  );
};

const SCENES: Record<string, React.FC> = {
  hook: Hook,
  perishable: Perishable,
  noshow: NoShow,
  data: DataScene,
  extra: Extra,
  volunteers: Volunteers,
  payoff: Payoff,
};

/* ---------- Captions ---------- */
type Beat = (typeof timeline.beats)[number];

const phrases = (text: string): string[] => {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let cur: string[] = [];
  for (const w of words) {
    cur.push(w);
    if (cur.length >= 4 || /[.,?!]$/.test(w)) {
      out.push(cur.join(" "));
      cur = [];
    }
  }
  if (cur.length) out.push(cur.join(" "));
  return out;
};

const Captions: React.FC<{ beat: Beat }> = ({ beat }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ps = phrases(beat.text);
  const total = ps.reduce((a, p) => a + p.length, 0);
  const voiceFrames = beat.voiceSec * fps;
  let acc = 0;
  let active = ps[ps.length - 1];
  let pStart = 0;
  for (const p of ps) {
    const s = (acc / total) * voiceFrames;
    const e = ((acc + p.length) / total) * voiceFrames;
    if (f >= s && f < e) {
      active = p;
      pStart = s;
      break;
    }
    acc += p.length;
    pStart = s;
  }
  const o = interpolate(f - pStart, [0, 5], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 1320,
        height: 240,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 72,
        lineHeight: 1.15,
        color: C.text,
        opacity: o,
        textShadow: "0 4px 18px rgba(0,0,0,0.9)",
      }}
    >
      {active}
    </div>
  );
};

/* ---------- Root video ---------- */
export const Mechanism: React.FC = () => {
  const f = useCurrentFrame();
  const total = timeline.totalFrames;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1000px 900px at 50% 38%, #14202E 0%, ${C.bg} 70%)`,
        }}
      />
      <Audio src={staticFile("voice.wav")} />

      {/* header */}
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 18 }}>
        <div style={{ width: 16, height: 16, borderRadius: 8, background: C.amber }} />
        <Label color={C.text} size={34}>
          The Mechanism
        </Label>
      </div>
      <div style={{ position: "absolute", top: 80, left: 100, right: 100, height: 6, borderRadius: 3, background: C.line }}>
        <div style={{ width: `${(f / total) * 100}%`, height: "100%", borderRadius: 3, background: C.amber }} />
      </div>

      {timeline.beats.map((b, i) => {
        const Scene = SCENES[b.scene];
        const last = i === timeline.beats.length - 1;
        const dur = last ? total - b.startFrame : b.durFrames;
        return (
          <Sequence key={b.scene} from={b.startFrame} durationInFrames={dur}>
            <Scene />
            <Captions beat={b} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
