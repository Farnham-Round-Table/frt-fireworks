import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://farnham-fireworks.web.app',
  output: 'static',
  // Keep apostrophes and quotes exactly as typed, rather than curling them.
  markdown: { smartypants: false },
});
