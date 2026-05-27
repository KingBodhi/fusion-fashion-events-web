# Session Handoff — FFE Live Platform Build

**Last touched:** 2026-05-27
**Driver:** Aaren Sirak (`bodhimgmt@gmail.com`)
**Operator note:** Read this file before doing anything in `fusion-fashion-events-web`.

---

## TL;DR — Where we are right now

Phase 1 (broadcast hub + Vercel deploy) is **shipped**. Live at:

- **Production:** https://fusion-fashion-events-web.vercel.app
- **Live page:** https://fusion-fashion-events-web.vercel.app/live
- **Vercel project:** `kingbodhis-projects/fusion-fashion-events-web`
- **GitHub:** https://github.com/Powerclub-Global/fusion-fashion-events-web

The `/live` page renders an OFF AIR state by default and flips to LIVE NOW within ~10s of OBS connecting. Stream chain is fully working:

```
Canon 1D X → Hollyland → ATEM Mini Pro ch1 → USB-C → MacBook (OBS profile "Sirak-Live-CF")
  → RTMPS → Cloudflare Stream Live Input → ABR HLS (5-rendition ladder)
  → /live page iframe embed
```

What's NOT done yet:
- Simulcast outputs to YouTube/IG/FB/TikTok (keys not yet collected)
- Per-brand storefront pages (Phase 2)
- Native commerce: products / cart / checkout (Phase 3)
- Shopify data migration + DNS cutover (Phase 4)

---

## Big strategic decision: Shopify replacement

`fusionfashionevents.com` currently runs a live **Shopify store** (`fusionfashion-1910.myshopify.com`). The plan agreed this session:

- Replace it entirely with our Next.js + native commerce build (Prisma + Neon + DIY JWT + Stripe Checkout)
- Per-brand storefronts under `/brands/[brand]` rather than one FFE store
- Admin lives at `app/admin/` inside this same repo per the Sirak admin pattern
- DNS cutover happens in Phase 4 with 30-day Shopify read-only safety net

This is a **multi-week build**. Don't rush ahead of the phasing.

---

## 4-Phase Roadmap

### Phase 1 — Broadcast hub (DONE)

- [x] Cloudflare Stream account + $5/mo subscription
- [x] Live Input `af6164876a3eeaaa5a564735702650ba` provisioned
- [x] OBS profile `Sirak-Live-CF` configured for RTMPS push
- [x] Vercel project linked + first prod deploy
- [x] `/live` page with Cloudflare iframe + status badge
- [x] Simulcast destination rail + brand CTA rail (placeholder data)
- [x] Nav updated with "Live" entry

### Phase 2 — Per-brand pages + simulcast (NEXT)

- [ ] Collect simulcast stream keys for YouTube / IG / FB / TikTok (see workflows below)
- [ ] POST each to Cloudflare via `createSimulcastOutput()` in `lib/cloudflare-stream.ts`
- [ ] Build `/brands` directory page + `/brands/[brand]` template
- [ ] Wire `featuredBrands` in `config/live.ts` to real brand pages
- [ ] Rename `landing-pages/miami-swim-week/` → `landing-pages/fusion-swim-week/` per FFE trademark-hygiene rule (never write "Miami Swim Week Productions")
- [ ] Separate-flow doc for Whatnot Live (their app/desktop, not RTMP)

### Phase 3 — Native commerce + admin (after Phase 2)

- [ ] Prisma + Neon (via Vercel Marketplace) — schema sketch needs writing
- [ ] DIY JWT auth modeled on bgsc-web
- [ ] Product / variant / inventory / order entities
- [ ] Cart (server-state, cookie-keyed)
- [ ] Stripe Checkout + webhook handler
- [ ] `app/admin/` for product CMS + order management (Sirak admin pattern)
- [ ] Per-brand product scoping for royalty tracking

### Phase 4 — Shopify migration + cutover

- [ ] Export Shopify products/customers/orders (Shopify Admin API or built-in CSV exports)
- [ ] Import into Neon schema
- [ ] Redirect map for old Shopify URLs
- [ ] DNS cutover for `fusionfashionevents.com` → Vercel
- [ ] Keep Shopify read-only for 30 days as rollback safety net

