import { Countdown } from "./Countdown";

export function OffAirHero({
  nextShow,
}: {
  nextShow: { title: string; starts_at: string } | null;
}) {
  return (
    <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-muted-dark" aria-hidden />
        <span className="font-label tracking-widest text-[10px] uppercase bg-surface-2 text-white border border-border px-3 py-1">
          Off Air
        </span>
      </div>

      <p className="font-label tracking-[0.3em] text-xs text-accent uppercase mb-3">
        Live broadcast hub
      </p>
      <h1 className="font-display font-light text-5xl md:text-7xl text-white leading-none mb-6">
        Up next on
        <br />
        <span className="text-gradient-green">Fusion Fashion Events</span>
      </h1>

      {nextShow ? (
        <>
          <p className="text-muted-dark text-sm max-w-xl leading-relaxed mb-8">
            <span className="text-white">{nextShow.title}</span>
            {" · "}
            {new Date(nextShow.starts_at).toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <Countdown targetIso={nextShow.starts_at} />
        </>
      ) : (
        <p className="text-muted-dark text-sm max-w-xl leading-relaxed">
          No upcoming broadcasts scheduled. Catch up on replays below or browse featured brands.
        </p>
      )}
    </section>
  );
}
