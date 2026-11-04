# the-mechanism

Automated vertical explainer videos for **The Mechanism** (e.g. "why airlines sell more tickets than seats").

Free stack: Kokoro (offline TTS) + Remotion (React video) + ffmpeg.

## How it works

1. `scripts.json` holds the episode queue (each episode = list of beats: scene name + narration text).
2. `gen_voice.py <episode-id>` generates the voiceover (`public/voice.wav`) and `public/timeline.json` (beat timings).
3. Remotion renders `src/Video.tsx` to a 1080x1920 MP4 using that timeline.

## Run locally

```bash
npm install
pip install kokoro-onnx soundfile

# download the Kokoro model files into ./models
mkdir -p models
curl -L -o models/kokoro-v1.0.int8.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx
curl -L -o models/voices-v1.0.bin        https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin

python3 gen_voice.py airline-overbooking
npx remotion render src/index.ts Mechanism out/video.mp4
```

`remotion.config.ts` points at `/usr/bin/google-chrome`; change the path (or remove that line) on your machine.

## Status

- [x] Episode 1 renders (airline overbooking)
- [ ] Generic, data-driven scene templates
- [ ] Daily GitHub Actions workflow
- [ ] YouTube upload (API uploads stay private until the project passes Google's audit)
