import json, sys, wave
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

FPS = 30
GAP = 0.45  # seconds of silence after each beat
SR_OUT = 24000

script_id = sys.argv[1]
scripts = json.load(open("scripts.json"))
script = next(s for s in scripts if s["id"] == script_id)

kokoro = Kokoro("models/kokoro-v1.0.int8.onnx", "models/voices-v1.0.bin")

chunks, beats = [], []
cursor = 0.0
for b in script["beats"]:
    samples, sr = kokoro.create(b["text"], voice="am_michael", speed=1.0, lang="en-us")
    assert sr == SR_OUT
    dur = len(samples) / sr
    gap = np.zeros(int(GAP * sr), dtype=samples.dtype)
    start_f = round(cursor * FPS)
    cursor += dur + GAP
    end_f = round(cursor * FPS)
    beats.append({**b, "startFrame": start_f, "durFrames": end_f - start_f, "voiceSec": round(dur, 3)})
    chunks += [samples, gap]

audio = np.concatenate(chunks)
sf.write("public/voice.wav", audio, SR_OUT)
total = round(cursor * FPS) + FPS  # 1s outro hold
json.dump({"id": script_id, "title": script["title"], "fps": FPS, "totalFrames": total, "beats": beats},
          open("public/timeline.json", "w"), indent=2)
print("total seconds:", round(total / FPS, 1))
for b in beats:
    print(b["scene"], b["startFrame"], b["durFrames"])
