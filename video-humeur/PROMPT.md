# Prompt : vidéo de l'Humeur du N°01

À coller dans une nouvelle session Claude Code, ouverte sur ce dépôt (de préférence sur le Mac, là où Flora, les clés ElevenLabs / fish.audio et ffmpeg sont disponibles).

---

You're helping me (Karim) produce a short vertical video for Jean-Marc, editor of **La revue Travailliste**. It is the free demo promised in my proposal: the **Humeur** (the editorial mood piece) of issue N°01, turned into a 45–60 s vertical video with a narrator voice, animated illustrations and on-screen text. Jean-Marc will show it to his team before their social media launch. **It must be ready to send on Monday 19 October.**

Read first: `STATUS.md` and `proposition/` (the proposal I sent). Brand: red `#C90419`, Newsreader for titles, Barlow Semi Condensed for text, name written « La revue Travailliste ». All on-screen text and narration are in French.

## Hard rules

1. **Phase 1 is a conversation with me.** No paid generation and no subagents until I write `GO PRODUCTION` after approving the brief.
2. **Cut, never add.** Every spoken or displayed word comes from the Humeur text, except the end card. No rewording, no invented facts or figures.
3. **No likeness of real, identifiable people** in generated images (politicians, union leaders…). Symbolic illustration only.
4. **Money:** before every paid call (Flora, ElevenLabs, fish.audio), state the estimated cost. Total budget cap: **15 €**. If a step would go over, stop and ask me.
5. **Narrator voice is a stock French voice**, not a clone of anyone.
6. Work in `video-humeur/`. Do not commit generated media (add a `.gitignore` for `video-humeur/assets/` and `video-humeur/out/`); commit only the brief, scripts and reports.

## Phase 1 — Brainstorm with me (you, main session, high effort)

I'll paste the Humeur text. Then propose, concisely:

1. Two or three creative angles (tone, illustration style, rhythm), with your recommendation.
2. The cut: the text reduced to 45–60 s of narration (about 110–150 words), showing what is removed.
3. A storyboard of 6–10 shots: timing, spoken text, on-screen text, illustration idea, motion.
4. The hook (first 3 seconds) and the end card (logo, « La revue Travailliste », where to read the issue).
5. Two or three French narrator voices to test (ElevenLabs library, fish.audio).

We iterate until I'm happy. Then write `video-humeur/brief.md` — the single source of truth for everything after — and wait for `GO PRODUCTION`.

## Phase 2 — Production (subagents, cheapest model that does the job)

Spawn subagents with the Agent tool, setting `model` and `effort` explicitly for each:

| Task | Model | Effort |
|---|---|---|
| Brief, creative calls, final go/no-go (you) | main session | high |
| Flora image prompts, voice direction (pace, emphasis, pronunciation hints) | sonnet | medium |
| API calls, downloads, file handling, subtitles from timestamps, ffmpeg assembly | haiku | low |
| Anything haiku fails twice | sonnet | medium |
| Verification (phase 3) | sonnet | high |

Each subagent gets `brief.md` and only the inputs it needs, and returns file paths plus a short report — not file contents.

Order, with a checkpoint where I approve before money is spent on the next step:

1. **Voice test:** one sentence from the script in 2–3 voices. I pick one.
2. **Full narration** in the chosen voice, with word-level timestamps (ElevenLabs "with timestamps", or transcribe afterwards). Save the timings as JSON.
3. **Stills:** one image per shot in Flora, draft quality first. Show me a contact sheet; regenerate only the ones I reject.
4. **Motion:** default to cheap motion done in ffmpeg (slow zoom, pan, parallax, text animation). Use paid AI image-to-video for at most 1–2 key shots, and only if I agree.
5. **Assembly (ffmpeg):** 1080×1920, 30 fps, H.264 + AAC, loudness around −14 LUFS. Subtitles burned in using Barlow Semi Condensed, synced to the word timings. Keep the top ~250 px and bottom ~400 px free of essential text (Instagram/LinkedIn interface). End card with logo. Export:
   - `out/humeur-n01.mp4` (subtitles burned in)
   - `out/humeur-n01-sans-texte.mp4` + `out/humeur-n01.srt`

## Phase 3 — Verification (a separate subagent, fresh context, never the one that produced)

Checklist, pass/fail per item with evidence:

- **Text fidelity:** transcribe the final audio and compare it word by word with the Humeur. Nothing added, nothing distorted.
- **French pronunciation:** proper names, numbers, acronyms, liaisons.
- **Subtitles:** spelling, French typography (« guillemets », non-breaking space before : ; ! ?), line breaks, sync within ~150 ms.
- **Specs:** check with ffprobe (resolution, fps, codecs, duration, loudness).
- **Visuals:** extract one frame per shot. Check brand colours and fonts, safe zones, no real person's likeness, no garbled AI text in images.
- **End card:** exact name « La revue Travailliste », logo correct.

The producer fixes the failed items; the verifier re-checks only those. After two loops, escalate to me.

## Delivery

Show me the final video, a contact sheet of 6 frames, the verifier's report and the total spend. I send the video to Jean-Marc myself on WhatsApp. Update `STATUS.md` (video done, spend, files).
