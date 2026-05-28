"use client";

import { useEffect, useState } from "react";

function diff(target: number, now: number) {
  const ms = Math.max(0, target - now);
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const PAD = (n: number) => String(n).padStart(2, "0");

export function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [now, setNow] = useState<number>(target); // server-safe initial
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const d = diff(target, now);

  return (
    <div className="grid grid-cols-4 gap-3 max-w-md">
      {[
        { value: PAD(d.days), label: "Days" },
        { value: PAD(d.hours), label: "Hours" },
        { value: PAD(d.minutes), label: "Mins" },
        { value: PAD(d.seconds), label: "Secs" },
      ].map(({ value, label }) => (
        <div key={label} className="border border-border bg-surface px-4 py-3 text-center">
          <p className="font-display text-3xl md:text-4xl text-white leading-none">{value}</p>
          <p className="font-label tracking-widest text-[9px] text-muted-dark uppercase mt-1">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
