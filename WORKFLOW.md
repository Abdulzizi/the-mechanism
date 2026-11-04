# The Mechanism: workflow and stack

Goal: publish one short vertical explainer video per day ("why airlines sell more tickets than seats"), at zero cost.

## Stack (all free)

| Layer | Tool | Notes |
|---|---|---|
| Scripts | Claude chat | Written in weekly batches, saved to `scripts.json` |
| Voiceover | Kokoro (`kokoro-onnx`) | Offline neural TTS. Model files come from GitHub releases. No API key, no quota |
| Animation | Remotion (React) | Renders 1080x1920, 30 fps, H.264 + AAC |
| Captions | Remotion | Phrases timed to the voice, split by character count |
| Rendering and scheduling | GitHub Actions | Daily cron (planned, see Status) |
| Storage | This repo | Scripts, templates, `published.json`. Videos are Action artifacts |
| Upload | YouTube Data API v3 (free) | Planned. Private until the project passes Google's audit |

Why Kokoro and not edge-tts or ElevenLabs:
- edge-tts could not be reached from the build sandbox.
- ElevenLabs sounds better, but its free plan (about 10 minutes of speech per month) has no commercial license. The Starter plan (about $6/month, about 30 minutes) would cover one video per day. Check elevenlabs.io/pricing for current terms.
- Swapping voices later only means changing `gen_voice.py`. It must still write `public/voice.wav` and `public/timeline.json`.

## Repo layout

```
scripts.json          episode queue (id, title, beats[{scene, text}])
published.json        episodes already rendered (planned)
gen_voice.py          script -> public/voice.wav + public/timeline.json
src/Video.tsx         scenes, captions, layout
src/Root.tsx          composition (1080x1920, duration from timeline)
remotion.config.ts    Chrome path, codec, quality
.github/workflows/    daily job (planned)
```

## Workflow

### Weekly (about 10 minutes)
1. Ask Claude for 7 new scripts (hook, 5-6 beats, payoff). Check the facts yourself.
2. Add them to `scripts.json` and commit.

### Daily (automatic, GitHub Actions)
1. Cron fires (for example 08:00 WIB, which is `0 1 * * *` in UTC).
2. Pick the first episode in `scripts.json` that is not in `published.json`.
3. Install dependencies and fetch the Kokoro model files (cached after the first run).
4. `python3 gen_voice.py <episode-id>` generates the voiceover and timings.
5. `npx remotion render src/index.ts Mechanism out/<episode-id>.mp4` renders the video. Rendering a 46 s video took about 2 minutes in testing.
6. Save the MP4 as a workflow artifact and record the episode in `published.json`.

### Publishing
- Until the YouTube API project passes Google's audit, API uploads are forced to private. Download the week's MP4s and schedule them in YouTube Studio.
- After approval, add an upload step to the workflow.
- TikTok and Instagram: reuse the same MP4s and post manually or with the platforms' own schedulers. Their APIs need app review.

## Known limitation: scenes are topic-specific

The current 7 scenes (seat grid, boarding gate, bar chart, offer cards, and so on) are built for the airline episode. A new topic needs new visuals. Two options:

1. Generic, JSON-driven scene types (big number, bar chart, step flow, A vs B, text reveal). New episodes are then text only, which is best for daily automation.
2. Custom scenes per episode. This looks better but needs a weekly build session.

Plan: use generic templates for daily videos and build a custom episode when a topic deserves it.

## Status

- [x] Episode 1 rendered (airline overbooking)
- [ ] Generic scene templates
- [ ] Daily GitHub Actions workflow
- [ ] YouTube upload step

## Content notes

- Fully automated, repetitive uploads can be flagged as low-effort or inauthentic on YouTube and TikTok. Vary the formats, check facts, and keep each video genuinely useful.
- Don't show invented numbers as fact. Label illustrative figures, as episode 1 does.
