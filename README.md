# Asciigen

A top-tier platform for generating animated ASCII backgrounds, following Orinadus design principles.

## Features
- **Library**: A curated collection of high-performance ASCII animations.
- **Studio**: Drag-and-drop assets (Images/Video/3D) to generate custom backgrounds.
- **AI Generator**: Describe your animation in plain language to generate configurations.
- **Engine**: Powered by `chenglou/pretext` for 60fps text reflow.
- **CLI**: Batch process images directly from your terminal.

## Structure
- `apps/web`: Next.js frontend (Orinadus design tokens, Inter font).
- `packages/engine`: Core ASCII/Reflow logic.
- `packages/cli`: Terminal interface for the engine.

## Getting Started

### Development
```bash
npm install
npm run dev
```

### CLI Usage
```bash
cd packages/cli
npm run build
node dist/index.js convert path/to/image.png --width 100
```

## Design Principles
- **No Marketing**: Straight utility.
- **Orinadus Aesthetic**: Dark mode (#050507), Glassmorphism, holographic glints.
- **High Performance**: Optimized for 60fps animations.
