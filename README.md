# Getting Started

This guide outlines the initial setup steps and authentication approach for the application.

**1. Environment Setup**

* Create a file named `.env` in your project root directory.
* Copy the contents of the `.env.example` file to your new `.env` file.
* Update the values in the `.env` file.

**2. Authentication**

The application utilizes separate GraphQL routes for login and registration, eliminating the need for a bearer token during these operations. This simplifies the authentication process for initial user interactions.

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
