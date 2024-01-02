import type { Configuration as WebpackConfig } from 'webpack';
import { resolve } from "path";

export function webpackFinal(config: WebpackConfig, options = {}): WebpackConfig {
  if (config.module) {
    config.module.rules = [
      ...(config.module?.rules || []),
      {
        test: /\.ftl$/,
        use: [{
          loader: resolve(__dirname, "freemarker-loader.js"),
          options: {}
        }],
      }
    ];
  }

  return config;
}
