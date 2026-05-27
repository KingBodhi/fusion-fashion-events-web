const API_BASE = "https://api.cloudflare.com/client/v4";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function headers() {
  return {
    Authorization: `Bearer ${requireEnv("CF_API_TOKEN")}`,
    "Content-Type": "application/json",
  };
}

export type LiveInputStatus = {
  isLive: boolean;
  liveVideoUid: string | null;
  currentReadyToStream: boolean;
};

export type SimulcastOutput = {
  uid: string;
  streamKey: string;
  url: string;
  enabled: boolean;
};

async function api<T>(path: string, init?: RequestInit, opts?: { revalidate?: number }): Promise<T> {
  const accountId = requireEnv("CF_ACCOUNT_ID");
  const res = await fetch(`${API_BASE}/accounts/${accountId}${path}`, {
    ...init,
    headers: { ...headers(), ...(init?.headers ?? {}) },
    next: { revalidate: opts?.revalidate ?? 10 },
  });
  if (!res.ok) {
    throw new Error(`Cloudflare API ${path} → ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { success: boolean; result: T; errors?: unknown };
  if (!json.success) throw new Error(`Cloudflare API ${path} failed: ${JSON.stringify(json.errors)}`);
  return json.result;
}

export async function getLiveInputStatus(liveInputId: string): Promise<LiveInputStatus> {
  type Video = { uid: string; status: { state: string; readyToStream?: boolean } };
  const videos = await api<Video[]>(`/stream/live_inputs/${liveInputId}/videos`, undefined, { revalidate: 10 });
  const live = videos.find((v) => v.status?.state === "live-inprogress");
  return {
    isLive: Boolean(live),
    liveVideoUid: live?.uid ?? null,
    currentReadyToStream: Boolean(live?.status?.readyToStream),
  };
}

export async function listSimulcastOutputs(liveInputId: string): Promise<SimulcastOutput[]> {
  return api<SimulcastOutput[]>(`/stream/live_inputs/${liveInputId}/outputs`, undefined, { revalidate: 60 });
}

export async function createSimulcastOutput(
  liveInputId: string,
  destination: { url: string; streamKey: string }
): Promise<SimulcastOutput> {
  return api<SimulcastOutput>(`/stream/live_inputs/${liveInputId}/outputs`, {
    method: "POST",
    body: JSON.stringify(destination),
  });
}

export async function deleteSimulcastOutput(liveInputId: string, outputId: string): Promise<void> {
  await api(`/stream/live_inputs/${liveInputId}/outputs/${outputId}`, { method: "DELETE" });
}

export type RecordedVideo = {
  uid: string;
  thumbnail: string;
  duration: number;
  created: string;
  meta: { name?: string };
};

export async function listRecordings(liveInputId: string, limit = 8): Promise<RecordedVideo[]> {
  type Video = RecordedVideo & { status: { state: string }; liveInput?: string };
  const videos = await api<Video[]>(`/stream/live_inputs/${liveInputId}/videos`, undefined, { revalidate: 60 });
  return videos.filter((v) => v.status?.state === "ready").slice(0, limit);
}

export function getEmbedUrl(customerSubdomain: string, liveInputId: string): string {
  return `https://${customerSubdomain}/${liveInputId}/iframe`;
}

export function getHlsManifestUrl(customerSubdomain: string, liveInputId: string): string {
  return `https://${customerSubdomain}/${liveInputId}/manifest/video.m3u8`;
}
