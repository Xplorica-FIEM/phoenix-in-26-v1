# Phoenix (phnx) Project Instructions

## Project Expectations
- **Sophistication**: The project must feel highly sophisticated, clean, and intentional.
- **Interactions**: Animation and behavior should be smooth, engaging, and enjoyable.
- **Professionalism**: Design should feel professional, not experimental. Every element must exist for a reason.

## Project Overview
This is a Next.js application (using App Router) with TypeScript and Tailwind CSS. The project features a Pokemon-themed landing page designed with a high-end, futuristic aesthetic.

### Distinctive Features
1. **Theme**:
   - Pokemon-inspired visual elements (Pokeball loading, trainers, events).
   - "Orbitron" font used for headers and interactive buttons.
   - Futuristic UI elements, such as bracket animations `[ About ]`.
   - Transparency overlays compatible with both Dark and Light modes.

2. **Core Animation (Golden Spiral)**:
   - Located in `src/app/page.tsx`.
   - **Mechanism**: Strictly uses `requestAnimationFrame` and native DOM manipulation (`element.style.transform`) to ensure optimal performance.
   - **Constraint**: Do not introduce heavy animation libraries (e.g., Framer Motion) unless absolutely necessary for complex new interactions.
   - **Logic**: Calculated using the Golden Ratio (phi ≈ 1.618), polar-to-cartesian coordinate conversion, and cubic easing.

## Tech Stack & Conventions
- **Framework**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS.
- **Language**: TypeScript.
- **State Management**: React `useState`, `useEffect`, `useRef`.
- **Performance**: Apply `will-change-transform` to animated elements.

## Development Guidelines
- **Structure**: Isolate client-side logic (animations, interactivity) in 'use client' components.
- **Styling**: Prioritize Tailwind utility classes. Use `globals.css` only for global resets.
- **Assets**: Store images in `public/`. Ensure all assets are optimized before inclusion.
- **Responsiveness**: Validate that UI elements function primarily on mobile (flex-col) and adapt elegantly to desktop (flex-row).

## Writing & Commenting Style
- **Purpose**: Comments must explain the *why*, not restate the *what*.
- **Tone**: Calm, clear, and respectful.
- **Audience**: Assume collaborators are capable but may be unfamiliar with the specific approach.
- **Constraints**:
  - No niche references or metaphors.
  - No motivational or inspirational language.
  - No emojis.
  - No sarcasm or edge.
  - Avoid poetic ambiguity; prioritize understanding.
- **Behavior**: Favor simplicity, structure, and maintainability. If a concept can be clearer without becoming verbose, clarify it.

