'use client';
// Hand-built, animated SVG illustrations. Each one visually explains how the
// part works (spinning fans, flowing coolant, data pulses, power conversion…).

function Spinner({ cx, cy, r, color, dur = '2.4s', blades = 7 }) {
  const arr = Array.from({ length: blades });
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 2} fill="#0a0c14" stroke={color} strokeOpacity="0.4" />
      <g>
        {arr.map((_, i) => {
          const a = (i / blades) * Math.PI * 2;
          const x2 = cx + Math.cos(a) * r;
          const y2 = cy + Math.sin(a) * r;
          return (
            <path
              key={i}
              d={`M${cx},${cy} Q${cx + Math.cos(a + 0.5) * r * 0.6},${cy + Math.sin(a + 0.5) * r * 0.6} ${x2},${y2}`}
              stroke={color}
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={r * 0.28} fill={color} />
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur={dur} repeatCount="indefinite" />
      </g>
    </g>
  );
}

const flow = {
  strokeDasharray: '6 10',
  animation: 'flow 1.2s linear infinite',
};

function Cpu({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <defs>
        <linearGradient id="cpuG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a1c28" />
          <stop offset="1" stopColor="#0c0e16" />
        </linearGradient>
      </defs>
      {/* pins */}
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={i}>
          <rect x={42 + i * 11} y="24" width="3" height="8" fill={c} opacity="0.5" />
          <rect x={42 + i * 11} y="108" width="3" height="8" fill={c} opacity="0.5" />
        </g>
      ))}
      <rect x="44" y="32" width="112" height="76" rx="8" fill="url(#cpuG)" stroke={c} strokeOpacity="0.55" />
      {/* CCDs */}
      <rect x="56" y="44" width="40" height="52" rx="4" fill="#11141f" stroke={c} strokeOpacity="0.4" />
      <rect x="104" y="44" width="40" height="52" rx="4" fill="#11141f" stroke={c} strokeOpacity="0.4" />
      {/* 3D V-cache glow */}
      <rect x="56" y="44" width="40" height="52" rx="4" fill={c} className="animate-pulseGlow" opacity="0.18" />
      <text x="100" y="74" textAnchor="middle" fontSize="9" fill={c} fontFamily="monospace" opacity="0.9">3D V-CACHE</text>
      {/* data pulses */}
      {[0, 1, 2].map((i) => (
        <circle key={i} r="2.4" fill={c}>
          <animateMotion dur="1.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" path="M76,96 L76,44" />
        </circle>
      ))}
    </svg>
  );
}

