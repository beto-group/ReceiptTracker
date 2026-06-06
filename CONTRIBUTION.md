# 🛠️ Contributing to Receipt Tracker (main)

Welcome! This document outlines the core developer standards, guidelines, and compilation loops required to maintain the Receipt Tracker component.

---

## 🏛️ Core Architecture Pillars

1.  **Full-Pane DOM Interception**:
    *   The view targets the nearest `.workspace-leaf-content` ancestor and replaces standard Markdown leaves with a full-pane portal overlay for an immersive processor UI and dashboard.
    *   Dynamic lifecycle hooks manage mounting and cleanups edge-to-edge.
2.  **Anti-Bleed Style Isolation**:
    *   All styles must be scoped tightly under standard container class keys to avoid spilling into the Obsidian UI or interfering with active user themes.
3.  **Host-Native Theme Adaptability**:
    *   All colors and typography must use Obsidian's native CSS variables (e.g., `var(--background-primary)`, `var(--text-normal)`) to ensure perfect visual adaptation to any user theme. Avoid hardcoded colors.
4.  **Sterile Zero-Dependency Flow**:
    *   The view must rely strictly on standard pre-loaded React hooks (`useState`, `useEffect`, `useRef`) provided by the `dc` host workspace compiler leaf. External scripts (like Tesseract and D3) are loaded securely at runtime via CDN wrappers.

---

## 🚀 Local Compilation & Test Runner Loop

*   **Code Modularity**: All new logic must be logically broken down into `src/components`, `src/utils`, or `src/styles`.
*   **Hot Reload Trigger**: During development, use the reload action menu or press the reload button inside the UI panel to invoke `dc.app.workspace.activeLeaf.rebuildView()`. The active `mcp_commands.json` watcher will automatically flush Obsidian's internal module cache, loading your latest React changes instantly with zero system reboots.
