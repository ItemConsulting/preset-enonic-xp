
import type { Configuration as WebpackConfig } from "webpack";
import { resolve } from "path";

export function webpackFinal(config: WebpackConfig): WebpackConfig {
  if (config.module) {
    console.log("=> Enabling Freemarker Loader");
    console.log("=> Enabling Thymeleaf Loader");

    config.module.rules = [
      ...(config.module?.rules || []),
      {
        test: /\.ftl[hx]?$/,
        use: [
          {
            loader: resolve(import.meta.dirname, "freemarker-loader.js"),
            options: {},
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: resolve(import.meta.dirname, "thymeleaf-loader.js"),
            options: {},
          },
        ],
      },
    ];
  }

  return config;
}