function Gpu({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <rect x="20" y="44" width="160" height="62" rx="8" fill="#0c0e16" stroke={c} strokeOpacity="0.5" />
      <rect x="20" y="44" width="160" height="62" rx="8" fill={c} opacity="0.06" />
      {/* shroud bar */}
      <rect x="28" y="50" width="144" height="10" rx="4" fill={c} opacity="0.25" />
      <Spinner cx={60} cy={80} r={18} color={c} dur="1.8s" />
      <Spinner cx={100} cy={80} r={18} color={c} dur="2.2s" />
      <Spinner cx={140} cy={80} r={18} color={c} dur="1.6s" />
      {/* PCIe edge */}
      <rect x="44" y="106" width="70" height="8" fill={c} opacity="0.5" />
      {/* heat waves */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${50 + i * 50},44 q6,-10 0,-18`} stroke={c} strokeWidth="1.5" fill="none" opacity="0.5">
          <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  );
}

function Mobo({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <rect x="16" y="14" width="168" height="112" rx="6" fill="#0b1411" stroke={c} strokeOpacity="0.5" />
      {/* socket */}
      <rect x="34" y="30" width="46" height="46" rx="4" fill="#11141f" stroke={c} strokeOpacity="0.6" />
      {/* RAM slots */}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={96 + i * 9} y="28" width="4" height="50" fill={c} opacity="0.4" />)}
      {/* PCIe slot */}
      <rect x="34" y="92" width="110" height="9" rx="2" fill={c} opacity="0.35" />
      {/* M.2 / chipset */}
      <rect x="150" y="86" width="22" height="22" rx="3" fill="#11141f" stroke={c} strokeOpacity="0.5" />
      {/* animated signal traces */}
      {[
        'M80,53 L96,53', 'M80,60 L150,98', 'M57,76 L57,92', 'M144,96 L150,96',
      ].map((d, i) => (
        <path key={i} d={d} stroke={c} strokeWidth="1.6" fill="none" style={flow} opacity="0.8" />
      ))}
      <circle cx="57" cy="53" r="3" fill={c} className="animate-pulseGlow" />
    </svg>
  );
}

function Ram({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      {[0, 1].map((s) => (
        <g key={s} transform={`translate(${64 + s * 36},0)`}>
          <rect x="0" y="22" width="26" height="96" rx="4" fill="#0c0e16" stroke={c} strokeOpacity="0.55" />
          {/* heatspreader notch */}
          <rect x="2" y="26" width="22" height="14" rx="2" fill={c} opacity="0.22" />
          {/* chips */}
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={i} x="4" y={46 + i * 14} width="18" height="10" rx="1.5" fill="#11141f" stroke={c} strokeOpacity="0.35" />
          ))}
          {/* contacts */}
          {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={2 + i * 2.6} y="114" width="1.4" height="4" fill={c} opacity="0.6" />)}
          {/* data pulse */}
          <circle r="2.2" fill={c}>
            <animateMotion dur="1.5s" begin={`${s * 0.4}s`} repeatCount="indefinite" path="M13,116 L13,30" />
          </circle>
        </g>
      ))}
      <text x="100" y="16" textAnchor="middle" fontSize="8" fill={c} fontFamily="monospace" opacity="0.8">DDR5-6000 · 1:1</text>
    </svg>
  );
}

function Ssd({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <rect x="24" y="56" width="152" height="30" rx="4" fill="#0c0e16" stroke={c} strokeOpacity="0.55" />
      {/* controller */}
      <rect x="32" y="62" width="18" height="18" rx="2" fill="#11141f" stroke={c} strokeOpacity="0.5" />
      {/* NAND blocks lighting up */}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={62 + i * 26} y="62" width="20" height="18" rx="2" fill={c} opacity="0.2">
          <animate attributeName="opacity" values="0.15;0.85;0.15" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {/* M.2 key + screw */}
      <rect x="170" y="66" width="8" height="10" rx="1" fill={c} opacity="0.5" />
      <circle cx="172" cy="71" r="2" fill="#0c0e16" stroke={c} strokeOpacity="0.6" />
      {/* PCIe lanes */}
      <path d="M24,100 L176,100" stroke={c} strokeWidth="1.6" style={flow} opacity="0.7" />
      <text x="100" y="44" textAnchor="middle" fontSize="8" fill={c} fontFamily="monospace" opacity="0.8">7,450 MB/s · PCIe 4.0 ×4</text>
    </svg>
  );
}

function Psu({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <rect x="34" y="34" width="132" height="72" rx="8" fill="#0c0e16" stroke={c} strokeOpacity="0.55" />
      <Spinner cx={70} cy={70} r={20} color={c} dur="3s" />
      {/* AC in (sine) */}
      <path d="M6,70 q5,-12 10,0 t10,0 t10,0" stroke={c} strokeWidth="1.8" fill="none" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
      </path>
      <text x="14" y="92" fontSize="7" fill={c} fontFamily="monospace" opacity="0.7">AC</text>
      {/* arrow into psu */}
      <path d="M28,70 L34,70" stroke={c} strokeWidth="1.6" markerEnd="url(#ar)" />
      {/* DC out rails */}
      {[58, 70, 82].map((y, i) => (
        <path key={i} d={`M166,${y} L196,${y}`} stroke={c} strokeWidth="1.6" style={flow} opacity="0.8" />
      ))}
      <text x="180" y="50" fontSize="7" fill={c} fontFamily="monospace" opacity="0.7">12V</text>
      <text x="120" y="98" textAnchor="middle" fontSize="8" fill={c} fontFamily="monospace" opacity="0.85">1000W · 80+ GOLD</text>
      <defs><marker id="ar" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6 z" fill={c} /></marker></defs>
    </svg>
  );
}

function Cooler({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      {/* radiator */}
      <rect x="20" y="22" width="46" height="96" rx="6" fill="#0c0e16" stroke={c} strokeOpacity="0.55" />
      {Array.from({ length: 9 }).map((_, i) => <line key={i} x1="24" y1={28 + i * 10} x2="62" y2={28 + i * 10} stroke={c} strokeOpacity="0.3" />)}
      {/* fans on rad */}
      <Spinner cx={43} cy={44} r={13} color={c} dur="2s" />
      <Spinner cx={43} cy={70} r={13} color={c} dur="2.3s" />
      <Spinner cx={43} cy={96} r={13} color={c} dur="1.9s" />
      {/* pump / cold plate */}
      <rect x="120" y="56" width="44" height="44" rx="8" fill="#11141f" stroke={c} strokeOpacity="0.6" />
      <circle cx="142" cy="78" r="12" fill={c} opacity="0.18" className="animate-pulseGlow" />
      <text x="142" y="50" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.8">PUMP</text>
      {/* tubes with coolant flow */}
      <path d="M66,40 C100,40 120,58 122,62" stroke={c} strokeWidth="3" fill="none" style={flow} opacity="0.85" />
      <path d="M122,94 C120,98 100,100 66,100" stroke="#f06363" strokeWidth="3" fill="none" style={flow} opacity="0.7" />
      <text x="100" y="120" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.7">↑ cool · warm ↓</text>
    </svg>
  );
}

function Fans({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <rect x="30" y="14" width="140" height="112" rx="8" fill="#0b1411" stroke={c} strokeOpacity="0.3" />
      <Spinner cx={70} cy={50} r={20} color={c} dur="1.7s" />
      <Spinner cx={130} cy={50} r={20} color={c} dur="2.1s" />
      <Spinner cx={70} cy={92} r={20} color={c} dur="2.4s" />
      <Spinner cx={130} cy={92} r={20} color={c} dur="1.9s" />
      {/* airflow arrows */}
      {[26, 70, 114].map((y, i) => (
        <g key={i}>
          <path d="M6,0 L20,0" transform={`translate(0,${y})`} stroke={c} strokeWidth="1.6" opacity="0.6" style={flow} />
        </g>
      ))}
      <text x="100" y="138" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.7">positive pressure · 10× 120mm</text>
    </svg>
  );
}

function Case({ c }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <rect x="40" y="14" width="120" height="112" rx="8" fill="#0c0e16" stroke={c} strokeOpacity="0.5" />
      {/* divider — dual chamber */}
      <line x1="118" y1="16" x2="118" y2="124" stroke={c} strokeOpacity="0.3" strokeDasharray="4 4" />
      {/* mobo */}
      <rect x="50" y="24" width="58" height="70" rx="3" fill="#11141f" stroke={c} strokeOpacity="0.3" />
      {/* gpu */}
      <rect x="50" y="98" width="58" height="14" rx="2" fill={c} opacity="0.18" />
      {/* rad on side */}
      <rect x="124" y="22" width="10" height="80" rx="2" fill={c} opacity="0.2" />
      {/* psu hidden */}
      <rect x="138" y="100" width="18" height="18" rx="2" fill="#11141f" stroke={c} strokeOpacity="0.3" />
      <Spinner cx={132} cy={40} r={6} color={c} dur="2.4s" blades={5} />
      <Spinner cx={132} cy={62} r={6} color={c} dur="2.1s" blades={5} />
      <text x="79" y="60" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace" opacity="0.6">SHOWCASE</text>
      <text x="147" y="138" textAnchor="middle" fontSize="6" fill={c} fontFamily="monospace" opacity="0.5">HIDDEN BAY</text>
    </svg>
  );
}

const MAP = { cpu: Cpu, gpu: Gpu, mobo: Mobo, ram: Ram, ssd: Ssd, psu: Psu, cooler: Cooler, fans: Fans, case: Case };

export default function PartArt({ art, accent }) {
  const C = MAP[art] || Cpu;
  return <C c={accent} />;
}
