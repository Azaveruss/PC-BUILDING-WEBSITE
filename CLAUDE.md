# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` - Run development server (localhost:3000)
- `npm test` - Run tests in watch mode
- `npm run build` - Create production build

## Architecture

This is a React 19 application created with Create React App. The entire application lives in a single component (`src/App.js`) with no routing or external state management.

### Data Model

Hardware parts are defined as constants at the top of App.js:
- `GPUS`, `CPUS`, `RAMS`, `MOBOS` - Each part has `name`, `fps` (multiplier), and `price`
- FPS calculation: `200 * GPU.fps * CPU.fps * RAM.fps`
- Motherboards have fps=1.0 (no impact on performance calculation)

### State

Four `useState` hooks track selected components. Calculations (estimatedFPS, totalPrice) are derived directly in the render.

### Styling

Plain CSS in `App.css` with dark theme and glassmorphism effects. Uses CSS Grid with responsive breakpoint at 768px.
