import type { NextRequest } from "next/server";
import { getLiveState, liveStateVersion } from "@/lib/live-state";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

// SSE long-poll on Vercel. The function ends at the platform's max duration;
// the client's EventSource auto-reconnects, so the stream feels continuous.
// Cadence: emit only when the state version changes (every 2s poll, debounced).
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  let timer: ReturnType<typeof setInterval> | null = null;
  let lastVersion = "";
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const push = (event: string, data: unknown) => {
        if (closed) return;
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      const tick = async () => {
        if (closed) return;
        try {
          const state = await getLiveState();
          const v = liveStateVersion(state);
          if (v !== lastVersion) {
            lastVersion = v;
            push("state", state);
          } else {
            push("ping", { at: Date.now() });
          }
        } catch (err) {
          push("error", { message: err instanceof Error ? err.message : String(err) });
        }
      };

      // Initial state immediately
      await tick();

      timer = setInterval(tick, 2000);

      const cleanup = () => {
        if (closed) return;
        closed = true;
        if (timer) clearInterval(timer);
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };

      req.signal.addEventListener("abort", cleanup);
    },
    cancel() {
      closed = true;
      if (timer) clearInterval(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
