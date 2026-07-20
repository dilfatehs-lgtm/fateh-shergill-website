/**
 * Vancouver skyline, drawn as brass line art.
 *
 * Hand-authored SVG rather than stock footage: ~4KB, no licensing, no
 * loading state, no mobile data cost, and nobody else's site has it. Every
 * stroke uses pathLength="1" so one CSS keyframe draws all of them evenly
 * regardless of their real length.
 *
 * Left to right: the North Shore ridge, Lions Gate Bridge, the downtown
 * cluster with Harbour Centre and Canada Place, and Science World.
 */
export default function Skyline({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  // Stagger: back layers first, so it reads as depth being built up.
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 300"
      /* `meet`, not `slice` — slice crops the sides and loses Science World
         and the bridge on wide-but-short containers. */
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      className={`skyline ${className}`}
      style={style}
    >
      {/* ── North Shore mountains ─────────────────────────────────── */}
      <g stroke="var(--color-brass)" strokeWidth="1" opacity="0.34">
        <path
          pathLength="1"
          style={d(0)}
          d="M0 186 L86 148 L146 170 L228 118 L298 156 L378 130 L468 174 L556 144 L648 166 L758 138 L868 168 L978 148 L1088 176 L1198 146 L1318 170 L1440 152"
        />
        <path
          pathLength="1"
          style={d(180)}
          opacity="0.6"
          d="M0 210 L120 182 L212 200 L330 166 L430 194 L540 178 L660 198 L780 174 L900 196 L1020 180 L1150 202 L1280 182 L1440 196"
        />
      </g>

      {/* ── Lions Gate Bridge ─────────────────────────────────────── */}
      <g stroke="var(--color-brass)" strokeWidth="1.1" opacity="0.5">
        {/* deck */}
        <path pathLength="1" style={d(420)} d="M18 236 H248" />
        {/* towers */}
        <path pathLength="1" style={d(520)} d="M84 236 V170 M96 236 V170 M84 178 H96" />
        <path pathLength="1" style={d(560)} d="M182 236 V170 M194 236 V170 M182 178 H194" />
        {/* main cable */}
        <path
          pathLength="1"
          style={d(620)}
          d="M18 206 Q52 178 90 174 Q140 214 188 174 Q222 178 248 202"
        />
      </g>

      {/* ── Downtown cluster ──────────────────────────────────────── */}
      <g stroke="var(--color-brass)" strokeWidth="1.2" opacity="0.72">
        <path pathLength="1" style={d(760)} d="M262 276 V214 H298 V276" />
        <path pathLength="1" style={d(790)} d="M304 276 V188 H332 V276" />
        <path pathLength="1" style={d(820)} d="M338 276 V230 H380 V276" />

        {/* Canada Place sails */}
        <path
          pathLength="1"
          style={d(860)}
          d="M394 254 L414 216 L434 254 M430 254 L450 214 L470 254 M466 254 L486 218 L506 254 M388 254 H512"
        />

        <path pathLength="1" style={d(930)} d="M520 276 V196 H552 V276" />

        {/* Harbour Centre — stalk, saucer, spire */}
        <path pathLength="1" style={d(980)} d="M592 276 V152 M612 276 V152" />
        <path
          pathLength="1"
          style={d(1030)}
          d="M568 152 Q602 134 636 152 Q602 168 568 152 Z"
        />
        <path pathLength="1" style={d(1080)} d="M602 134 V104" />

        <path pathLength="1" style={d(1000)} d="M652 276 V176 H690 V276" />
        <path pathLength="1" style={d(1030)} d="M698 276 V206 H724 V276" />

        {/* tallest tower, with a suggestion of structure */}
        <path pathLength="1" style={d(1060)} d="M732 276 V158 H782 V276" />
        <path
          pathLength="1"
          style={d(1180)}
          strokeWidth="0.7"
          opacity="0.55"
          d="M757 276 V158 M732 196 H782 M732 232 H782"
        />

        <path pathLength="1" style={d(1090)} d="M790 276 V202 H824 V276" />

        {/* tapered tower (Vancouver House cue) */}
        <path pathLength="1" style={d(1120)} d="M836 276 V178 L862 142 H886 V276" />

        <path pathLength="1" style={d(1150)} d="M894 276 V190 H936 V276" />
        <path pathLength="1" style={d(1180)} d="M944 276 V212 H972 V276" />
        <path pathLength="1" style={d(1210)} d="M980 276 V168 H1026 V276" />
        <path pathLength="1" style={d(1240)} d="M1034 276 V200 H1066 V276" />
        <path pathLength="1" style={d(1270)} d="M1074 276 V222 H1112 V276" />
      </g>

      {/* ── Science World ─────────────────────────────────────────── */}
      <g stroke="var(--color-brass)" strokeWidth="1.1" opacity="0.6">
        <path
          pathLength="1"
          style={d(1320)}
          d="M1168 276 A42 42 0 0 1 1252 276"
        />
        <path
          pathLength="1"
          style={d(1400)}
          strokeWidth="0.7"
          opacity="0.6"
          d="M1210 234 V276 M1180 252 H1240 M1188 244 L1232 268 M1232 244 L1188 268"
        />
      </g>

      {/* ── Waterline ─────────────────────────────────────────────── */}
      <path
        pathLength="1"
        style={d(300)}
        stroke="var(--color-brass)"
        strokeWidth="1"
        opacity="0.45"
        d="M0 276 H1440"
      />
    </svg>
  );
}
