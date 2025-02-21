const browserWidth = 1953;
const browserHeight = 950;

module.exports = {
    video: false,
    e2e: {
        baseUrl: 'http://localhost:3000',
        video: false,
        supportFile: 'cypress/support/component.ts',
        screenshotsFolder: 'cypress/report/screenshots',
        reporter: 'mochawesome',
        reporterOptions: {
            html: false,
            json: true,
            reportDir: 'cypress/report',
            reportFilename: 'report',
            overwrite: true,
        },
        setupNodeEvents(on) {
            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.family === 'chromium') {
                    launchOptions.args.push(`--window-size=${browserWidth},${browserHeight}`);
                } else if (browser.family === 'firefox') {
                    launchOptions.args.push(`--width=${browserWidth}`);
                    launchOptions.args.push(`--height=${browserHeight}`);
                }

                if (browser.name === 'electron') {
                    launchOptions.preferences.width = browserWidth;
                    launchOptions.preferences.height = browserHeight;
                }

                return launchOptions;
            });
        },
    },
    component: {
        specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
};
