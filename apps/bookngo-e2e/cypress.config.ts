import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run bookngo:serve:development',
        production: 'nx run bookngo:serve:production',
      },
      ciWebServerCommand: 'nx run bookngo:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