---

## Cloudflare Stream reference

### Account + token

- **Account ID:** `d704a4c31aaf6b90b1de59579a8d5f59`
- **Customer subdomain:** `customer-pgpql92xumpqnyup.cloudflarestream.com`
- **API token name:** `DASHBOARD-ADMIN` (Account → Stream → Edit scope)
- **Local token file:** `~/.cf_stream.env` (chmod 600, not committed)
- **Token in Vercel:** env var `CF_API_TOKEN` (production + preview)

> The token was pasted in chat during today's session — **rotate before next session** at dash.cloudflare.com → My Profile → API Tokens → Roll.

### Live Input

- **UID:** `af6164876a3eeaaa5a564735702650ba`
- **Name:** Sirak Studios — ATEM Test 2026-05-27
- **Recording:** automatic (each session produces a VOD)
- **RTMPS ingest:** `rtmps://live.cloudflare.com:443/live/`
- **Stream key:** `abbed8a117871263209587ef7e5a5dackaf6164876a3eeaaa5a564735702650ba`
- **HLS manifest:** https://customer-pgpql92xumpqnyup.cloudflarestream.com/af6164876a3eeaaa5a564735702650ba/manifest/video.m3u8
- **Hosted iframe:** https://customer-pgpql92xumpqnyup.cloudflarestream.com/af6164876a3eeaaa5a564735702650ba/iframe

For new events, you can create dedicated Live Inputs (one per event series) so recordings group cleanly. Use `createLiveInput()` (would need to be added to `lib/cloudflare-stream.ts`).

### Simulcast key collection workflow

Each platform requires a Cloudflare simulcast output entry like:

```ts
await createSimulcastOutput("af61648...", {
  url: "rtmp://a.rtmp.youtube.com/live2",
  streamKey: "<key>"
});
```

**YouTube Live**
1. studio.youtube.com → top-right `+ Create` → **Go Live**
2. Sidebar **Stream** → **Stream settings**
3. Copy **Stream URL** (`rtmp://a.rtmp.youtube.com/live2`) and **Stream key**
4. Key is reusable; rotate via the same panel

**Facebook Live**
1. facebook.com/live/producer (must be Page admin, not personal profile)
2. **Use Stream Key** → copy **Server URL** + **Stream Key**
3. Keys are single-use unless you flip "Persistent Stream Key" on

**Instagram Live**
- Personal accounts can't ingest RTMP. **Business / Creator** accounts only, and they need to be enabled for Live Producer.
- business.facebook.com → Meta Business Suite → connected IG account → **Live Producer** flow
- IG often gates stream keys behind Pro account requirements that change. May not be enable-able for FFE without a switch from personal to business.

**TikTok Live**
- Account needs **1K+ followers** AND TikTok LIVE Studio access (not yet rolled out to all accounts)
- livecenter.tiktok.com → **Stream from web** → copy **RTMP URL** + **Stream key**
- If access not yet granted, skip TikTok for first event series; revisit when threshold met

**Whatnot — NOT RTMP simulcast**
- Whatnot streaming is app-based or their "Whatnot Studio" desktop client
- Separate workflow: while OBS pushes to Cloudflare for the FFE embed, a phone or Whatnot Studio runs in parallel for Whatnot's audience
- Could potentially use OBS Virtual Camera as input to Whatnot Studio on the same Mac (worth a test, not confirmed)

### Stream cost expectations

- $5/mo base: 1,000 mins storage + 1,000 mins delivery
- Simulcast outputs: ~$0.01/min per destination (so 4 platforms × 2hr = ~$5)
- Live recording auto-creates VOD assets that count toward storage minutes

---

## OBS setup (Sirak Studios MacBook)

