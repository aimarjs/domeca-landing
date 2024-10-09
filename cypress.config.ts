import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Path to your spec files
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
