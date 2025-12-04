## Awesome Charts

An interactive React + Vite playground for composing charts widgets inside a draggable grid. It demonstrates grid-aware drag-and-drop, automatic row management, and a lightweight toolbar workflow for shaping dashboards quickly.

### Stack

- React 19 with TypeScript for UI structure
- Vite for dev server and build tooling
- Chart.js + react-chartjs-2 for visualizations
- @dnd-kit/core for drag-and-drop interactions
- ESLint + TypeScript for linting and type safety

### Getting Started

**Prerequisites**

- Node.js 20+ (or the version used by your team)
- npm 10+ (bundled with Node)

**Install dependencies**

```
npm install
```

**Run the app locally**

```
npm run dev
```

The Vite dev server prints a local URL (default `http://localhost:5173`). Hot module reload is enabled by default.

**Build for production**

```
npm run build
```

Artifacts land in `dist/`. To smoke-test the optimized build before deploying:

```
npm run preview
```

### Project Description

Awesome Charts lets users construct a dashboard-like grid of chart widgets. Each widget occupies a cell in the grid, and users can add, drag, and reorganize widgets while the system keeps the layout tidy by default. Additional controls in the toolbar allow more advanced behaviors such as keeping empty rows or adding new rows on demand.

### Main User Flows

1. **Initial state** – the grid renders empty with no widgets.
2. **Add a widget** – the user picks a widget type; the widget appears in the first available cell.
3. **Drag and drop** – widgets are draggable across the grid; valid drop targets highlight with a border.
4. **Auto-trim tail rows** – trailing empty rows are removed automatically to keep the layout compact.
5. **Enable middle-row deletion** – toggling the toolbar checkbox removes empty rows even if they’re between populated rows.
6. **Grow the grid** – if the last row already contains two blocks, starting a drag reveals an action panel that lets the user spawn a new row and drop the current widget into it.

### Improvements Roadmap

1. Add tests.
2. Replace the current GridContext state with a reducer or other optimized structure.
3. Improve grid responsiveness across breakpoints.
4. Add virtualization to keep performance snappy on very large grids.
