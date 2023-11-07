# Fantasy Premier League API Client

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Custom Projet Configuration

### State Management

Added [zustand](https://zustand-demo.pmnd.rs/) and used in [store.ts](./src/store.ts).

```bash
npm install zustand
```

### components.json

Added [shadcn/ui](https://ui.shadcn.com/docs/installation/next) collection of re-usable components on top of [Tailwind CSS](https://tailwindcss.com/).

```bash
npx shadcn-ui@latest init
```

### package.json

Replaced [lucide-react](https://lucide.dev/icons/) to a specific version because the latest version is having some issues with Next.js.

```bash
npm i lucide-react@0.263.1
```

### Data Table

Powerful table and datagrids built using TanStack Table.

Add [tanstack/react-table](https://tanstack.com/table/v8) dependency for the `shadcn/ui/table` component.

```bash
npm install @tanstack/react-table
```

### next-themes

Added [next-themes](https://www.npmjs.com/package/next-themes) dependency for [ThemeProvider.tsx](./src/components/ThemeProvider.tsx) components that allows for the `dark mode` switcher button.

```bash
npm i next-themes
```

### next.config.js

Accepts external images from specific domains.

```json
{
  "images": {
    "remotePatterns": [
      { "hostname": "fantasy.premierleague.com" },
      { "hostname": "resources.premierleague.com" }
    ]
  }
}
```

### tailwind.config.js

Additional FPL colors for:

- team `strength`

```json
{
  "theme": {
    "extend": {
      "colors": {
        "strength": {
          "1": {
            "DEFAULT": "#375523",
            "foreground": "#ffffff"
          },
          "2": {
            "DEFAULT": "#01fc7a",
            "foreground": "#000000"
          },
          "3": {
            "DEFAULT": "#e7e7e7",
            "foreground": "#000000"
          },
          "4": {
            "DEFAULT": "#ff1751",
            "foreground": "#ffffff"
          },
          "5": {
            "DEFAULT": "#80072d",
            "foreground": "#ffffff"
          }
        }
      }
    }
  }
}
```
