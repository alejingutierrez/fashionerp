export default {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@mui/material/utils': '@mui/material/utils/index.js',
    };
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {},
        },
        '@storybook/mdx2-csf/loader',
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