- **App:** OBS 32.1.2, `/Applications/OBS.app`
- **Profile:** `Sirak-Live-CF` (RTMPS to Cloudflare, 1080p, Apple VT H264 hardware, 6 Mbps CBR, 2s keyframe)
- **Scene collection:** `Untitled` (also has user's earlier Twitch profile preserved)
- **Source:** `ATEM (macos-avcapture)` bound by name + preset `AVCaptureSessionPreset1920x1080`

### Known OBS gotcha (DON'T re-step)

OBS macos-avcapture stores a hardware location ID (`device` field) which goes stale when the ATEM is replugged or moved to a different USB port. Symptom: black preview, log shows `Unable to initialize device with unique ID '0x...'`. Fix is either:
- Right-click source → Properties → re-select device from dropdown
- Or strip the `device` field from `~/Library/Application Support/obs-studio/basic/scenes/Untitled.json` while OBS is closed

Saved a separate writeup of the original signal-chain verification at `~/topos/_sirak/livestream/2026-05-27-atem-cf-stream.md`.

### Canon 1D X HDMI cleanup (TODO)

Today's test stream had camera HUD overlays burned into the broadcast (histogram, grid, exposure info, AF rectangle). To clean up:
- Press **DISP / INFO** repeatedly to cycle overlays off
- Movie mode often gives cleaner HDMI than still mode on the 1D X
- Mark II / Mark III have a dedicated "HDMI clean output" menu option; original 1D X does not have a fully clean HDMI mode

---

## Env vars (Vercel)

Set on `kingbodhis-projects/fusion-fashion-events-web` per `vercel env ls`:

| name | scope | notes |
|---|---|---|
| `CF_API_TOKEN` | production + preview | sensitive |
| `CF_ACCOUNT_ID` | production + preview | |
| `CF_STREAM_LIVE_INPUT_ID` | all | currently the test input UID |
| `NEXT_PUBLIC_CF_STREAM_CUSTOMER_SUBDOMAIN` | all | safe to expose |

When migrating to a real event input, add a new Live Input via API then update `CF_STREAM_LIVE_INPUT_ID`.

To pull all env vars locally for dev:

```bash
cd ~/topos/fusion-fashion-events/website-app
npx vercel@latest env pull .env.local
```

---

## Files added this session

```
lib/cloudflare-stream.ts          ← thin CF Stream API client
config/live.ts                    ← stream IDs, simulcast destinations, featured brands
config/site.ts                    ← added "Live" to nav
components/live/StreamPlayer.tsx
components/live/SimulcastRail.tsx
components/live/BrandCTARail.tsx
app/live/page.tsx
.env.example                      ← documents required env vars
planning/SESSION-HANDOFF.md       ← this file
```

Nothing has been committed to git yet — session ended before commit was requested. First commit should bundle all of these together with message along the lines of `feat: add /live broadcast page + Cloudflare Stream integration`.

---

## Open questions for next session

1. **Who owns simulcast keys?** YouTube + Facebook need brand admin access. Aaren or David Woods?
2. **Domain cutover trigger?** What event marks the switch from Shopify to the new build going live at `fusionfashionevents.com`? Recommend cutover only after Phase 3 is verified end-to-end.
3. **Brand registry source of truth?** Phase 2 stubs brand data in `config/live.ts`. Phase 3 should move it to Neon. JSON source or DB-first from the start?
4. **Stream input strategy?** One persistent Live Input that we keep reusing, or new Live Input per event series? Per-event is cleaner for VOD organization.
5. **VOD retention?** Cloudflare auto-records every live session. Set `deleteRecordingAfterDays` per input? Default is keep forever.

---

## Useful commands (copy-paste)

```bash
# Restart OBS preview if it shows black after replug:
cd ~/topos/fusion-fashion-events/website-app && ls

# Verify Cloudflare Live Input via API:
. ~/.cf_stream.env && curl -sS \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/stream/live_inputs/af6164876a3eeaaa5a564735702650ba" \
  -H "Authorization: Bearer $CF_API_TOKEN" | python3 -m json.tool

# Quick HLS probe (does the stream have content right now?):
ffmpeg -i "https://customer-pgpql92xumpqnyup.cloudflarestream.com/af6164876a3eeaaa5a564735702650ba/manifest/video.m3u8" \
  -frames:v 1 -y /tmp/check.jpg && open /tmp/check.jpg

# Deploy to production:
cd ~/topos/fusion-fashion-events/website-app && npx vercel@latest deploy --prod --yes

# Pull env vars locally:
cd ~/topos/fusion-fashion-events/website-app && npx vercel@latest env pull .env.local
```
