# React + Vite

## API configuration

Create `octofit-tracker/frontend/.env.local` and define `VITE_CODESPACE_NAME` with the name of your GitHub Codespace:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The presentation tier calls `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When the variable is not defined, it safely uses `http://localhost:8000/api/[component]/` instead.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
