import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  tests: {
    globals: true, // user "describe", "expect", etc, without importing them in our test files
    environment: "jsdom", //makes our tests work as if they are in the browser
    setupFiles: "src/setupTest.js", //do any test config before tests run
  },
});
