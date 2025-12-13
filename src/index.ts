import webpack, { type Configuration as WebpackConfig } from "webpack";
import { resolve } from "path";
import { readFileSync, existsSync } from "fs";
import { logger } from "storybook/internal/node-logger";

export function webpackFinal(config: WebpackConfig): WebpackConfig {
  if (config.module) {
    logger.info("Enabling Freemarker loader for XP");
    logger.info("Enabling Thymeleaf loader for XP");

    const propertiesPath = resolve("gradle.properties");
    const fileContent = existsSync(propertiesPath) ? readFileSync(propertiesPath, "utf-8") : "";

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

    config.plugins = config.plugins ?? [];
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.RESOURCES_DIR": JSON.stringify(resolve("src/main/resources")),
        "process.env.APP_NAME": JSON.stringify(getProperty("appName", fileContent)),
      }),
    );
  }

  return config;
}

function getProperty(propertyName: string, text: string): string | undefined {
  const [, value] =
    text
      .split("\n")
      .filter((row) => row.includes("="))
      .map((row) => {
        const [key, value] = row.split("=");
        return [key?.trim(), value?.trim()];
      })
      .find(([key]) => key === propertyName) ?? [];

  return value;
}
