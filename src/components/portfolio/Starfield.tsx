// Fixed starfield shared by both sections so the sky flows seamlessly.
// Static stars come from CSS gradients; a handful of positioned dots twinkle.
const TWINKLES = [
  { top: "12%", left: "18%", delay: "0s", size: 2 },
  { top: "22%", left: "72%", delay: "1.2s", size: 2 },
  { top: "36%", left: "8%", delay: "2.4s", size: 1.5 },
  { top: "48%", left: "88%", delay: "0.6s", size: 2 },
  { top: "64%", left: "30%", delay: "3.1s", size: 1.5 },
  { top: "78%", left: "62%", delay: "1.8s", size: 2 },
  { top: "86%", left: "14%", delay: "2.9s", size: 1.5 },
  { top: "8%", left: "50%", delay: "3.6s", size: 1.5 },
  { top: "56%", left: "52%", delay: "0.3s", size: 1.5 },
  { top: "30%", left: "40%", delay: "2s", size: 2 },
];

export function Starfield() {
  return (
    <div aria-hidden className="starfield pointer-events-none fixed inset-0 z-0">
      {TWINKLES.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: `${3.5 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  );
}
