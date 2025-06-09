const { CssBaseline } = require('@mui/material');
const { ThemeProvider } = require('../src/theme');

module.exports = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};
