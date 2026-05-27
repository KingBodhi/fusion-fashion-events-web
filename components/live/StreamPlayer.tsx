import { getEmbedUrl } from "@/lib/cloudflare-stream";

interface StreamPlayerProps {
  liveInputId: string;
  customerSubdomain: string;
  title?: string;
}

export function StreamPlayer({ liveInputId, customerSubdomain, title }: StreamPlayerProps) {
  const src = getEmbedUrl(customerSubdomain, liveInputId);
  return (
    <div className="relative w-full bg-black border border-border overflow-hidden">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={src}
          title={title ?? "Fusion Fashion Events Live"}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
