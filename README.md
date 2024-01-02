# Enonic XP preset for Storybook

Storybook preset for integrating with Enonic XP

## Usage

Install the package in your project.

```bash
npm i --save @itemconsulting/preset-enonic-xp
```
Add the preset to your *main.ts* (or *main.js*) file.

```typescript
import type { StorybookConfig } from "@storybook/server-webpack5";

const config: StorybookConfig = {
  addons: [
    '@itemconsulting/preset-enonic-xp'
  ],
};

export default config;
```

## Running tests

Unit tests can be run with the following command

```bash
npm run build && node --test
```
