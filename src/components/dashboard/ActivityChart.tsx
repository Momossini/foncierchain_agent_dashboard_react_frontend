interface ActivityChartProps {
  data: number[];
  className?: string;
}

export const ActivityChart = ({ data, className }: ActivityChartProps) => {
  const max = Math.max(...data);
  const width = 400;
  const height = 100;
  const padding = 10;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((d / max) * (height - padding * 2) + padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="text-brand-500"
        />
        <path
          d={`M ${padding} ${height} L ${points} L ${width - padding} ${height} Z`}
          fill="currentColor"
          className="text-brand-50"
          opacity="0.5"
        />
      </svg>
      <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
        <span>Lundi</span>
        <span>Mardi</span>
        <span>Mercredi</span>
        <span>Jeudi</span>
        <span>Vendredi</span>
        <span>Samedi</span>
        <span>Dimanche</span>
      </div>
    </div>
  );
};
