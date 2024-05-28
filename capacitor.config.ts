import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: '@bookngo/source',
    webDir: 'dist/apps/bookngo/browser',
    plugins: {
        CapacitorHttp: {
            enabled: true
        }
    }
};

export default config;
