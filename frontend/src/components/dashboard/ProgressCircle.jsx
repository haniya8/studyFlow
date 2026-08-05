// ProgressCircle.jsx
export function ProgressCircle({ radius, circumference, offset }) {
  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="#ffffff" stroke="#2a2a3a" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#6C5CE7"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
}