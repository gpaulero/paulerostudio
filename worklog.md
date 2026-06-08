---
Task ID: 1 & 2
Agent: full-stack-developer
Task: Add dark/light mode toggle + refactor page.tsx into components

Work Log:
- Created theme-provider.tsx with next-themes (attribute="class", defaultTheme="dark", enableSystem=true)
- Updated layout.tsx with ThemeProvider wrapping children and Toaster
- Updated globals.css with:
  - Light mode .animated-gradient (warm professional tones)
  - Dark mode .dark .animated-gradient (existing deep gradient)
  - Light mode body::after grain overlay (opacity: 0.03)
  - Dark mode .dark body::after grain overlay (opacity: 0.06)
  - Updated ::selection for both light and dark modes
  - Added smooth transition on html/body for theme changes
- Created 13 component files under src/components/sections/:
  - animated-section.tsx, navigation.tsx (with ThemeToggle), hero.tsx, about.tsx,
  - tech-stack.tsx, services.tsx, projects.tsx, pricing.tsx, process.tsx,
  - faq.tsx, contact.tsx, footer.tsx, whatsapp-button.tsx
- Added ThemeToggle button (Sun/Moon) to Navigation: desktop between links and "Hablemos" button, mobile next to hamburger menu
- Theme toggle uses SSR-safe mounted state and framer-motion rotation animation
- Refactored page.tsx from 1413 lines to ~35 lines (just imports and assembly)
- All Spanish comments preserved in each component file
- Build/lint passes (no new errors in src/)
- Committed and pushed to GitHub

Stage Summary:
- Dark/light mode toggle works with Sun/Moon button in navbar
- page.tsx reduced from 1413 lines to ~35 lines
- All 13 sections are now separate files under src/components/sections/
- Build passes, pushed to GitHub as commit 0b0e39b
