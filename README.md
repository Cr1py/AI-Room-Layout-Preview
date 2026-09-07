# AI Room Layout Preview

Inspired by my current obsession of the Feng Shui guy and sims 4, this app allows the user to upload a blank floor plan and receive a render of what the place may look like when furnished. This project is mostly just for me to explore puter and integrating ai models in a project.

## What Does it Do??

1. Upload a floor plan image (JPG, PNG, or WebP).
2. Click Generate 3D View to send it to an AI image model, which redraws the plan as a realistic render of what the plan would look like.
3. Once generated, you can move a slider to compare the original floor plan with the AI render.
4. You can export or share the image as a PNG.

Refreshing the page resets everything back to the original web state (the eventual plan is to add persistence through a database, or login system built into the app).

## Tech stack & key dependencies

| Package | Purpose |
|---|---|
| `react` | UI framework |
| `@heyputer/puter.js` | Provides the AI image generation call (`puter.ai.txt2img`) with no backend or API key required. Bills usage to the end user's own free Puter account |
| `lucide-react` | Provides the icons |
| `react-compare-slider` | The draggable before/after slider |
| `tailwindcss` (v4) | Styling |
| Vite | Build tool / dev server |

### Note on Puter

`puter.ai.txt2img` is billed per user under Puter's "User Pay" model. When a user clicks **Generate**, Puter will show its sign in popup. This is not an account system built by this project and I'll need to figure out how to tie that into signing up and saving the current webstate.

## Project structure

```
src/
├── App.tsx                     # Top-level layout: upload section + display/comparison section
├── index.css         # Tailwind v4 theme tokens + component classes
├── components/
│   ├── Upload.tsx              # Dropzone/file-picker component with fake progress UI
│   ├── ui/
│   │   └── Button.tsx          # Shared button component
│   └── lib/
│       ├── ai.actions.ts       # Calls Puter's AI image generation
│       ├── constants.ts        # Prompt text, timing, and image-dimension constants
│       └── roomGeneration.ts   # useRoomGeneration hook — owns all app state & handlers
```

## Current workflow

**1. Upload: `Upload.tsx`**
The user drags a file onto the dropzone, or clicks it to open a file input. `FileReader.readAsDataURL` converts the file into a base64 data URL. A short progress bar plays, then `onComplete(base64Data)` fires.

**2. Upload complete: `useRoomGeneration.ts`**
`handleUploadComplete` stores the base64 string in `sourceImage` and clears any previous result/error. In `App.tsx`, this reveals the "Generate 3D View" button and shows the uploaded floor plan as a placeholder preview.

**3. Generate: user clicks the button**
`handleGenerate` is called directly from the button's `onClick` (if the user is not logged in with puter, a login pop up will appear). It sets `isProcessing(true)` and calls `generate3DView({ sourceImage })`.

**4. AI generation: `ai.actions.ts`**
The base64 payload and MIME type are extracted from the data URL and sent to `puter.ai.txt2img`, along with a detailed prompt (`AI_RENDER_PROMPT` in `constants.ts`) instructing the model to:
- Remove all text/labels from the plan
- Preserve exact wall, door, and window geometry
- Render a strict top-down (non-perspective) view
- Convert furniture icons into realistic matching furniture
- Avoid adding anything not shown in the original plan

The returned image is normalized into a data URL (fetching and re-encoding it if it isn't one already) and returned as `renderedImage`.

**5. Result handling: `useRoomGeneration.ts`**
On success, `currentImage` is set to the rendered image. On failure or an empty result, `error` is set instead and shown in the UI. `isProcessing` resets to `false`.

**6. Compare: `App.tsx`**
Once both `sourceImage` and `currentImage` exist, the render section switches from the placeholder to a slider, which lets the user drag between the original floor plan and the AI-generated render. The button also relabels itself to "Regenerate", which reruns steps 3–5 and overwrites the current result.
