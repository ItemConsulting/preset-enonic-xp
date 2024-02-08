import type { Configuration as WebpackConfig } from "webpack";
import { logger } from "@storybook/node-logger";
import { resolve } from "path";

export function webpackFinal(config: WebpackConfig, options = {}): WebpackConfig {
  if (config.module) {
    logger.info("=> Enabling Freemarker Loader");

    config.module.rules = [
      ...(config.module?.rules || []),
      {
        test: /\.ftl$/,
        use: [
          {
            loader: resolve(__dirname, "freemarker-loader.js"),
            options: {},
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: resolve(__dirname, "thymeleaf-loader.js"),
            options: {},
          },
        ],
      },
    ];
  }

  return config;
}
