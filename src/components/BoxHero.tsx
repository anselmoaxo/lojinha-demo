// Top-down view of an open box of brigadeiros: the store's signature image.
const FLAVORS = [
  { body: "#4a2418", sprinkle: "#2a120b" },
  { body: "#fff3e6", sprinkle: "#e6cdb0" },
  { body: "#a3c47f", sprinkle: "#5d7f3b" },
  { body: "#e98aa0", sprinkle: "#c8344f" },
];
const ORDER = [0, 1, 2, 3, 2, 0, 3, 1, 1, 3, 0, 2];

function Sweet({ x, y, flavor, index }: { x: number; y: number; flavor: (typeof FLAVORS)[number]; index: number }) {
  const sprinkles = Array.from({ length: 7 }, (_, i) => {
    const angle = (i * 137 + index * 29) % 360;
    const radius = 10 + ((i * 7 + index) % 14);
    const sx = x + Math.cos((angle * Math.PI) / 180) * radius;
    const sy = y + Math.sin((angle * Math.PI) / 180) * radius;
    return <rect key={i} x={sx - 4} y={sy - 1.5} width="8" height="3" rx="1.5" fill={flavor.sprinkle} transform={`rotate(${angle * 2} ${sx} ${sy})`} />;
  });
  return (
    <g>
      <circle cx={x} cy={y} r="44" fill="#fff7f8" stroke="#f0bcc7" strokeWidth="6" strokeDasharray="4 5" />
      <g className="box-sweet" style={{ animationDelay: `${180 + index * 70}ms` }}>
        <circle cx={x} cy={y} r="32" fill={flavor.body} />
        <circle cx={x - 10} cy={y - 11} r="7" fill="white" opacity=".25" />
        {sprinkles}
      </g>
    </g>
  );
}

export function BoxHero() {
  return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Caixa aberta com 12 brigadeiros de sabores sortidos" className="h-auto w-full">
      <rect x="40" y="16" width="440" height="88" rx="14" fill="#e98aa0" transform="rotate(-4 260 60)" />
      <rect x="236" y="10" width="48" height="100" fill="#fff7f8" transform="rotate(-4 260 60)" />
      <rect x="20" y="70" width="480" height="336" rx="22" fill="#3a1f16" />
      <rect x="34" y="84" width="452" height="308" rx="14" fill="#f8d9df" />
      {ORDER.map((flavor, index) => (
        <Sweet key={index} index={index} flavor={FLAVORS[flavor]} x={95 + (index % 4) * 110} y={146 + Math.floor(index / 4) * 96} />
      ))}
    </svg>
  );
}
